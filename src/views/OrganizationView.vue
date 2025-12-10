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
  <main class="relative overflow-hidden px-4 sm:px-6 py-12 lg:py-14 max-w-6xl mx-auto">
    <div class="absolute inset-0 -z-10">
      <div
        class="pointer-events-none absolute -left-20 top-6 h-60 w-60 rounded-full bg-linear-to-br from-indigo-500/35 via-fuchsia-500/30 to-cyan-400/25 blur-3xl animate-float-slow"
      />
      <div
        class="pointer-events-none absolute right-0 bottom-0 h-72 w-72 rounded-full bg-linear-to-br from-cyan-400/25 via-indigo-500/25 to-fuchsia-500/20 blur-3xl animate-float-slower"
      />
    </div>
    <RouterLink
      to="/about"
      class="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors mb-6"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-4 h-4"
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

    <div
      v-if="loading && !orgDetails"
      class="flex flex-col items-center justify-center gap-3 py-14 text-slate-300"
    >
      <span
        class="h-10 w-10 rounded-full border-2 border-indigo-400/60 border-t-transparent animate-spin"
      />
      <p class="text-sm">Loading organization...</p>
    </div>

    <div
      v-else-if="error"
      class="rounded-2xl bg-slate-900/70 ring-1 ring-white/10 shadow-2xl shadow-indigo-900/40 p-8 text-center space-y-3"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-12 h-12 text-rose-300 mx-auto"
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
      <h2 class="text-xl font-semibold text-white">Failed to load organization</h2>
      <p class="text-slate-300">{{ error }}</p>
      <button
        class="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-indigo-500 text-white font-medium hover:bg-indigo-400 transition-colors"
        @click="loadOrgData(route.params.org as string)"
      >
        Try again
      </button>
    </div>

    <template v-else-if="orgDetails">
      <section
        class="rounded-2xl bg-slate-900/70 ring-1 ring-white/10 shadow-2xl shadow-indigo-900/40 backdrop-blur p-6 sm:p-8 mb-6 flex flex-col md:flex-row gap-6 md:items-center animate-fade-up"
      >
        <div class="relative">
          <div
            class="absolute inset-0 bg-linear-to-br from-indigo-500 via-fuchsia-500 to-cyan-400 blur-2xl opacity-40"
          />
          <img
            :src="orgDetails.avatar_url"
            :alt="orgDetails.login"
            class="relative w-28 h-28 rounded-2xl ring-2 ring-white/15 object-cover"
          />
        </div>
        <div class="flex-1 space-y-3">
          <div>
            <p class="text-sm uppercase tracking-[0.2em] text-indigo-200">Organization</p>
            <h1 class="text-2xl sm:text-3xl font-semibold text-white">
              {{ orgDetails.name || orgDetails.login }}
            </h1>
          </div>
          <p v-if="orgDetails.description" class="text-slate-200 leading-relaxed">
            {{ orgDetails.description }}
          </p>
          <div class="flex flex-wrap gap-3 text-sm text-slate-200">
            <span
              v-if="orgDetails.location"
              class="inline-flex items-center gap-2 bg-white/5 ring-1 ring-white/10 rounded-full px-3 py-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4"
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
                orgDetails.blog.startsWith('http') ? orgDetails.blog : `https://${orgDetails.blog}`
              "
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 bg-white/5 ring-1 ring-white/10 rounded-full px-3 py-1 hover:ring-indigo-400/50 hover:text-white transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4"
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
            <span
              class="inline-flex items-center gap-2 bg-white/5 ring-1 ring-white/10 rounded-full px-3 py-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4"
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
          <div>
            <a
              :href="orgDetails.html_url"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 ring-1 ring-white/10 text-white hover:bg-white/15 hover:ring-indigo-400/50 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
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
      </section>

      <section class="mb-8 animate-fade-up" style="animation-delay: 120ms">
        <div class="inline-flex rounded-full bg-slate-900/70 ring-1 ring-white/10 p-1">
          <button
            class="px-4 py-2 text-sm font-medium rounded-full transition"
            :class="
              activeTab === 'repos'
                ? 'bg-white/10 text-white shadow-lg shadow-indigo-900/30'
                : 'text-slate-300 hover:text-white'
            "
            @click="activeTab = 'repos'"
          >
            Repositories ({{ orgRepos.length }})
          </button>
          <button
            class="px-4 py-2 text-sm font-medium rounded-full transition"
            :class="
              activeTab === 'members'
                ? 'bg-white/10 text-white shadow-lg shadow-indigo-900/30'
                : 'text-slate-300 hover:text-white'
            "
            @click="activeTab = 'members'"
          >
            Members ({{ orgMembers.length }})
          </button>
        </div>
      </section>

      <section
        v-if="activeTab === 'repos'"
        class="space-y-4 animate-fade-up"
        style="animation-delay: 200ms"
      >
        <div v-if="orgRepos.length > 0" class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <RepositoryCard v-for="repo in orgRepos" :key="repo.id" :repository="repo" />
        </div>
        <div
          v-else
          class="rounded-2xl bg-slate-900/60 ring-1 ring-white/10 shadow-lg shadow-indigo-900/30 p-8 text-center text-slate-300"
        >
          <p class="text-lg font-semibold text-white">No public repositories</p>
          <p class="text-sm text-slate-400">
            This organization doesn't have public repositories yet.
          </p>
        </div>
      </section>

      <section
        v-if="activeTab === 'members'"
        class="space-y-4 animate-fade-up"
        style="animation-delay: 240ms"
      >
        <div v-if="orgMembers.length > 0" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <a
            v-for="member in orgMembers"
            :key="member.id"
            :href="member.html_url"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-3 rounded-2xl bg-slate-900/60 ring-1 ring-white/10 shadow-lg shadow-indigo-900/30 p-4 hover:-translate-y-1 hover:ring-indigo-400/50 transition"
          >
            <img
              :src="member.avatar_url"
              :alt="member.login"
              class="w-12 h-12 rounded-full ring-1 ring-white/10"
            />
            <div class="flex items-center justify-between w-full">
              <span class="text-white font-medium truncate">{{ member.login }}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4 text-indigo-300"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </div>
          </a>
        </div>
        <div
          v-else
          class="rounded-2xl bg-slate-900/60 ring-1 ring-white/10 shadow-lg shadow-indigo-900/30 p-8 text-center text-slate-300"
        >
          <p class="text-lg font-semibold text-white">No public members</p>
          <p class="text-sm text-slate-400">
            This organization doesn't have public members visible.
          </p>
        </div>
      </section>
    </template>
  </main>
</template>

<style scoped>
@keyframes float-slow {
  0% {
    transform: translateY(0px) scale(1);
  }
  50% {
    transform: translateY(-12px) scale(1.02);
  }
  100% {
    transform: translateY(0px) scale(1);
  }
}

@keyframes float-slower {
  0% {
    transform: translateY(0px) scale(1);
  }
  50% {
    transform: translateY(14px) scale(1.03);
  }
  100% {
    transform: translateY(0px) scale(1);
  }
}

.animate-float-slow {
  animation: float-slow 11s ease-in-out infinite;
}

.animate-float-slower {
  animation: float-slower 15s ease-in-out infinite;
}

@keyframes fade-up {
  0% {
    opacity: 0;
    transform: translateY(16px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-up {
  animation: fade-up 620ms ease-out forwards;
}
</style>
