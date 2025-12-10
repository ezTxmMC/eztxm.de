<script setup lang="ts"></script>

<template>
  <main class="relative overflow-hidden px-4 sm:px-6 py-12 lg:py-16 max-w-6xl mx-auto" role="main">
    <div class="absolute inset-0 -z-10">
      <div
        class="pointer-events-none absolute -left-24 top-0 h-64 w-64 rounded-full bg-linear-to-br from-indigo-500/35 via-fuchsia-500/25 to-cyan-400/25 blur-3xl animate-float-slow"
      />
      <div
        class="pointer-events-none absolute right-0 bottom-0 h-72 w-72 rounded-full bg-linear-to-br from-cyan-400/25 via-indigo-500/25 to-fuchsia-500/20 blur-3xl animate-float-slower"
      />
    </div>

    <section class="text-center space-y-4 mb-10 animate-fade-up">
      <p class="text-sm font-semibold uppercase tracking-[0.24em] text-indigo-200">
        Rechtliche Angaben
      </p>
      <h1 class="text-3xl sm:text-4xl font-bold text-white">Impressum</h1>
      <p class="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
        Transparente Angaben zu Verantwortlichen, Kontaktwegen und rechtlichen Hinweisen für
        ezTxmMC.
      </p>
    </section>

    <section class="space-y-6" aria-label="Details">
      <div
        class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 animate-fade-up"
        style="animation-delay: 80ms"
      >
        <article
          class="rounded-2xl bg-slate-900/70 ring-1 ring-white/10 shadow-2xl shadow-indigo-900/40 backdrop-blur p-5 sm:p-6 flex flex-col gap-3"
        >
          <div class="flex items-center gap-2 text-indigo-200 text-sm font-semibold">
            <span class="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" /> Verantwortlicher
          </div>
          <h2 class="text-xl font-semibold text-white">Tom Handrick</h2>
          <address class="not-italic text-slate-200 leading-relaxed">
            ezTxmMC<br />
            Gladiolenweg 30<br />
            14772 Brandenburg an der Havel
          </address>
        </article>

        <article
          class="rounded-2xl bg-slate-900/70 ring-1 ring-white/10 shadow-2xl shadow-indigo-900/40 backdrop-blur p-5 sm:p-6 flex flex-col gap-3"
        >
          <div class="flex items-center gap-2 text-indigo-200 text-sm font-semibold">
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
                d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.05 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z"
              />
            </svg>
            Kontakt
          </div>
          <p class="text-slate-200 leading-relaxed">
            Erreichbar per E-Mail – ideal für geschäftliche oder rechtliche Anfragen.
          </p>
          <a
            class="inline-flex items-center gap-2 w-fit rounded-full bg-indigo-500 text-white px-4 py-2 font-semibold hover:bg-indigo-400 transition"
            href="mailto:business@eztxm.de"
          >
            business@eztxm.de
          </a>
        </article>

        <article
          class="rounded-2xl bg-slate-900/70 ring-1 ring-white/10 shadow-2xl shadow-indigo-900/40 backdrop-blur p-5 sm:p-6 flex flex-col gap-3"
        >
          <div class="flex items-center gap-2 text-indigo-200 text-sm font-semibold">
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
              <path d="M20 13V7a2 2 0 0 0-2-2h-5l-2-2H6a2 2 0 0 0-2 2v12" />
              <rect width="14" height="8" x="4" y="12" rx="2" ry="2" />
            </svg>
            Domains
          </div>
          <div class="flex flex-wrap gap-2.5">
            <a
              class="inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm bg-white/5 ring-1 ring-white/10 text-slate-100 hover:ring-indigo-400/50 transition"
              href="https://whiteguards.exposed"
              target="_blank"
              rel="noopener noreferrer"
              >whiteguards.exposed</a
            >
            <a
              class="inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm bg-white/5 ring-1 ring-white/10 text-slate-100 hover:ring-indigo-400/50 transition"
              href="https://ezarmy.de"
              target="_blank"
              rel="noopener noreferrer"
              >ezarmy.de</a
            >
            <a
              class="inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm bg-white/5 ring-1 ring-white/10 text-slate-100 hover:ring-indigo-400/50 transition"
              href="https://varia.cloud"
              target="_blank"
              rel="noopener noreferrer"
              >varia.cloud</a
            >
            <a
              class="inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm bg-white/5 ring-1 ring-white/10 text-slate-100 hover:ring-indigo-400/50 transition"
              href="https://better2gethermc.de"
              target="_blank"
              rel="noopener noreferrer"
              >better2gethermc.de</a
            >
          </div>
        </article>

        <article
          class="rounded-2xl bg-slate-900/70 ring-1 ring-white/10 shadow-2xl shadow-indigo-900/40 backdrop-blur p-5 sm:p-6 flex flex-col gap-3"
        >
          <div class="flex items-center gap-2 text-indigo-200 text-sm font-semibold">
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
              <path d="M6 4c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2v16l-6-3-6 3V4Z" />
            </svg>
            Social Media
          </div>
          <div class="flex flex-col gap-2">
            <a
              class="text-slate-200 hover:text-white transition"
              href="https://youtube.com/@eztxmmc"
              target="_blank"
              rel="noopener noreferrer"
              >YouTube</a
            >
            <a
              class="text-slate-200 hover:text-white transition"
              href="https://twitch.tv/eztxmmc"
              target="_blank"
              rel="noopener noreferrer"
              >Twitch</a
            >
            <a
              class="text-slate-200 hover:text-white transition"
              href="https://instagram.com/eztxmmc"
              target="_blank"
              rel="noopener noreferrer"
              >Instagram</a
            >
            <a
              class="text-slate-200 hover:text-white transition"
              href="https://bsky.app/profile/eztxm.de"
              target="_blank"
              rel="noopener noreferrer"
              >Bluesky</a
            >
          </div>
        </article>

        <article
          class="rounded-2xl bg-slate-900/70 ring-1 ring-white/10 shadow-2xl shadow-indigo-900/40 backdrop-blur p-5 sm:p-6 flex flex-col gap-3"
        >
          <div class="flex items-center gap-2 text-indigo-200 text-sm font-semibold">
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
              <path d="M6.5 20H20" />
              <path d="M6.5 4H20" />
              <path d="M8 20v2" />
              <path d="M18 20v2" />
              <path d="M8 4V2" />
              <path d="M18 4V2" />
              <path d="M3 9h13" />
              <path d="M3 15h9" />
              <path d="M11 5.5v2" />
              <path d="M7 12v1" />
              <path d="M11 12v1" />
              <path d="M15 12v1" />
            </svg>
            EU-Streitschlichtung
          </div>
          <p class="text-slate-200 leading-relaxed">
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
            <a
              class="text-indigo-200 hover:text-white underline"
              href="https://ec.europa.eu/consumers/odr/"
              target="_blank"
              rel="noopener noreferrer"
              >https://ec.europa.eu/consumers/odr/</a
            >. Unsere E-Mail-Adresse finden Sie oben im Impressum.
          </p>
        </article>

        <article
          class="rounded-2xl bg-slate-900/70 ring-1 ring-white/10 shadow-2xl shadow-indigo-900/40 backdrop-blur p-5 sm:p-6 flex flex-col gap-3"
        >
          <div class="flex items-center gap-2 text-indigo-200 text-sm font-semibold">
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
              <path d="M5 21h14" />
              <path d="M12 17v4" />
              <path d="M17 3H7c-1.1 0-2 .9-2 2v12h14V5c0-1.1-.9-2-2-2Z" />
              <path d="M9 7h6" />
              <path d="M9 11h6" />
            </svg>
            Verbraucherstreitbeilegung
          </div>
          <p class="text-slate-200 leading-relaxed">
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </article>
      </div>

      <p class="text-center text-sm text-slate-400 animate-fade-up" style="animation-delay: 140ms">
        Quelle:
        <a
          class="underline hover:text-white"
          href="https://www.e-recht24.de"
          target="_blank"
          rel="noopener noreferrer"
          >https://www.e-recht24.de</a
        >
      </p>
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
