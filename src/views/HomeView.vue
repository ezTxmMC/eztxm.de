<script setup lang="ts">
import HeroSection from '../components/HeroSection.vue'
import RepositoryGrid from '../components/RepositoryGrid.vue'
import { RouterLink } from 'vue-router'
</script>

<template>
  <main>
    <HeroSection />

    <section class="featured-projects section">
      <div class="container">
        <div class="section-header fade-in">
          <h2>Featured <span class="gradient-text">Projects</span></h2>
          <p class="section-subtitle">
            A selection of my recent work from GitHub
          </p>
        </div>

        <RepositoryGrid :limit="6" :show-filters="false" />

        <div class="view-all-container fade-in">
          <RouterLink to="/projects" class="gradient-button">
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

<style scoped>
.featured-projects {
  padding: 5rem 1.5rem;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-header h2 {
  margin-bottom: 0.5rem;
}

.section-subtitle {
  font-size: 1.125rem;
  color: var(--galaxy-text-muted);
}

.view-all-container {
  display: flex;
  justify-content: center;
  margin-top: 3rem;
}
</style>
