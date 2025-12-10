<template>
  <section class="relative isolate overflow-hidden px-4 py-12 sm:px-6 lg:py-16">
    <!-- Background effects -->
    <div class="absolute inset-0 -z-10">
      <div
        class="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-linear-to-br from-indigo-500/30 via-fuchsia-500/20 to-cyan-400/20 blur-3xl animate-float-slow"
      />
      <div
        class="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-linear-to-br from-cyan-400/20 via-indigo-500/20 to-fuchsia-500/15 blur-3xl animate-float-slower"
      />

      <!-- Floating tech badges -->
      <div class="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          v-for="(skill, index) in floatingSkills"
          :key="`float-${index}`"
          class="absolute rounded-lg border px-3 py-1.5 text-sm font-medium opacity-40 backdrop-blur-sm"
          :class="[getSkillClasses(skill.category), skill.animation]"
          :style="skill.position"
        >
          {{ skill.name }}
        </div>
      </div>
    </div>

    <div class="mx-auto max-w-6xl">
      <header class="mb-10 text-center">
        <p class="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-300">About</p>
        <h2 class="mt-2 text-3xl font-bold text-white sm:text-4xl">About Me</h2>
        <p class="mx-auto mt-3 max-w-2xl text-base text-slate-300">
          Developer passionate about creating useful products, learning quickly, and contributing to
          great teams.
        </p>
      </header>

      <div class="grid gap-6">
        <!-- Main Profile Card -->
        <div
          class="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/30 backdrop-blur sm:p-8"
        >
          <div class="flex flex-col gap-6 md:flex-row md:items-start">
            <!-- Avatar -->
            <div class="relative mx-auto h-28 w-28 md:mx-0">
              <div
                class="absolute inset-0 rounded-full bg-linear-to-br from-indigo-500 via-fuchsia-500 to-cyan-400 opacity-60 blur-xl"
              />
              <div
                class="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full border border-white/20 bg-slate-900/80"
              >
                <img
                  v-if="user?.avatar_url"
                  :src="user.avatar_url"
                  :alt="user.login"
                  class="h-full w-full object-cover"
                  loading="lazy"
                />
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-12 w-12 text-slate-200"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
            </div>

            <!-- Profile Info -->
            <div class="flex-1 space-y-4 text-center md:text-left">
              <div>
                <h3 class="text-2xl font-semibold text-white">{{ user?.name || 'ezTxmMC' }}</h3>
                <p class="font-mono text-sm text-indigo-200">@{{ user?.login || 'eztxmmc' }}</p>
              </div>
              <p class="text-base leading-relaxed text-slate-200">
                {{
                  user?.bio ||
                  'Passionate developer exploring the world of software development. I enjoy working with various technologies and creating useful applications.'
                }}
              </p>

              <!-- Stats -->
              <dl class="grid grid-cols-3 gap-4 text-center md:text-left">
                <div class="rounded-xl border border-white/10 bg-white/5 p-3">
                  <dt class="text-xs uppercase tracking-wide text-slate-400">Repositories</dt>
                  <dd class="mt-1 text-xl font-semibold text-white">
                    {{ user?.public_repos ?? '...' }}
                  </dd>
                </div>
                <div class="rounded-xl border border-white/10 bg-white/5 p-3">
                  <dt class="text-xs uppercase tracking-wide text-slate-400">Followers</dt>
                  <dd class="mt-1 text-xl font-semibold text-white">
                    {{ user?.followers ?? '...' }}
                  </dd>
                </div>
                <div class="rounded-xl border border-white/10 bg-white/5 p-3">
                  <dt class="text-xs uppercase tracking-wide text-slate-400">Following</dt>
                  <dd class="mt-1 text-xl font-semibold text-white">
                    {{ user?.following ?? '...' }}
                  </dd>
                </div>
              </dl>

              <!-- Social Links -->
              <div class="flex flex-wrap items-center justify-center gap-3 pt-2 md:justify-start">
                <a
                  v-for="social in socialLinks"
                  :key="social.label"
                  :href="social.href"
                  :aria-label="social.label"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="group inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-200 transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:border-violet-400/50 hover:bg-violet-500/10 hover:text-white hover:shadow-lg hover:shadow-violet-500/30"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    class="h-5 w-5"
                    fill="currentColor"
                    aria-hidden="true"
                    v-html="social.icon"
                  ></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Organizations Section -->
      <section v-if="organizations.length > 0" class="mt-12">
        <div class="mb-6">
          <p class="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-300">
            Organizations
          </p>
          <h3 class="text-2xl font-semibold text-white">Member of these GitHub orgs</h3>
          <p class="text-sm text-slate-400">Tap an org to view repositories.</p>
        </div>
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <RouterLink
            v-for="org in organizations"
            :key="org.id"
            :to="`/organization/${org.login}`"
            class="group flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 shadow-lg shadow-black/30 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-violet-400/50 hover:shadow-violet-500/30"
          >
            <img
              :src="org.avatar_url"
              :alt="org.login"
              class="h-14 w-14 rounded-xl border border-white/10"
              loading="lazy"
            />
            <div class="min-w-0 flex-1">
              <div class="flex items-center gap-2">
                <h4 class="truncate text-lg font-semibold text-white">{{ org.login }}</h4>
                <span class="text-indigo-300 opacity-0 transition-opacity group-hover:opacity-100"
                  >→</span
                >
              </div>
              <p v-if="org.description" class="mt-1 line-clamp-2 text-sm text-slate-300">
                {{ org.description }}
              </p>
              <p v-else class="mt-1 text-sm text-slate-500">No description available</p>
            </div>
          </RouterLink>
        </div>
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useGitHub } from '@/composables/useGitHub'

const { user, organizations, fetchUser, fetchOrganizations } = useGitHub()

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/ezTxmMC',
    icon: '<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>',
  },
  {
    label: 'YouTube',
    href: 'https://eztxm.de/yt',
    icon: '<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>',
  },
  {
    label: 'Discord',
    href: 'https://eztxm.de/dc',
    icon: '<path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>',
  },
  {
    label: 'Twitch',
    href: 'https://eztxm.de/ttv',
    icon: '<path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>',
  },
  {
    label: 'X (Twitter)',
    href: 'https://eztxm.de/x',
    icon: '<path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>',
  },
  {
    label: 'Bluesky',
    href: 'https://eztxm.de/bsky',
    icon: '<path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 0 1-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.206-.659-.298-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8Z"/>',
  },
]

const skills = [
  { name: 'Java', category: 'language' },
  { name: 'Kotlin', category: 'language' },
  { name: 'TypeScript', category: 'language' },
  { name: 'JavaScript', category: 'language' },
  { name: 'Python', category: 'language' },
  { name: 'Go', category: 'language' },
  { name: 'Dart', category: 'language' },
  { name: 'Vue.js', category: 'framework' },
  { name: 'React', category: 'framework' },
  { name: 'Node.js', category: 'framework' },
  { name: 'Express', category: 'framework' },
  { name: 'Flutter', category: 'framework' },
  { name: 'TailwindCSS', category: 'style' },
  { name: 'SASS', category: 'style' },
  { name: 'Docker', category: 'tool' },
  { name: 'Git', category: 'tool' },
  { name: 'Vite', category: 'tool' },
  { name: 'Linux', category: 'tool' },
]

const skillTheme: Record<string, string> = {
  language: 'border-indigo-400/40 bg-indigo-500/10 text-indigo-100',
  framework: 'border-cyan-400/40 bg-cyan-500/10 text-cyan-100',
  style: 'border-amber-400/40 bg-amber-500/10 text-amber-100',
  tool: 'border-fuchsia-400/40 bg-fuchsia-500/10 text-fuchsia-100',
}

const getSkillClasses = (category: string) =>
  skillTheme[category] ?? 'border-white/10 bg-white/5 text-white'

// Generate floating skills with random positions and animations
const floatingSkills = skills.map((skill, index) => ({
  ...skill,
  position: {
    left: `${(index * 13 + 5) % 95}%`,
    top: `${(index * 17 + 10) % 85}%`,
  },
  animation: `animate-float-${['slow', 'slower', 'diagonal', 'reverse'][index % 4]}`,
}))

onMounted(() => {
  fetchUser()
  fetchOrganizations()
})
</script>

<style scoped>
@keyframes float-slow {
  0%,
  100% {
    transform: translateY(0px) translateX(0px) scale(1);
  }
  50% {
    transform: translateY(-20px) translateX(10px) scale(1.05);
  }
}

@keyframes float-slower {
  0%,
  100% {
    transform: translateY(0px) translateX(0px) scale(1);
  }
  50% {
    transform: translateY(25px) translateX(-15px) scale(1.08);
  }
}

@keyframes float-diagonal {
  0%,
  100% {
    transform: translate(0px, 0px) rotate(0deg);
  }
  50% {
    transform: translate(30px, -25px) rotate(5deg);
  }
}

@keyframes float-reverse {
  0%,
  100% {
    transform: translate(0px, 0px) rotate(0deg);
  }
  50% {
    transform: translate(-25px, 20px) rotate(-5deg);
  }
}

.animate-float-slow {
  animation: float-slow 12s ease-in-out infinite;
}

.animate-float-slower {
  animation: float-slower 16s ease-in-out infinite;
}

.animate-float-diagonal {
  animation: float-diagonal 14s ease-in-out infinite;
}

.animate-float-reverse {
  animation: float-reverse 18s ease-in-out infinite;
}
</style>
