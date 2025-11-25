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
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <nav class="navbar" :class="{ scrolled: isScrolled }">
    <div class="nav-container">
      <RouterLink to="/" class="nav-logo" @click="closeMobileMenu">
        <span class="logo-text">ezTxm</span>
      </RouterLink>

      <button
        class="mobile-toggle"
        @click="toggleMobileMenu"
        :aria-expanded="isMobileMenuOpen"
        aria-label="Toggle navigation"
      >
        <span class="hamburger" :class="{ active: isMobileMenuOpen }"></span>
      </button>

      <div class="nav-links" :class="{ active: isMobileMenuOpen }">
        <RouterLink
          to="/"
          class="nav-link"
          :class="{ active: route.path === '/' }"
          @click="closeMobileMenu"
        >
          Home
        </RouterLink>
        <RouterLink
          to="/projects"
          class="nav-link"
          :class="{ active: route.path === '/projects' }"
          @click="closeMobileMenu"
        >
          Projects
        </RouterLink>
        <RouterLink
          to="/about"
          class="nav-link"
          :class="{ active: route.path === '/about' }"
          @click="closeMobileMenu"
        >
          About
        </RouterLink>
        <a
          href="https://github.com/ezTxmMC"
          target="_blank"
          rel="noopener noreferrer"
          class="nav-link github-link"
          @click="closeMobileMenu"
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
          GitHub
        </a>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 1rem 1.5rem;
  transition:
    background var(--transition-normal),
    box-shadow var(--transition-normal),
    padding var(--transition-normal);
}

.navbar.scrolled {
  background: var(--glass-background);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  box-shadow: var(--shadow-md);
  padding: 0.75rem 1.5rem;
}

.nav-container {
  max-width: var(--container-max-width);
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(
    135deg,
    var(--galaxy-violet),
    var(--galaxy-blue)
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-link {
  position: relative;
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--galaxy-text-secondary);
  text-decoration: none;
  transition: color var(--transition-fast);
  display: flex;
  align-items: center;
  gap: 0.375rem;
}

.nav-link:hover,
.nav-link.active {
  color: var(--galaxy-violet);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(
    135deg,
    var(--galaxy-violet),
    var(--galaxy-blue)
  );
  border-radius: 1px;
  transition: width var(--transition-fast);
}

.nav-link:hover::after,
.nav-link.active::after {
  width: 100%;
}

.github-link {
  padding: 0.5rem 1rem;
  border-radius: var(--radius-md);
  background: var(--glass-background);
  border: 1px solid var(--glass-border);
}

.github-link:hover {
  background: var(--galaxy-violet);
  color: white;
  border-color: var(--galaxy-violet);
}

.github-link::after {
  display: none;
}

.mobile-toggle {
  display: none;
  padding: 0.5rem;
  background: transparent;
  border: none;
  cursor: pointer;
}

.hamburger {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--galaxy-text-primary);
  border-radius: 2px;
  position: relative;
  transition: background var(--transition-fast);
}

.hamburger::before,
.hamburger::after {
  content: '';
  position: absolute;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--galaxy-text-primary);
  border-radius: 2px;
  transition: transform var(--transition-fast);
}

.hamburger::before {
  top: -7px;
}

.hamburger::after {
  top: 7px;
}

.hamburger.active {
  background: transparent;
}

.hamburger.active::before {
  transform: translateY(7px) rotate(45deg);
}

.hamburger.active::after {
  transform: translateY(-7px) rotate(-45deg);
}

@media (max-width: 768px) {
  .mobile-toggle {
    display: block;
  }

  .nav-links {
    position: fixed;
    top: 0;
    right: -100%;
    width: 70%;
    max-width: 300px;
    height: 100vh;
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
    padding: 5rem 2rem;
    background: var(--glass-background);
    backdrop-filter: var(--glass-blur);
    -webkit-backdrop-filter: var(--glass-blur);
    box-shadow: var(--shadow-lg);
    transition: right var(--transition-normal);
  }

  .nav-links.active {
    right: 0;
  }

  .nav-link {
    font-size: 1.125rem;
  }
}
</style>
