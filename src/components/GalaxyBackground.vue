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
  <div
    class="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-linear-to-br from-slate-950 via-slate-900 to-slate-950"
  >
    <div
      class="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(139,92,246,0.18)_0%,transparent_45%),radial-gradient(ellipse_at_80%_80%,rgba(59,130,246,0.18)_0%,transparent_45%),radial-gradient(ellipse_at_55%_60%,rgba(236,72,153,0.12)_0%,transparent_55%)]"
    ></div>

    <div class="absolute inset-0">
      <div
        v-for="star in stars"
        :key="star.id"
        class="absolute rounded-full bg-linear-to-r from-violet-400 to-blue-400 shadow-[0_0_12px_rgba(137,176,255,0.65)] transition-opacity duration-500"
        :style="{
          left: `${star.x}%`,
          top: `${star.y}%`,
          width: `${star.size}px`,
          height: `${star.size}px`,
          opacity: star.opacity,
        }"
      ></div>
    </div>

    <div
      class="absolute right-[8%] top-[18%] h-[360px] w-[360px] animate-[float_20s_ease-in-out_infinite] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.3)_0%,rgba(99,102,241,0.18)_30%,transparent_70%)] blur-[60px] md:right-[10%] md:top-[20%] md:h-[420px] md:w-[420px]"
    ></div>
  </div>
</template>

<style scoped>
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
</style>
