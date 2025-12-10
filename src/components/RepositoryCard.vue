<script setup lang="ts">
import type { GitHubRepository } from '@/types/github'
import { RouterLink } from 'vue-router'

defineProps<{
  repository: GitHubRepository
}>()

const languageClasses: Record<string, string> = {
  javascript: 'bg-[#f7df1e] text-slate-900',
  typescript: 'bg-[#3178c6] text-white',
  python: 'bg-[#3776ab] text-white',
  java: 'bg-[#ed8b00] text-white',
  kotlin: 'bg-[#7f52ff] text-white',
  go: 'bg-[#00add8] text-slate-900',
  rust: 'bg-[#dea584] text-slate-900',
  vue: 'bg-[#42b883] text-slate-900',
  html: 'bg-[#e34f26] text-white',
  css: 'bg-[#1572b6] text-white',
  shell: 'bg-[#89e051] text-slate-900',
}

function getLanguageClass(language: string | null): string {
  if (!language) return 'bg-violet-500 text-white'
  const key = language.toLowerCase().replace(/[^a-z]/g, '')
  return languageClasses[key] || 'bg-violet-500 text-white'
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
    class="group flex h-full flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-slate-100 shadow-lg shadow-black/30 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-violet-400/60 hover:shadow-violet-500/30"
  >
    <div class="flex items-center gap-3">
      <div
        class="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-inner"
      >
        <img
          v-if="repository.owner?.avatar_url"
          :src="repository.owner.avatar_url"
          :alt="repository.owner.login"
          class="h-full w-full object-cover"
        />
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="text-violet-400"
        >
          <path
            d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
          />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
      </div>
      <h3 class="truncate text-lg font-semibold text-white">
        <span v-if="repository.owner?.login !== 'ezTxmMC'" class="text-slate-400">
          <RouterLink
            class="text-violet-400/50 hover:text-violet-400/80"
            :to="`/org/${repository.owner.login}`"
            @click.stop
            >{{ repository.owner.login }}</RouterLink
          >/</span
        >{{ repository.name }}
      </h3>
      <div class="ml-auto flex items-center gap-2">
        <span
          v-if="repository.archived"
          class="inline-flex items-center gap-1 rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-300 ring-1 ring-amber-500/30"
          title="This repository has been archived"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="21 8 21 21 3 21 3 8" />
            <rect x="1" y="3" width="22" height="5" />
            <line x1="10" y1="12" x2="14" y2="12" />
          </svg>
          Archived
        </span>
        <span
          v-if="repository.fork"
          class="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-300"
        >
          Fork
        </span>
      </div>
    </div>

    <p class="line-clamp-2 text-sm leading-6 text-slate-300">
      {{ repository.description || 'No description available.' }}
    </p>

    <div class="mt-auto space-y-3">
      <div class="flex flex-wrap items-center gap-3 text-sm text-slate-400">
        <div class="flex flex-wrap items-center gap-3">
          <span
            v-if="repository.language"
            class="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold shadow-inner"
            :class="getLanguageClass(repository.language)"
          >
            <span class="h-2 w-2 rounded-full bg-current"></span>
            {{ repository.language }}
          </span>

          <span class="inline-flex items-center gap-1 text-slate-300" title="Stars">
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
            {{ repository.stargazers_count.toLocaleString?.() ?? repository.stargazers_count }}
          </span>

          <span class="inline-flex items-center gap-1 text-slate-300" title="Forks">
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
            {{ repository.forks_count.toLocaleString?.() ?? repository.forks_count }}
          </span>
        </div>

        <span class="text-xs text-slate-400">
          Updated {{ formatDate(repository.updated_at) }}
        </span>
      </div>
    </div>
  </a>
</template>
