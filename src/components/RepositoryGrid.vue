<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRepositoriesStore } from '@/stores/repositories'
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

onMounted(() => {
  store.loadRepositories()
})
</script>

<template>
  <div class="repository-grid-wrapper">
    <!-- Filters -->
    <div v-if="showFilters" class="filters-bar glass-card">
      <div class="filter-group">
        <label for="language-filter">Language:</label>
        <select
          id="language-filter"
          class="filter-select"
          :value="store.filters.language || ''"
          @change="
            store.setLanguageFilter(
              ($event.target as HTMLSelectElement).value || null,
            )
          "
        >
          <option value="">All Languages</option>
          <option v-for="lang in store.availableLanguages" :key="lang" :value="lang">
            {{ lang }}
          </option>
        </select>
      </div>

      <div class="filter-group">
        <label for="sort-filter">Sort by:</label>
        <select
          id="sort-filter"
          class="filter-select"
          :value="store.filters.sortBy"
          @change="
            store.setSortBy(
              ($event.target as HTMLSelectElement).value as 'stars' | 'updated' | 'name',
            )
          "
        >
          <option value="updated">Recently Updated</option>
          <option value="stars">Most Stars</option>
          <option value="name">Name</option>
        </select>
      </div>

      <div class="filter-group checkbox-group">
        <label class="checkbox-label">
          <input
            type="checkbox"
            :checked="store.filters.hideForked"
            @change="store.toggleHideForked()"
          />
          <span>Hide Forks</span>
        </label>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="store.loading" class="loading-state">
      <div class="spinner"></div>
      <p>Loading repositories...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="store.error" class="error-state glass-card">
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
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" x2="12" y1="8" y2="12" />
        <line x1="12" x2="12.01" y1="16" y2="16" />
      </svg>
      <h3>Failed to load repositories</h3>
      <p>{{ store.error }}</p>
      <button class="gradient-button" @click="store.loadRepositories()">
        Try Again
      </button>
    </div>

    <!-- Empty State -->
    <div
      v-else-if="displayedRepositories.length === 0"
      class="empty-state glass-card"
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
      >
        <path
          d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
        />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
      <h3>No repositories found</h3>
      <p>Try adjusting your filters or check back later.</p>
    </div>

    <!-- Repository Grid -->
    <div v-else class="repository-grid stagger-children">
      <RepositoryCard
        v-for="repo in displayedRepositories"
        :key="repo.id"
        :repository="repo"
      />
    </div>
  </div>
</template>

<style scoped>
.repository-grid-wrapper {
  width: 100%;
}

.filters-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  padding: 1rem 1.5rem;
  margin-bottom: 2rem;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.filter-group label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--galaxy-text-secondary);
}

.filter-select {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  background: var(--galaxy-white);
  color: var(--galaxy-text-primary);
  cursor: pointer;
  transition: border-color var(--transition-fast);
}

.filter-select:hover,
.filter-select:focus {
  border-color: var(--galaxy-violet);
  outline: none;
}

.checkbox-group {
  margin-left: auto;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.checkbox-label input {
  width: 16px;
  height: 16px;
  accent-color: var(--galaxy-violet);
  cursor: pointer;
}

.checkbox-label span {
  font-size: 0.875rem;
  color: var(--galaxy-text-secondary);
}

.repository-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

.loading-state,
.error-state,
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  text-align: center;
  gap: 1rem;
}

.loading-state p,
.error-state p,
.empty-state p {
  color: var(--galaxy-text-muted);
}

.error-state h3,
.empty-state h3 {
  margin: 0;
}

.error-state svg,
.empty-state svg {
  color: var(--galaxy-text-muted);
}

@media (max-width: 768px) {
  .filters-bar {
    flex-direction: column;
    gap: 1rem;
  }

  .filter-group {
    width: 100%;
    justify-content: space-between;
  }

  .filter-select {
    flex: 1;
    max-width: 200px;
  }

  .checkbox-group {
    margin-left: 0;
  }

  .repository-grid {
    grid-template-columns: 1fr;
  }
}
</style>
