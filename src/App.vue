<script setup lang="ts">
import { RouterView } from 'vue-router'
import GalaxyBackground from './components/GalaxyBackground.vue'
import NavigationBar from './components/NavigationBar.vue'
import FooterSection from './components/FooterSection.vue'
</script>

<template>
  <GalaxyBackground />
  <NavigationBar />
  <RouterView />
  <FooterSection />
</template>

<style scoped>
/* App-level scoped styles are minimal since we use galaxy-theme.css */
</style>
