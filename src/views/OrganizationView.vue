<script setup lang="ts">
import { onMounted, watch, ref } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useGitHub } from '@/composables/useGitHub'
import RepositoryCard from '@/components/RepositoryCard.vue'

const route = useRoute()
const {
  orgDetails,
  orgRepos,
  orgMembers,
  loading,
  error,
  fetchOrganizationDetails,
  fetchOrganizationRepos,
  fetchOrganizationMembers,
  resetOrgData,
} = useGitHub()

const activeTab = ref<'repos' | 'members'>('repos')

async function loadOrgData(orgLogin: string) {
  resetOrgData()
  await Promise.all([
    fetchOrganizationDetails(orgLogin),
    fetchOrganizationRepos(orgLogin),
    fetchOrganizationMembers(orgLogin),
  ])
}

onMounted(() => {
  const orgLogin = route.params.org as string
  if (orgLogin) {
    loadOrgData(orgLogin)
  }
})

watch(
  () => route.params.org,
  (newOrg) => {
    if (newOrg) {
      loadOrgData(newOrg as string)
    }
  },
)
</script>

<template>
  <main class="org-page">
    <div class="container">
      <!-- Back button -->
      <RouterLink to="/about" class="back-link fade-in">
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
          <path d="M19 12H5" />
          <path d="M12 19l-7-7 7-7" />
        </svg>
        Back to About
      </RouterLink>

      <!-- Loading State -->
      <div v-if="loading && !orgDetails" class="loading-state fade-in">
        <div class="spinner"></div>
        <p>Loading organization...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="error-state glass-card fade-in">
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
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <h3>Failed to load organization</h3>
        <p>{{ error }}</p>
        <button class="gradient-button" @click="loadOrgData(route.params.org as string)">
          Try Again
        </button>
      </div>

      <!-- Organization Details -->
      <template v-else-if="orgDetails">
        <div class="org-header glass-card fade-in">
          <img :src="orgDetails.avatar_url" :alt="orgDetails.login" class="org-avatar" />
          <div class="org-info">
            <h1>{{ orgDetails.name || orgDetails.login }}</h1>
            <p v-if="orgDetails.description" class="org-description">
              {{ orgDetails.description }}
            </p>
            <div class="org-meta">
              <span v-if="orgDetails.location" class="meta-item">
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
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {{ orgDetails.location }}
              </span>
              <a
                v-if="orgDetails.blog"
                :href="
                  orgDetails.blog.startsWith('http')
                    ? orgDetails.blog
                    : `https://${orgDetails.blog}`
                "
                target="_blank"
                rel="noopener noreferrer"
                class="meta-item link"
              >
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
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
                {{ orgDetails.blog }}
              </a>
              <span class="meta-item">
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
                  <path
                    d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
                  />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
                {{ orgDetails.public_repos }} repositories
              </span>
            </div>
            <a
              :href="orgDetails.html_url"
              target="_blank"
              rel="noopener noreferrer"
              class="outline-button github-link"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                />
              </svg>
              View on GitHub
            </a>
          </div>
        </div>

        <!-- Tabs -->
        <div class="tabs fade-in">
          <button
            class="tab-button"
            :class="{ active: activeTab === 'repos' }"
            @click="activeTab = 'repos'"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
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
            Repositories ({{ orgRepos.length }})
          </button>
          <button
            class="tab-button"
            :class="{ active: activeTab === 'members' }"
            @click="activeTab = 'members'"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            Members ({{ orgMembers.length }})
          </button>
        </div>

        <!-- Repositories Tab -->
        <div v-if="activeTab === 'repos'" class="tab-content fade-in">
          <div v-if="orgRepos.length > 0" class="repos-grid">
            <RepositoryCard
              v-for="repo in orgRepos"
              :key="repo.id"
              :repository="repo"
              class="stagger-item"
            />
          </div>
          <div v-else class="empty-state glass-card">
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
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
            </svg>
            <h3>No public repositories</h3>
            <p>This organization doesn't have any public repositories yet.</p>
          </div>
        </div>

        <!-- Members Tab -->
        <div v-if="activeTab === 'members'" class="tab-content fade-in">
          <div v-if="orgMembers.length > 0" class="members-grid">
            <a
              v-for="member in orgMembers"
              :key="member.id"
              :href="member.html_url"
              target="_blank"
              rel="noopener noreferrer"
              class="member-card glass-card stagger-item"
            >
              <img :src="member.avatar_url" :alt="member.login" class="member-avatar" />
              <span class="member-name">{{ member.login }}</span>
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
                class="external-link"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </div>
          <div v-else class="empty-state glass-card">
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
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <h3>No public members</h3>
            <p>This organization doesn't have any public members visible.</p>
          </div>
        </div>
      </template>
    </div>
  </main>
</template>

<style scoped>
.org-page {
  padding: 6rem 1.5rem 3rem;
  min-height: 100vh;
}

.container {
  max-width: var(--container-max-width);
  margin: 0 auto;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--galaxy-text-secondary);
  font-weight: 500;
  margin-bottom: 2rem;
  transition: color var(--transition-fast);
}

.back-link:hover {
  color: var(--galaxy-violet);
}

/* Loading State */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  gap: 1rem;
}

.loading-state p {
  color: var(--galaxy-text-muted);
}

/* Error State */
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 3rem 2rem;
  gap: 1rem;
}

.error-state svg {
  color: var(--galaxy-pink);
}

.error-state h3 {
  color: var(--galaxy-text-primary);
}

.error-state p {
  color: var(--galaxy-text-muted);
  margin-bottom: 1rem;
}

/* Organization Header */
.org-header {
  display: flex;
  gap: 2rem;
  padding: 2rem;
  margin-bottom: 2rem;
}

.org-avatar {
  width: 120px;
  height: 120px;
  border-radius: var(--radius-lg);
  border: 3px solid var(--galaxy-violet);
  box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
  flex-shrink: 0;
}

.org-info {
  flex: 1;
}

.org-info h1 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: var(--galaxy-text-primary);
}

.org-description {
  font-size: 1rem;
  color: var(--galaxy-text-secondary);
  margin-bottom: 1rem;
  line-height: 1.6;
}

.org-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: var(--galaxy-text-muted);
}

.meta-item.link {
  color: var(--galaxy-violet);
  text-decoration: none;
}

.meta-item.link:hover {
  text-decoration: underline;
}

.github-link {
  display: inline-flex;
}

/* Tabs */
.tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--glass-border);
  padding-bottom: 0;
}

.tab-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  background: transparent;
  border: none;
  font-size: 1rem;
  font-weight: 500;
  color: var(--galaxy-text-secondary);
  cursor: pointer;
  position: relative;
  transition:
    color var(--transition-fast),
    background var(--transition-fast);
}

.tab-button::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background: transparent;
  transition: background var(--transition-fast);
}

.tab-button:hover {
  color: var(--galaxy-text-primary);
}

.tab-button.active {
  color: var(--galaxy-violet);
}

.tab-button.active::after {
  background: linear-gradient(135deg, var(--galaxy-violet), var(--galaxy-blue));
}

/* Tab Content */
.tab-content {
  animation: fadeIn 0.3s ease-out;
}

/* Repositories Grid */
.repos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

/* Members Grid */
.members-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.member-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  text-decoration: none;
  transition:
    transform var(--transition-fast),
    box-shadow var(--transition-fast);
}

.member-card:hover {
  transform: translateY(-2px);
}

.member-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid var(--glass-border);
}

.member-name {
  flex: 1;
  font-weight: 500;
  color: var(--galaxy-text-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.external-link {
  color: var(--galaxy-text-muted);
  flex-shrink: 0;
}

/* Empty State */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 3rem 2rem;
  gap: 1rem;
}

.empty-state svg {
  color: var(--galaxy-text-muted);
}

.empty-state h3 {
  color: var(--galaxy-text-primary);
}

.empty-state p {
  color: var(--galaxy-text-muted);
}

/* Stagger Animation */
.stagger-item {
  opacity: 0;
  animation: fadeIn 0.5s ease-out forwards;
}

.stagger-item:nth-child(1) {
  animation-delay: 0.05s;
}
.stagger-item:nth-child(2) {
  animation-delay: 0.1s;
}
.stagger-item:nth-child(3) {
  animation-delay: 0.15s;
}
.stagger-item:nth-child(4) {
  animation-delay: 0.2s;
}
.stagger-item:nth-child(5) {
  animation-delay: 0.25s;
}
.stagger-item:nth-child(6) {
  animation-delay: 0.3s;
}

@media (max-width: 768px) {
  .org-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .org-meta {
    justify-content: center;
  }

  .tabs {
    flex-wrap: wrap;
  }

  .tab-button {
    padding: 0.75rem 1rem;
    font-size: 0.9rem;
  }

  .repos-grid {
    grid-template-columns: 1fr;
  }

  .members-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
}
</style>
