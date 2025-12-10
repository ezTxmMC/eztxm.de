import { ref } from 'vue'
import type {
  GitHubRepository,
  GitHubUser,
  GitHubOrganization,
  GitHubOrganizationDetails,
  GitHubMember,
} from '@/types/github'

const GITHUB_API_URL = 'https://api.github.com'
const GITHUB_USERNAME = 'ezTxmMC'
const CACHE_KEY = 'github_repos_cache'
const USER_CACHE_KEY = 'github_user_cache'
const ORGS_CACHE_KEY = 'github_orgs_cache'
const CACHE_DURATION = 1000 * 60 * 30

interface CacheData<T> {
  data: T
  timestamp: number
}

function getFromCache<T>(key: string): T | null {
  try {
    const cached = localStorage.getItem(key)
    if (!cached) return null

    const { data, timestamp }: CacheData<T> = JSON.parse(cached)
    if (Date.now() - timestamp > CACHE_DURATION) {
      localStorage.removeItem(key)
      return null
    }
    return data
  } catch (error) {
    console.warn('Cache read failed:', error)
    return null
  }
}

function saveToCache<T>(key: string, data: T): void {
  try {
    const cacheData: CacheData<T> = {
      data,
      timestamp: Date.now(),
    }
    localStorage.setItem(key, JSON.stringify(cacheData))
  } catch (error) {
    console.warn('Cache write failed:', error)
  }
}

export function useGitHub() {
  const repositories = ref<GitHubRepository[]>([])
  const user = ref<GitHubUser | null>(null)
  const organizations = ref<GitHubOrganization[]>([])
  const orgDetails = ref<GitHubOrganizationDetails | null>(null)
  const orgRepos = ref<GitHubRepository[]>([])
  const orgMembers = ref<GitHubMember[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchRepositories(): Promise<void> {
    const cachedRepos = getFromCache<GitHubRepository[]>(CACHE_KEY)
    if (cachedRepos) {
      repositories.value = cachedRepos
      return
    }

    loading.value = true
    error.value = null

    try {
      const response = await fetch(
        `${GITHUB_API_URL}/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
      )

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`)
      }

      const data: GitHubRepository[] = await response.json()
      repositories.value = data.filter((repo) => !repo.archived)
      saveToCache(CACHE_KEY, repositories.value)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch repositories'
    } finally {
      loading.value = false
    }
  }

  async function fetchUser(): Promise<void> {
    const cachedUser = getFromCache<GitHubUser>(USER_CACHE_KEY)
    if (cachedUser) {
      user.value = cachedUser
      return
    }

    try {
      const response = await fetch(`${GITHUB_API_URL}/users/${GITHUB_USERNAME}`)

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`)
      }

      const data: GitHubUser = await response.json()
      user.value = data
      saveToCache(USER_CACHE_KEY, data)
    } catch (err) {
      console.error('Failed to fetch user:', err)
    }
  }

  async function fetchOrganizations(): Promise<void> {
    const cachedOrgs = getFromCache<GitHubOrganization[]>(ORGS_CACHE_KEY)
    if (cachedOrgs) {
      organizations.value = cachedOrgs
      return
    }

    try {
      const response = await fetch(`${GITHUB_API_URL}/users/${GITHUB_USERNAME}/orgs`)

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`)
      }

      const data: GitHubOrganization[] = await response.json()
      organizations.value = data
      saveToCache(ORGS_CACHE_KEY, data)
    } catch (err) {
      console.error('Failed to fetch organizations:', err)
    }
  }

  async function fetchOrganizationDetails(orgLogin: string): Promise<void> {
    const cacheKey = `github_org_details_${orgLogin}`
    const cachedDetails = getFromCache<GitHubOrganizationDetails>(cacheKey)
    if (cachedDetails) {
      orgDetails.value = cachedDetails
      return
    }

    loading.value = true
    error.value = null

    try {
      const response = await fetch(`${GITHUB_API_URL}/orgs/${orgLogin}`)

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`)
      }

      const data: GitHubOrganizationDetails = await response.json()
      orgDetails.value = data
      saveToCache(cacheKey, data)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch organization details'
    } finally {
      loading.value = false
    }
  }

  async function fetchOrganizationRepos(orgLogin: string): Promise<void> {
    const cacheKey = `github_org_repos_${orgLogin}`
    const cachedRepos = getFromCache<GitHubRepository[]>(cacheKey)
    if (cachedRepos) {
      orgRepos.value = cachedRepos
      return
    }

    loading.value = true
    error.value = null

    try {
      const response = await fetch(
        `${GITHUB_API_URL}/orgs/${orgLogin}/repos?per_page=100&sort=updated`,
      )

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`)
      }

      const data: GitHubRepository[] = await response.json()
      orgRepos.value = data.filter((repo) => !repo.archived)
      saveToCache(cacheKey, orgRepos.value)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch organization repos'
    } finally {
      loading.value = false
    }
  }

  async function fetchOrganizationMembers(orgLogin: string): Promise<void> {
    const cacheKey = `github_org_members_${orgLogin}`
    const cachedMembers = getFromCache<GitHubMember[]>(cacheKey)
    if (cachedMembers) {
      orgMembers.value = cachedMembers
      return
    }

    try {
      const response = await fetch(`${GITHUB_API_URL}/orgs/${orgLogin}/public_members?per_page=100`)

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`)
      }

      const data: GitHubMember[] = await response.json()
      orgMembers.value = data
      saveToCache(cacheKey, data)
    } catch (err) {
      console.error('Failed to fetch organization members:', err)
    }
  }

  function clearCache(): void {
    localStorage.removeItem(CACHE_KEY)
    localStorage.removeItem(USER_CACHE_KEY)
    localStorage.removeItem(ORGS_CACHE_KEY)
  }

  function resetOrgData(): void {
    orgDetails.value = null
    orgRepos.value = []
    orgMembers.value = []
  }

  return {
    repositories,
    user,
    organizations,
    orgDetails,
    orgRepos,
    orgMembers,
    loading,
    error,
    fetchRepositories,
    fetchUser,
    fetchOrganizations,
    fetchOrganizationDetails,
    fetchOrganizationRepos,
    fetchOrganizationMembers,
    clearCache,
    resetOrgData,
  }
}
