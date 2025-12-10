<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

function handleScroll() {
  isScrolled.value = window.scrollY > 50
}

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  document.documentElement.setAttribute('data-theme', 'dark')
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <nav
    :class="[
      'fixed inset-x-0 top-0 z-50 transition-all duration-300',
      isScrolled
        ? 'border-b border-white/10 bg-slate-900/80 py-3 shadow-lg backdrop-blur-xl'
        : 'bg-transparent py-4',
    ]"
  >
    <div class="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6">
      <RouterLink
        to="/"
        class="flex items-center gap-2 text-lg font-semibold tracking-tight"
        @click="closeMobileMenu"
      >
        <span
          class="bg-linear-to-r from-violet-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent gradient-shift"
        >
          ezTxmMC
        </span>
      </RouterLink>

      <div class="hidden items-center gap-8 md:flex">
        <RouterLink
          to="/"
          class="relative text-sm font-medium text-slate-200 transition-all duration-300 hover:text-violet-200 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-violet-400 after:transition-all after:duration-300 hover:after:w-full"
          :class="{ 'text-violet-200 after:w-full': route.path === '/' }"
          @click="closeMobileMenu"
        >
          Home
        </RouterLink>
        <RouterLink
          to="/projects"
          class="relative text-sm font-medium text-slate-200 transition-all duration-300 hover:text-violet-200 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-violet-400 after:transition-all after:duration-300 hover:after:w-full"
          :class="{ 'text-violet-200 after:w-full': route.path === '/projects' }"
          @click="closeMobileMenu"
        >
          Projects
        </RouterLink>
        <RouterLink
          to="/about"
          class="relative text-sm font-medium text-slate-200 transition-all duration-300 hover:text-violet-200 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-violet-400 after:transition-all after:duration-300 hover:after:w-full"
          :class="{ 'text-violet-200 after:w-full': route.path === '/about' }"
          @click="closeMobileMenu"
        >
          About
        </RouterLink>
        <RouterLink
          to="/imprint"
          class="relative text-sm font-medium text-slate-200 transition-all duration-300 hover:text-violet-200 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-violet-400 after:transition-all after:duration-300 hover:after:w-full"
          :class="{ 'text-violet-200 after:w-full': route.path === '/imprint' }"
          @click="closeMobileMenu"
        >
          Imprint
        </RouterLink>
      </div>

      <a
        href="https://github.com/ezTxmMC"
        target="_blank"
        rel="noopener noreferrer"
        class="hidden items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:border-violet-400 hover:text-white hover:shadow-lg hover:shadow-violet-500/30 md:inline-flex"
        @click="closeMobileMenu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
          />
        </svg>
        GitHub
      </a>

      <button
        class="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-100 transition hover:-translate-y-0.5 hover:border-violet-400 hover:text-white hover:shadow-violet-500/30 md:hidden"
        @click="toggleMobileMenu"
        :aria-expanded="isMobileMenuOpen"
        aria-label="Toggle navigation"
      >
        <span class="sr-only">Toggle navigation</span>
        <span class="flex h-5 w-6 flex-col justify-between">
          <span
            :class="[
              'h-0.5 w-full rounded-full bg-current transition',
              isMobileMenuOpen ? 'translate-y-2 rotate-45' : '',
            ]"
          ></span>
          <span
            :class="[
              'h-0.5 w-full rounded-full bg-current transition',
              isMobileMenuOpen ? 'opacity-0' : '',
            ]"
          ></span>
          <span
            :class="[
              'h-0.5 w-full rounded-full bg-current transition',
              isMobileMenuOpen ? '-translate-y-2 -rotate-45' : '',
            ]"
          ></span>
        </span>
      </button>

      <div
        :class="[
          'absolute right-4 top-[calc(100%+0.75rem)] w-64 rounded-2xl border border-white/10 bg-slate-900/95 p-4 shadow-xl backdrop-blur-xl transition-all duration-200 md:hidden',
          isMobileMenuOpen
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-1 opacity-0',
        ]"
      >
        <RouterLink
          to="/"
          class="block rounded-lg px-3 py-2 text-sm font-medium text-slate-100 transition hover:bg-white/5"
          :class="{ 'bg-white/5 text-violet-200': route.path === '/' }"
          @click="closeMobileMenu"
        >
          Home
        </RouterLink>
        <RouterLink
          to="/projects"
          class="block rounded-lg px-3 py-2 text-sm font-medium text-slate-100 transition hover:bg-white/5"
          :class="{ 'bg-white/5 text-violet-200': route.path === '/projects' }"
          @click="closeMobileMenu"
        >
          Projects
        </RouterLink>
        <RouterLink
          to="/about"
          class="block rounded-lg px-3 py-2 text-sm font-medium text-slate-100 transition hover:bg-white/5"
          :class="{ 'bg-white/5 text-violet-200': route.path === '/about' }"
          @click="closeMobileMenu"
        >
          About
        </RouterLink>
        <RouterLink
          to="/imprint"
          class="block rounded-lg px-3 py-2 text-sm font-medium text-slate-100 transition hover:bg-white/5"
          :class="{ 'bg-white/5 text-violet-200': route.path === '/imprint' }"
          @click="closeMobileMenu"
        >
          Imprint
        </RouterLink>
        <a
          href="https://github.com/ezTxmMC"
          target="_blank"
          rel="noopener noreferrer"
          class="mt-2 flex items-center gap-2 rounded-lg bg-linear-to-r from-violet-500 to-indigo-500 px-3 py-2 text-sm font-semibold text-white transition hover:from-violet-400 hover:to-indigo-400"
          @click="closeMobileMenu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
            />
          </svg>
          GitHub
        </a>
      </div>
    </div>
  </nav>
</template>
