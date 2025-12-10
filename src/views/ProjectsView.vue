<script setup lang="ts">
import RepositoryGrid from '../components/RepositoryGrid.vue'
</script>

<template>
  <main class="relative overflow-hidden">
    <div class="absolute inset-0 -z-10">
      <div
        class="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-linear-to-br from-indigo-500/40 via-fuchsia-500/30 to-cyan-400/30 blur-3xl animate-float-slow"
      />
      <div
        class="pointer-events-none absolute right-0 bottom-0 h-72 w-72 rounded-full bg-linear-to-br from-cyan-400/30 via-indigo-500/30 to-fuchsia-500/20 blur-3xl animate-float-slower"
      />
    </div>

    <section class="px-4 sm:px-6 py-12 lg:py-16 max-w-6xl mx-auto space-y-10">
      <header class="text-center space-y-4">
        <p class="text-sm font-semibold uppercase tracking-[0.24em] text-indigo-200">Projects</p>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
          Building, shipping, iterating fast.
        </h1>
        <p class="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
          A living collection of my public GitHub work — web apps, tools, experiments. Updated
          automatically so you always see what's fresh.
        </p>
        <div class="flex flex-wrap justify-center gap-3 pt-2">
          <span
            class="inline-flex items-center gap-2 rounded-full bg-white/5 ring-1 ring-white/10 px-3 py-1 text-sm text-indigo-100"
          >
            <span class="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Live data from GitHub
          </span>
          <span
            class="inline-flex items-center gap-2 rounded-full bg-white/5 ring-1 ring-white/10 px-3 py-1 text-sm text-slate-200"
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
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
            Filter & explore
          </span>
          <span
            class="inline-flex items-center gap-2 rounded-full bg-white/5 ring-1 ring-white/10 px-3 py-1 text-sm text-slate-200"
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
              <path d="M12 20h9" />
              <path d="M12 4h9" />
              <path d="M14 9l-3 3 3 3" />
              <path d="M3 12h9" />
            </svg>
            Open source first
          </span>
        </div>
      </header>

      <RepositoryGrid :show-filters="true" />
    </section>
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
    transform: translateY(16px) scale(1.03);
  }
  100% {
    transform: translateY(0px) scale(1);
  }
}

.animate-float-slow {
  animation: float-slow 10s ease-in-out infinite;
}

.animate-float-slower {
  animation: float-slower 14s ease-in-out infinite;
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
  animation: fade-up 600ms ease-out;
}
</style>
