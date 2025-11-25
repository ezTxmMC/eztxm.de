<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="hero">
    <div class="hero-content">
      <div class="hero-badge fade-in">
        <span class="badge-dot"></span>
        Developer & Creator
      </div>

      <h1 class="hero-title fade-in">
        Hi, I'm <span class="gradient-text">ezTxmMC</span>
      </h1>

      <p class="hero-description fade-in">
        Passionate about building modern applications and exploring new technologies.
        I enjoy working with TypeScript, Vue.js, Kotlin, and more.
      </p>

      <div class="hero-buttons fade-in">
        <RouterLink to="/projects" class="gradient-button">
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
          class="outline-button"
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

      <div class="hero-stats fade-in">
        <div class="stat">
          <span class="stat-value gradient-text">10+</span>
          <span class="stat-label">Projects</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat">
          <span class="stat-value gradient-text">5+</span>
          <span class="stat-label">Languages</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat">
          <span class="stat-value gradient-text">∞</span>
          <span class="stat-label">Ideas</span>
        </div>
      </div>
    </div>

    <div class="scroll-indicator">
      <span>Scroll down</span>
      <div class="scroll-arrow">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M12 5v14" />
          <path d="m19 12-7 7-7-7" />
        </svg>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 6rem 1.5rem 2rem;
  position: relative;
}

.hero-content {
  max-width: 800px;
  text-align: center;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--glass-background);
  backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-2xl);
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--galaxy-text-secondary);
  margin-bottom: 1.5rem;
  animation-delay: 0.1s;
}

.badge-dot {
  width: 8px;
  height: 8px;
  background: var(--galaxy-violet);
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.hero-title {
  font-size: clamp(2.5rem, 8vw, 4.5rem);
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  animation-delay: 0.2s;
}

.hero-description {
  font-size: 1.125rem;
  color: var(--galaxy-text-secondary);
  max-width: 600px;
  margin: 0 auto 2rem;
  line-height: 1.7;
  animation-delay: 0.3s;
}

.hero-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  animation-delay: 0.4s;
}

.hero-stats {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  animation-delay: 0.5s;
}

.stat {
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 2rem;
  font-weight: 700;
}

.stat-label {
  font-size: 0.875rem;
  color: var(--galaxy-text-muted);
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: var(--glass-border);
}

.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: var(--galaxy-text-muted);
  font-size: 0.75rem;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(8px);
  }
}

.scroll-arrow svg {
  width: 20px;
  height: 20px;
}

@media (max-width: 768px) {
  .hero {
    padding: 5rem 1rem 2rem;
  }

  .hero-description {
    font-size: 1rem;
  }

  .hero-buttons {
    flex-direction: column;
    align-items: center;
  }

  .hero-stats {
    gap: 1.5rem;
  }

  .stat-value {
    font-size: 1.5rem;
  }

  .scroll-indicator {
    display: none;
  }
}
</style>
