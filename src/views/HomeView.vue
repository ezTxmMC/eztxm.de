<script setup lang="ts">
import HeroSection from '../components/HeroSection.vue'
import RepositoryCard from '../components/RepositoryCard.vue'
import { RouterLink } from 'vue-router'
import { ref, onMounted } from 'vue'
import type { GitHubRepository } from '@/types/github'

interface FeaturedProject {
  owner: string
  repo: string
  isOrg?: boolean
}

const featuredProjects = ref<FeaturedProject[]>([
  { owner: 'ezTxmMC', repo: 'eztxm.de' },
  { owner: 'VesperiaNET', repo: 'vescord' },
  { owner: 'CrayonSMP', repo: 'CrayonWeb', isOrg: true },
])

const displayedProjects = ref<GitHubRepository[]>([])
const loading = ref(true)
async function loadFeaturedProjects() {
  loading.value = true
  const projects: GitHubRepository[] = []

  try {
    for (const featured of featuredProjects.value) {
      try {
        const response = await fetch(
          `https://api.github.com/repos/${featured.owner}/${featured.repo}`,
        )
        if (response.ok) {
          const repo = await response.json()
          projects.push(repo)
        }
      } catch (err) {
        console.warn(`Failed to fetch ${featured.owner}/${featured.repo}:`, err)
      }
    }
    displayedProjects.value = projects
  } catch (error) {
    console.error('Failed to load featured projects:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadFeaturedProjects()
})
</script>

<template>
  <main class="space-y-8 py-4">
    <HeroSection />

    <section class="px-4 sm:px-6">
      <div class="mx-auto max-w-6xl">
        <div class="mb-10 space-y-2 text-center">
          <h2 class="text-3xl font-bold text-white sm:text-4xl">
            Featured
            <span
              class="bg-linear-to-r from-violet-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent gradient-shift"
            >
              Projects
            </span>
          </h2>
          <p class="text-base text-slate-400 sm:text-lg">
            A selection of my recent work from GitHub
          </p>
        </div>

        <div v-if="loading" class="flex flex-col items-center gap-3 py-10 text-slate-300">
          <div
            class="h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-violet-400 shadow-lg shadow-violet-500/20"
          ></div>
          <p>Loading featured projects...</p>
        </div>

        <div v-else class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 stagger-children">
          <RepositoryCard v-for="repo in displayedProjects" :key="repo.id" :repository="repo" />
        </div>

        <div class="mt-10 flex justify-center">
          <RouterLink
            to="/projects"
            class="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-violet-500 to-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/30 transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:from-violet-400 hover:to-indigo-400 hover:shadow-xl hover:shadow-violet-500/40"
          >
            View All Projects
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
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </RouterLink>
        </div>
      </div>
    </section>
  </main>
</template>
