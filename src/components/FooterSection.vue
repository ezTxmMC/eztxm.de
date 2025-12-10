<script setup lang="ts">
const currentYear = new Date().getFullYear()

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/ezTxmMC',
    icon: `<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>`,
  },
  {
    name: 'Discord',
    href: 'https://discord.gg/eztxmmc',
    icon: `<path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>`,
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/eztxmmc',
    icon: `<path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>`,
  },
]

const quickLinks = [
  { name: 'Home', to: '/' },
  { name: 'Projects', to: '/projects' },
  { name: 'About', to: '/about' },
]

const legalLinks = [{ name: 'Imprint', to: '/imprint' }]
</script>

<template>
  <footer class="relative border-t border-white/10 bg-slate-950/80 backdrop-blur-xl">
    <!-- Animated gradient accents -->
    <div class="absolute inset-0 -z-10 overflow-hidden">
      <div
        class="pointer-events-none absolute -left-20 top-0 h-48 w-48 rounded-full bg-linear-to-br from-indigo-500/20 via-fuchsia-500/15 to-transparent blur-3xl animate-float-slow"
      />
      <div
        class="pointer-events-none absolute -right-20 bottom-0 h-48 w-48 rounded-full bg-linear-to-tl from-cyan-500/20 via-violet-500/15 to-transparent blur-3xl animate-float-slower"
      />
    </div>

    <div class="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <div class="grid gap-12 lg:grid-cols-3">
        <!-- Brand Section -->
        <div class="space-y-4">
          <div class="flex items-center gap-3">
            <div
              class="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 backdrop-blur"
            >
              <img src="/logo.png" alt="ezTxmMC" class="h-6 w-6 object-contain" />
            </div>
            <span class="text-xl font-bold text-white">ezTxmMC</span>
          </div>
          <p class="max-w-sm text-sm leading-relaxed text-slate-400">
            Building modern, fast, and reliable experiences with Go, React, Java, and more. Always
            shipping, always learning.
          </p>
          <div class="flex items-center gap-3">
            <a
              v-for="link in socialLinks"
              :key="link.name"
              :href="link.href"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:border-violet-400/50 hover:bg-violet-500/10 hover:text-white hover:shadow-lg hover:shadow-violet-500/30"
              :aria-label="link.name"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="transition group-hover:scale-110"
                v-html="link.icon"
              ></svg>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="space-y-4">
          <h3 class="text-sm font-semibold uppercase tracking-wider text-slate-300">Quick Links</h3>
          <ul class="space-y-2">
            <li v-for="item in quickLinks" :key="item.name">
              <RouterLink
                :to="item.to"
                class="group inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-violet-300"
              >
                <span
                  class="h-1 w-1 rounded-full bg-slate-500 transition group-hover:bg-violet-400"
                ></span>
                {{ item.name }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Contact & Legal -->
        <div class="space-y-4">
          <h3 class="text-sm font-semibold uppercase tracking-wider text-slate-300">Legal</h3>
          <ul class="space-y-2">
            <li v-for="item in legalLinks" :key="item.name">
              <RouterLink
                :to="item.to"
                class="group inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-violet-300"
              >
                <span
                  class="h-1 w-1 rounded-full bg-slate-500 transition group-hover:bg-violet-400"
                ></span>
                {{ item.name }}
              </RouterLink>
            </li>
          </ul>
          <div class="pt-4">
            <p class="text-xs text-slate-500">
              <a
                href="mailto:contact@eztxm.de"
                class="transition hover:text-violet-300 hover:underline"
              >
                contact@eztxm.de
              </a>
            </p>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div
        class="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-slate-500 sm:flex-row"
      >
        <p>© {{ currentYear }} ezTxmMC. All rights reserved.</p>
        <p class="flex items-center gap-2">
          Made with
          <span class="inline-block animate-pulse text-pink-400">♥</span>
          using Vue & TailwindCSS
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
@keyframes float-slow {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-12px);
  }
  100% {
    transform: translateY(0px);
  }
}

@keyframes float-slower {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(10px);
  }
  100% {
    transform: translateY(0px);
  }
}

.animate-float-slow {
  animation: float-slow 10s ease-in-out infinite;
}

.animate-float-slower {
  animation: float-slower 14s ease-in-out infinite;
}
</style>
