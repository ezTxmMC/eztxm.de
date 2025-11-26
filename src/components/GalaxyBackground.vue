<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

interface Star {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  speed: number
}

const stars = ref<Star[]>([])
const animationId = ref<number | null>(null)

function generateStars(count: number): Star[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    opacity: Math.random() * 0.7 + 0.3,
    speed: Math.random() * 0.02 + 0.01,
  }))
}

function animate() {
  stars.value = stars.value.map((star) => ({
    ...star,
    opacity: Math.sin(Date.now() * star.speed * 0.001) * 0.3 + 0.5,
  }))
  animationId.value = requestAnimationFrame(animate)
}

onMounted(() => {
  stars.value = generateStars(150)
  animate()
})

onUnmounted(() => {
  if (animationId.value) {
    cancelAnimationFrame(animationId.value)
  }
})
</script>

<template>
  <div class="galaxy-background">
    <div class="gradient-overlay"></div>
    <div class="stars-container">
      <div
        v-for="star in stars"
        :key="star.id"
        class="star"
        :style="{
          left: `${star.x}%`,
          top: `${star.y}%`,
          width: `${star.size}px`,
          height: `${star.size}px`,
          opacity: star.opacity,
        }"
      ></div>
    </div>
    <div class="nebula"></div>
  </div>
</template>

<style scoped>
.galaxy-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%);
  transition: background var(--transition-normal);
}

:global([data-theme='dark']) .galaxy-background {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
}

.gradient-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(
      ellipse at 20% 20%,
      rgba(139, 92, 246, 0.1) 0%,
      transparent 50%
    ),
    radial-gradient(ellipse at 80% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 50%, rgba(236, 72, 153, 0.05) 0%, transparent 50%);
}

:global([data-theme='dark']) .gradient-overlay {
  background: radial-gradient(
      ellipse at 20% 20%,
      rgba(139, 92, 246, 0.2) 0%,
      transparent 50%
    ),
    radial-gradient(ellipse at 80% 80%, rgba(59, 130, 246, 0.2) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 50%, rgba(236, 72, 153, 0.1) 0%, transparent 50%);
}

.stars-container {
  position: absolute;
  inset: 0;
}

.star {
  position: absolute;
  background: linear-gradient(135deg, var(--galaxy-violet), var(--galaxy-blue));
  border-radius: 50%;
  box-shadow: 0 0 6px rgba(139, 92, 246, 0.5);
  transition: opacity 0.5s ease;
}

:global([data-theme='dark']) .star {
  box-shadow: 0 0 10px rgba(139, 92, 246, 0.8);
}

.nebula {
  position: absolute;
  top: 20%;
  right: 10%;
  width: 400px;
  height: 400px;
  background: radial-gradient(
    circle,
    rgba(139, 92, 246, 0.15) 0%,
    rgba(99, 102, 241, 0.1) 30%,
    transparent 70%
  );
  filter: blur(60px);
  animation: float 20s ease-in-out infinite;
}

:global([data-theme='dark']) .nebula {
  background: radial-gradient(
    circle,
    rgba(139, 92, 246, 0.3) 0%,
    rgba(99, 102, 241, 0.2) 30%,
    transparent 70%
  );
}

@keyframes float {
  0%,
  100% {
    transform: translate(0, 0) rotate(0deg);
  }
  25% {
    transform: translate(-20px, 20px) rotate(5deg);
  }
  50% {
    transform: translate(10px, -10px) rotate(-5deg);
  }
  75% {
    transform: translate(-10px, -20px) rotate(3deg);
  }
}

@media (max-width: 768px) {
  .nebula {
    width: 250px;
    height: 250px;
    right: 5%;
    top: 30%;
  }
}
</style>
