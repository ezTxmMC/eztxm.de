import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type {
  RepositoryFilters,
  SortOption,
  FilterLanguage,
  FilterOwner,
  GitHubRepository,
} from '@/types/github'
import { useGitHub } from '@/composables/useGitHub'

// Organizations to include in the projects page
const INCLUDED_ORGS = ['CrayonSMP', 'VesperiaNET', 'ByteUnion', 'Nexoscript']

export const useRepositoriesStore = defineStore('repositories', () => {
  const { repositories, loading, error, fetchRepositories } = useGitHub()

  const allRepositories = ref<GitHubRepository[]>([])
  const orgLoading = ref(false)
  const orgError = ref<string | null>(null)

  const filters = ref<RepositoryFilters>({
    language: null,
    owner: null,
    sortBy: 'updated',
    hideForked: false,
    showArchived: false,
  })

  const availableLanguages = computed(() => {
    const languages = new Set<string>()
    allRepositories.value.forEach((repo) => {
      if (repo.language) {
        languages.add(repo.language)
      }
    })
    return Array.from(languages).sort()
  })

  const availableOwners = computed(() => {
    const owners = new Set<string>()
    allRepositories.value.forEach((repo) => {
      if (repo.owner?.login) {
        owners.add(repo.owner.login)
      }
    })
    return Array.from(owners).sort()
  })

  const filteredRepositories = computed(() => {
    let repos = [...allRepositories.value]

    // Filter by language
    if (filters.value.language) {
      repos = repos.filter((repo) => repo.language === filters.value.language)
    }

    // Filter by owner
    if (filters.value.owner) {
      repos = repos.filter((repo) => repo.owner?.login === filters.value.owner)
    }

    // Filter forked repos
    if (filters.value.hideForked) {
      repos = repos.filter((repo) => !repo.fork)
    }

    // Filter archived repos
    if (!filters.value.showArchived) {
      repos = repos.filter((repo) => !repo.archived)
    }

    // Sort
    repos.sort((a, b) => {
      switch (filters.value.sortBy) {
        case 'stars':
          return b.stargazers_count - a.stargazers_count
        case 'name':
          return a.name.localeCompare(b.name)
        case 'updated':
        default:
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      }
    })

    return repos
  })

  function setLanguageFilter(language: FilterLanguage): void {
    filters.value.language = language
  }

  function setOwnerFilter(owner: FilterOwner): void {
    filters.value.owner = owner
  }

  function setSortBy(sortBy: SortOption): void {
    filters.value.sortBy = sortBy
  }

  function toggleHideForked(): void {
    filters.value.hideForked = !filters.value.hideForked
  }

  function toggleShowArchived(): void {
    filters.value.showArchived = !filters.value.showArchived
  }

  async function fetchOrgRepos(org: string): Promise<GitHubRepository[]> {
    try {
      const response = await fetch(
        `https://api.github.com/orgs/${org}/repos?per_page=100&sort=updated`,
      )
      if (response.ok) {
        const repos: GitHubRepository[] = await response.json()
        return repos
      }
    } catch (err) {
      console.warn(`Failed to fetch repos for ${org}:`, err)
    }
    return []
  }

  async function loadRepositories(): Promise<void> {
    orgLoading.value = true
    orgError.value = null

    try {
      // Fetch personal repos
      await fetchRepositories()

      // Start with personal repos
      const combinedRepos = [...repositories.value]
      const seenIds = new Set(combinedRepos.map((r) => r.id))

      // Fetch org repos in parallel
      const orgRepoPromises = INCLUDED_ORGS.map((org) => fetchOrgRepos(org))
      const orgReposArrays = await Promise.all(orgRepoPromises)

      // Merge org repos (avoid duplicates)
      for (const orgRepos of orgReposArrays) {
        for (const repo of orgRepos) {
          if (!seenIds.has(repo.id)) {
            seenIds.add(repo.id)
            combinedRepos.push(repo)
          }
        }
      }

      allRepositories.value = combinedRepos
    } catch (err) {
      orgError.value = err instanceof Error ? err.message : 'Failed to fetch repositories'
    } finally {
      orgLoading.value = false
    }
  }

  const isLoading = computed(() => loading.value || orgLoading.value)
  const combinedError = computed(() => error.value || orgError.value)

  return {
    repositories: allRepositories,
    loading: isLoading,
    error: combinedError,
    filters,
    availableLanguages,
    availableOwners,
    filteredRepositories,
    setLanguageFilter,
    setOwnerFilter,
    setSortBy,
    toggleHideForked,
    toggleShowArchived,
    loadRepositories,
  }
})
