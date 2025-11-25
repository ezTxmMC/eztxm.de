import { ref } from 'vue'
import type { GitHubRepository, GitHubUser } from '@/types/github'

const GITHUB_API_URL = 'https://api.github.com'
const GITHUB_USERNAME = 'ezTxmMC'
const CACHE_KEY = 'github_repos_cache'
const USER_CACHE_KEY = 'github_user_cache'
const CACHE_DURATION = 1000 * 60 * 30 // 30 minutes

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
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchRepositories(): Promise<void> {
    // Check cache first
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
    // Check cache first
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

  function clearCache(): void {
    localStorage.removeItem(CACHE_KEY)
    localStorage.removeItem(USER_CACHE_KEY)
  }

  return {
    repositories,
    user,
    loading,
    error,
    fetchRepositories,
    fetchUser,
    clearCache,
  }
}
