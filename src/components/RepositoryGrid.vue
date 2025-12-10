<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRepositoriesStore } from '@/stores/repositories'
import type { SortOption } from '@/types/github'
import RepositoryCard from './RepositoryCard.vue'

const props = withDefaults(
  defineProps<{
    limit?: number
    showFilters?: boolean
  }>(),
  {
    limit: undefined,
    showFilters: true,
  },
)

const store = useRepositoriesStore()

const displayedRepositories = computed(() => {
  if (props.limit) {
    return store.filteredRepositories.slice(0, props.limit)
  }
  return store.filteredRepositories
})

function handleLanguageChange(event: Event): void {
  const target = event.target as HTMLSelectElement | null
  store.setLanguageFilter(target?.value || null)
}

function handleSortChange(event: Event): void {
  const target = event.target as HTMLSelectElement | null
  const value = target?.value
  if (value === 'stars' || value === 'updated' || value === 'name') {
    store.setSortBy(value as SortOption)
  }
}

onMounted(() => {
  store.loadRepositories()
})
</script>

<template>
  <div class="w-full space-y-6">
    <div
      v-if="showFilters"
      class="flex flex-wrap items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-slate-200 shadow-lg shadow-black/30"
    >
      <label class="flex items-center gap-2 text-sm font-medium text-slate-300">
        <span>Language</span>
        <select
          id="language-filter"
          class="min-w-[140px] rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 text-sm text-slate-100 shadow-inner transition-all duration-300 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-400/20 hover:border-violet-400/50"
          :value="store.filters.language || ''"
          @change="handleLanguageChange"
        >
          <option value="">All Languages</option>
          <option v-for="lang in store.availableLanguages" :key="lang" :value="lang">
            {{ lang }}
          </option>
        </select>
      </label>

      <label class="flex items-center gap-2 text-sm font-medium text-slate-300">
        <span>Sort</span>
        <select
          id="sort-filter"
          class="min-w-[150px] rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 text-sm text-slate-100 shadow-inner transition-all duration-300 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-400/20 hover:border-violet-400/50"
          :value="store.filters.sortBy"
          @change="handleSortChange"
        >
          <option value="updated">Recently Updated</option>
          <option value="stars">Most Stars</option>
          <option value="name">Name</option>
        </select>
      </label>

      <label class="ml-auto inline-flex items-center gap-2 text-sm text-slate-300">
        <input
          type="checkbox"
          class="h-4 w-4 rounded border-white/20 bg-slate-900/80 text-violet-500 focus:ring-violet-500"
          :checked="store.filters.hideForked"
          @change="store.toggleHideForked()"
          aria-label="Hide forked repositories"
        />
        <span>Hide Forks</span>
      </label>
    </div>

    <div v-if="store.loading" class="flex flex-col items-center gap-3 py-10 text-slate-300">
      <div
        class="h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-violet-400 shadow-lg shadow-violet-500/20"
      ></div>
      <p>Loading repositories...</p>
    </div>

    <div
      v-else-if="store.error"
      class="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-slate-200 shadow-lg shadow-black/30"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="text-rose-300"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" x2="12" y1="8" y2="12" />
        <line x1="12" x2="12.01" y1="16" y2="16" />
      </svg>
      <h3 class="text-lg font-semibold text-white">Failed to load repositories</h3>
      <p class="text-sm text-slate-300">{{ store.error }}</p>
      <button
        class="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-violet-500 to-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-500/30 transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:from-violet-400 hover:to-indigo-400 hover:shadow-xl hover:shadow-violet-500/40"
        @click="store.loadRepositories()"
      >
        Try Again
      </button>
    </div>

    <div
      v-else-if="displayedRepositories.length === 0"
      class="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-slate-200 shadow-lg shadow-black/30"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="text-slate-400"
      >
        <path
          d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
        />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
      <h3 class="text-lg font-semibold text-white">No repositories found</h3>
      <p class="text-sm text-slate-300">Try adjusting your filters or check back later.</p>
    </div>

    <div v-else class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 stagger-children">
      <RepositoryCard v-for="repo in displayedRepositories" :key="repo.id" :repository="repo" />
    </div>
  </div>
</template>
