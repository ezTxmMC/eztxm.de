import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { RepositoryFilters, SortOption, FilterLanguage } from '@/types/github'
import { useGitHub } from '@/composables/useGitHub'

export const useRepositoriesStore = defineStore('repositories', () => {
  const { repositories, loading, error, fetchRepositories } = useGitHub()

  const filters = ref<RepositoryFilters>({
    language: null,
    sortBy: 'updated',
    hideForked: false,
  })

  const availableLanguages = computed(() => {
    const languages = new Set<string>()
    repositories.value.forEach((repo) => {
      if (repo.language) {
        languages.add(repo.language)
      }
    })
    return Array.from(languages).sort()
  })

  const filteredRepositories = computed(() => {
    let repos = [...repositories.value]

    // Filter by language
    if (filters.value.language) {
      repos = repos.filter((repo) => repo.language === filters.value.language)
    }

    // Filter forked repos
    if (filters.value.hideForked) {
      repos = repos.filter((repo) => !repo.fork)
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

  function setSortBy(sortBy: SortOption): void {
    filters.value.sortBy = sortBy
  }

  function toggleHideForked(): void {
    filters.value.hideForked = !filters.value.hideForked
  }

  async function loadRepositories(): Promise<void> {
    await fetchRepositories()
  }

  return {
    repositories,
    loading,
    error,
    filters,
    availableLanguages,
    filteredRepositories,
    setLanguageFilter,
    setSortBy,
    toggleHideForked,
    loadRepositories,
  }
})
