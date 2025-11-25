<script setup lang="ts">
import RepositoryGrid from '../components/RepositoryGrid.vue'
</script>

<template>
  <main class="projects-page">
    <section class="projects-section section">
      <div class="container">
        <div class="section-header fade-in">
          <h1>My <span class="gradient-text">Projects</span></h1>
          <p class="section-subtitle">
            All my public repositories from GitHub, automatically updated
          </p>
        </div>

        <RepositoryGrid :show-filters="true" />
      </div>
    </section>
  </main>
</template>

<style scoped>
.projects-page {
  padding-top: 5rem;
}

.projects-section {
  padding: 5rem 1.5rem;
  min-height: calc(100vh - 5rem);
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-header h1 {
  margin-bottom: 0.5rem;
}

.section-subtitle {
  font-size: 1.125rem;
  color: var(--galaxy-text-muted);
}
</style>
