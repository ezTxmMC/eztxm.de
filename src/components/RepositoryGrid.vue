<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
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

// Custom select dropdown states
const ownerDropdownOpen = ref(false)
const languageDropdownOpen = ref(false)
const sortDropdownOpen = ref(false)

const displayedRepositories = computed(() => {
  if (props.limit) {
    return store.filteredRepositories.slice(0, props.limit)
  }
  return store.filteredRepositories
})

function handleLanguageChange(lang: string | null): void {
  store.setLanguageFilter(lang)
  languageDropdownOpen.value = false
}

function handleOwnerChange(owner: string | null): void {
  store.setOwnerFilter(owner)
  ownerDropdownOpen.value = false
}

function handleSortChange(sort: SortOption): void {
  store.setSortBy(sort)
  sortDropdownOpen.value = false
}

function closeAllDropdowns(): void {
  ownerDropdownOpen.value = false
  languageDropdownOpen.value = false
  sortDropdownOpen.value = false
}

function toggleOwnerDropdown(): void {
  ownerDropdownOpen.value = !ownerDropdownOpen.value
  languageDropdownOpen.value = false
  sortDropdownOpen.value = false
}

function toggleLanguageDropdown(): void {
  languageDropdownOpen.value = !languageDropdownOpen.value
  ownerDropdownOpen.value = false
  sortDropdownOpen.value = false
}

function toggleSortDropdown(): void {
  sortDropdownOpen.value = !sortDropdownOpen.value
  ownerDropdownOpen.value = false
  languageDropdownOpen.value = false
}

const sortLabels: Record<SortOption, string> = {
  updated: 'Recently Updated',
  stars: 'Most Stars',
  name: 'Name',
}

onMounted(() => {
  store.loadRepositories()
  // Close dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement
    if (!target.closest('.custom-select')) {
      closeAllDropdowns()
    }
  })
})
</script>

<template>
  <div class="w-full space-y-6">
    <div
      v-if="showFilters"
      class="flex flex-wrap items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-slate-200 shadow-lg shadow-black/30"
    >
      <!-- Owner Custom Select -->
      <div class="custom-select relative">
        <label class="mb-1 block text-xs font-medium text-slate-400">Owner</label>
        <button
          type="button"
          class="flex min-w-[140px] items-center justify-between gap-2 rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 text-sm text-slate-100 shadow-inner transition-all duration-300 hover:border-violet-400/50"
          :class="{ 'border-violet-400 ring-2 ring-violet-400/20': ownerDropdownOpen }"
          @click.stop="toggleOwnerDropdown"
        >
          <span>{{ store.filters.owner || 'All Owners' }}</span>
          <svg
            class="h-4 w-4 text-slate-400 transition-transform duration-200"
            :class="{ 'rotate-180': ownerDropdownOpen }"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        <Transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="opacity-0 -translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-2"
        >
          <div
            v-if="ownerDropdownOpen"
            class="absolute left-0 top-full z-50 mt-2 max-h-60 w-full min-w-40 overflow-auto rounded-xl border border-white/10 bg-slate-900/95 py-1 shadow-xl backdrop-blur-xl"
          >
            <button
              type="button"
              class="flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors hover:bg-violet-500/20"
              :class="{ 'bg-violet-500/10 text-violet-300': !store.filters.owner }"
              @click="handleOwnerChange(null)"
            >
              <span
                class="h-1.5 w-1.5 rounded-full"
                :class="!store.filters.owner ? 'bg-violet-400' : 'bg-transparent'"
              ></span>
              All Owners
            </button>
            <button
              v-for="owner in store.availableOwners"
              :key="owner"
              type="button"
              class="flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors hover:bg-violet-500/20"
              :class="{ 'bg-violet-500/10 text-violet-300': store.filters.owner === owner }"
              @click="handleOwnerChange(owner)"
            >
              <span
                class="h-1.5 w-1.5 rounded-full"
                :class="store.filters.owner === owner ? 'bg-violet-400' : 'bg-transparent'"
              ></span>
              {{ owner }}
            </button>
          </div>
        </Transition>
      </div>

      <!-- Language Custom Select -->
      <div class="custom-select relative">
        <label class="mb-1 block text-xs font-medium text-slate-400">Language</label>
        <button
          type="button"
          class="flex min-w-[140px] items-center justify-between gap-2 rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 text-sm text-slate-100 shadow-inner transition-all duration-300 hover:border-violet-400/50"
          :class="{ 'border-violet-400 ring-2 ring-violet-400/20': languageDropdownOpen }"
          @click.stop="toggleLanguageDropdown"
        >
          <span>{{ store.filters.language || 'All Languages' }}</span>
          <svg
            class="h-4 w-4 text-slate-400 transition-transform duration-200"
            :class="{ 'rotate-180': languageDropdownOpen }"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        <Transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="opacity-0 -translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-2"
        >
          <div
            v-if="languageDropdownOpen"
            class="absolute left-0 top-full z-50 mt-2 max-h-60 w-full min-w-40 overflow-auto rounded-xl border border-white/10 bg-slate-900/95 py-1 shadow-xl backdrop-blur-xl"
          >
            <button
              type="button"
              class="flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors hover:bg-violet-500/20"
              :class="{ 'bg-violet-500/10 text-violet-300': !store.filters.language }"
              @click="handleLanguageChange(null)"
            >
              <span
                class="h-1.5 w-1.5 rounded-full"
                :class="!store.filters.language ? 'bg-violet-400' : 'bg-transparent'"
              ></span>
              All Languages
            </button>
            <button
              v-for="lang in store.availableLanguages"
              :key="lang"
              type="button"
              class="flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors hover:bg-violet-500/20"
              :class="{ 'bg-violet-500/10 text-violet-300': store.filters.language === lang }"
              @click="handleLanguageChange(lang)"
            >
              <span
                class="h-1.5 w-1.5 rounded-full"
                :class="store.filters.language === lang ? 'bg-violet-400' : 'bg-transparent'"
              ></span>
              {{ lang }}
            </button>
          </div>
        </Transition>
      </div>

      <!-- Sort Custom Select -->
      <div class="custom-select relative">
        <label class="mb-1 block text-xs font-medium text-slate-400">Sort</label>
        <button
          type="button"
          class="flex min-w-[150px] items-center justify-between gap-2 rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 text-sm text-slate-100 shadow-inner transition-all duration-300 hover:border-violet-400/50"
          :class="{ 'border-violet-400 ring-2 ring-violet-400/20': sortDropdownOpen }"
          @click.stop="toggleSortDropdown"
        >
          <span>{{ sortLabels[store.filters.sortBy] }}</span>
          <svg
            class="h-4 w-4 text-slate-400 transition-transform duration-200"
            :class="{ 'rotate-180': sortDropdownOpen }"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        <Transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="opacity-0 -translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-2"
        >
          <div
            v-if="sortDropdownOpen"
            class="absolute left-0 top-full z-50 mt-2 w-full min-w-40 rounded-xl border border-white/10 bg-slate-900/95 py-1 shadow-xl backdrop-blur-xl"
          >
            <button
              v-for="(label, key) in sortLabels"
              :key="key"
              type="button"
              class="flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors hover:bg-violet-500/20"
              :class="{ 'bg-violet-500/10 text-violet-300': store.filters.sortBy === key }"
              @click="handleSortChange(key as SortOption)"
            >
              <span
                class="h-1.5 w-1.5 rounded-full"
                :class="store.filters.sortBy === key ? 'bg-violet-400' : 'bg-transparent'"
              ></span>
              {{ label }}
            </button>
          </div>
        </Transition>
      </div>

      <!-- Custom Toggle: Hide Forks -->
      <div class="ml-auto flex items-center gap-3">
        <button
          type="button"
          class="group flex items-center gap-2 text-sm text-slate-300"
          @click="store.toggleHideForked()"
          role="switch"
          :aria-checked="store.filters.hideForked"
        >
          <div
            class="relative h-6 w-11 rounded-full transition-colors duration-300"
            :class="store.filters.hideForked ? 'bg-violet-500' : 'bg-slate-700'"
          >
            <div
              class="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-md transition-all duration-300"
              :class="store.filters.hideForked ? 'left-[22px]' : 'left-0.5'"
            ></div>
          </div>
          <span>Hide Forks</span>
        </button>
      </div>

      <!-- Custom Toggle: Show Archived -->
      <div class="flex items-center gap-3">
        <button
          type="button"
          class="group flex items-center gap-2 text-sm text-slate-300"
          @click="store.toggleShowArchived()"
          role="switch"
          :aria-checked="store.filters.showArchived"
        >
          <div
            class="relative h-6 w-11 rounded-full transition-colors duration-300"
            :class="store.filters.showArchived ? 'bg-amber-500' : 'bg-slate-700'"
          >
            <div
              class="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-md transition-all duration-300"
              :class="store.filters.showArchived ? 'left-[22px]' : 'left-0.5'"
            ></div>
          </div>
          <span>Show Archived</span>
        </button>
      </div>
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
