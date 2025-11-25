<script setup lang="ts">
import type { GitHubRepository } from '@/types/github'

defineProps<{
  repository: GitHubRepository
}>()

function getLanguageClass(language: string | null): string {
  if (!language) return 'default'
  return language.toLowerCase().replace(/[^a-z]/g, '')
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (days < 1) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 7) return `${days} days ago`
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`
  if (days < 365) return `${Math.floor(days / 30)} months ago`
  return `${Math.floor(days / 365)} years ago`
}
</script>

<template>
  <a
    :href="repository.html_url"
    target="_blank"
    rel="noopener noreferrer"
    class="repository-card glass-card"
  >
    <div class="card-header">
      <div class="repo-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
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
      </div>
      <h3 class="repo-name">{{ repository.name }}</h3>
      <span v-if="repository.fork" class="fork-badge">Fork</span>
    </div>

    <p class="repo-description">
      {{ repository.description || 'No description available.' }}
    </p>

    <div class="card-footer">
      <div class="repo-meta">
        <span
          v-if="repository.language"
          class="lang-badge"
          :class="getLanguageClass(repository.language)"
        >
          <span class="lang-dot"></span>
          {{ repository.language }}
        </span>

        <span class="meta-item" title="Stars">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polygon
              points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
            />
          </svg>
          {{ repository.stargazers_count }}
        </span>

        <span class="meta-item" title="Forks">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="18" r="3" />
            <circle cx="6" cy="6" r="3" />
            <circle cx="18" cy="6" r="3" />
            <path d="M18 9v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9" />
            <path d="M12 12v3" />
          </svg>
          {{ repository.forks_count }}
        </span>
      </div>

      <span class="updated-at">
        Updated {{ formatDate(repository.updated_at) }}
      </span>
    </div>
  </a>
</template>

<style scoped>
.repository-card {
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  text-decoration: none;
  color: inherit;
  height: 100%;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.repo-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: linear-gradient(
    135deg,
    var(--galaxy-violet),
    var(--galaxy-blue)
  );
  border-radius: var(--radius-md);
  color: white;
  flex-shrink: 0;
}

.repo-name {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--galaxy-text-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
}

.fork-badge {
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  background: var(--galaxy-light-gray);
  border-radius: var(--radius-sm);
  color: var(--galaxy-text-muted);
}

.repo-description {
  font-size: 0.9rem;
  color: var(--galaxy-text-secondary);
  line-height: 1.5;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 1rem;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: auto;
}

.repo-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.lang-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.25rem 0.625rem;
  border-radius: var(--radius-md);
  background: var(--lang-default);
  color: white;
}

.lang-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: currentColor;
}

.lang-badge.javascript {
  background: var(--lang-javascript);
  color: #1e293b;
}

.lang-badge.typescript {
  background: var(--lang-typescript);
}

.lang-badge.python {
  background: var(--lang-python);
}

.lang-badge.java {
  background: var(--lang-java);
}

.lang-badge.kotlin {
  background: var(--lang-kotlin);
}

.lang-badge.go {
  background: var(--lang-go);
}

.lang-badge.rust {
  background: var(--lang-rust);
}

.lang-badge.vue {
  background: var(--lang-vue);
}

.lang-badge.html {
  background: var(--lang-html);
}

.lang-badge.css {
  background: var(--lang-css);
}

.lang-badge.shell {
  background: var(--lang-shell);
  color: #1e293b;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.8rem;
  color: var(--galaxy-text-muted);
}

.updated-at {
  font-size: 0.75rem;
  color: var(--galaxy-text-muted);
}

@media (max-width: 480px) {
  .repository-card {
    padding: 1rem;
  }

  .card-footer {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
