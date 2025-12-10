<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <section
    class="relative isolate overflow-hidden flex min-h-screen flex-col items-center justify-center px-4 pb-16 pt-8 text-center sm:px-6"
  >
    <div class="absolute inset-0 -z-10">
      <div
        class="pointer-events-none absolute -left-16 top-12 h-60 w-60 rounded-full bg-linear-to-br from-indigo-500/35 via-fuchsia-500/25 to-cyan-400/25 blur-3xl animate-float-slow"
      />
      <div
        class="pointer-events-none absolute right-0 bottom-0 h-72 w-72 rounded-full bg-linear-to-br from-cyan-400/25 via-indigo-500/25 to-fuchsia-500/20 blur-3xl animate-float-slower"
      />
      <div
        class="pointer-events-none absolute left-1/2 top-24 h-32 w-32 -translate-x-1/2 rounded-full border border-white/10 bg-white/5 blur-xl animate-pulse-soft"
      />
    </div>

    <div
      class="mx-auto flex max-w-4xl flex-col items-center gap-6 animate-fade-up"
      style="animation-delay: 40ms"
    >
      <div
        class="relative grid h-28 w-28 place-items-center rounded-3xl border border-white/10 bg-white/5 shadow-lg shadow-violet-500/15 backdrop-blur before:pointer-events-none before:absolute before:inset-0 before:rounded-3xl before:bg-linear-to-br before:from-indigo-500/15 before:via-fuchsia-500/10 before:to-cyan-400/10 before:blur-xl scale-in bounce-hover"
        aria-hidden="true"
      >
        <img src="/logo.png" alt="ezTxmMC Logo" class="h-16 w-16 object-contain" />
      </div>

      <div
        class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 shadow-sm"
        style="animation-delay: 80ms"
      >
        <span class="h-2 w-2 animate-pulse rounded-full bg-emerald-400"></span>
        Developer · Creator · Builder
      </div>

      <h1 class="text-4xl font-bold leading-tight text-white sm:text-5xl">
        Hi, I'm
        <span
          class="bg-linear-to-r from-violet-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent gradient-shift"
        >
          ezTxmMC
        </span>
      </h1>

      <p
        class="max-w-2xl text-lg leading-relaxed text-slate-300 sm:text-xl"
        style="animation-delay: 120ms"
      >
        I build fast, modern experiences across web and backend — TypeScript, Vue, React, Java, Go,
        Docker and more. Always shipping, always learning.
      </p>

      <div class="flex flex-wrap justify-center gap-3" style="animation-delay: 160ms">
        <RouterLink
          to="/projects"
          class="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-violet-500 to-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/30 transition hover:-translate-y-0.5 hover:from-violet-400 hover:to-indigo-400 hover:shadow-xl hover:shadow-violet-500/40"
        >
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
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
          </svg>
          View Projects
        </RouterLink>

        <a
          href="https://github.com/ezTxmMC"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:-translate-y-0.5 hover:border-violet-400 hover:text-white"
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
          GitHub Profile
        </a>
      </div>

      <div
        class="flex flex-wrap justify-center gap-2 text-sm text-slate-200"
        style="animation-delay: 200ms"
      >
        <span
          class="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 ring-1 ring-white/10"
        >
          <span class="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Go · React · Java · Docker
        </span>
        <span
          class="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 ring-1 ring-white/10"
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
          Shipping weekly
        </span>
      </div>

      <div
        class="flex items-center justify-center gap-6 text-left sm:gap-10"
        style="animation-delay: 240ms"
      >
        <div class="text-center">
          <span class="block text-2xl font-bold text-indigo-300">10+</span>
          <span class="text-xs uppercase tracking-[0.2em] text-slate-400">Projects</span>
        </div>
        <div class="h-10 w-px bg-white/10"></div>
        <div class="text-center">
          <span class="block text-2xl font-bold text-indigo-300">5+</span>
          <span class="text-xs uppercase tracking-[0.2em] text-slate-400">Languages</span>
        </div>
        <div class="h-10 w-px bg-white/10"></div>
        <div class="text-center">
          <span class="block text-2xl font-bold text-indigo-300">∞</span>
          <span class="text-xs uppercase tracking-[0.2em] text-slate-400">Ideas</span>
        </div>
      </div>
    </div>

    <div
      class="absolute bottom-10 hidden flex-col items-center gap-2 text-xs text-slate-400 sm:flex"
    >
      <span>Scroll down</span>
      <div class="flex h-8 w-8 items-center justify-center">
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
          class="animate-bounce"
        >
          <path d="M12 5v14" />
          <path d="m19 12-7 7-7-7" />
        </svg>
      </div>
    </div>
  </section>
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

@keyframes pulse-soft {
  0%,
  100% {
    opacity: 0.4;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05);
  }
}

.animate-float-slow {
  animation: float-slow 11s ease-in-out infinite;
}
.animate-float-slower {
  animation: float-slower 15s ease-in-out infinite;
}
.animate-fade-up {
  animation: fade-up 640ms ease-out forwards;
}
.animate-pulse-soft {
  animation: pulse-soft 4s ease-in-out infinite;
}
</style>
