<script setup lang="ts">
import { onMounted } from 'vue'
import { useGitHub } from '@/composables/useGitHub'

const { user, fetchUser } = useGitHub()

const skills = [
  { name: 'TypeScript', category: 'language' },
  { name: 'JavaScript', category: 'language' },
  { name: 'Kotlin', category: 'language' },
  { name: 'Java', category: 'language' },
  { name: 'Python', category: 'language' },
  { name: 'Vue.js', category: 'framework' },
  { name: 'React', category: 'framework' },
  { name: 'Node.js', category: 'framework' },
  { name: 'Vite', category: 'tool' },
  { name: 'Git', category: 'tool' },
  { name: 'Docker', category: 'tool' },
  { name: 'Linux', category: 'tool' },
]

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/ezTxmMC',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`,
  },
]

onMounted(() => {
  fetchUser()
})
</script>

<template>
  <section class="about-section section">
    <div class="container">
      <div class="section-header fade-in">
        <h2>About <span class="gradient-text">Me</span></h2>
        <p class="section-subtitle">
          Developer passionate about creating innovative solutions
        </p>
      </div>

      <div class="about-content">
        <div class="about-info glass-card fade-in">
          <div class="avatar-container">
            <img
              v-if="user?.avatar_url"
              :src="user.avatar_url"
              :alt="user.login"
              class="avatar"
            />
            <div v-else class="avatar-placeholder">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
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

          <div class="info-content">
            <h3>{{ user?.name || 'ezTxm' }}</h3>
            <p class="bio">
              {{
                user?.bio ||
                'Passionate developer exploring the world of software development. I enjoy working with various technologies and creating useful applications.'
              }}
            </p>

            <div class="stats-row">
              <div class="stat-item">
                <span class="stat-number gradient-text">
                  {{ user?.public_repos || '...' }}
                </span>
                <span class="stat-text">Repositories</span>
              </div>
              <div class="stat-item">
                <span class="stat-number gradient-text">
                  {{ user?.followers || '...' }}
                </span>
                <span class="stat-text">Followers</span>
              </div>
              <div class="stat-item">
                <span class="stat-number gradient-text">
                  {{ user?.following || '...' }}
                </span>
                <span class="stat-text">Following</span>
              </div>
            </div>

            <div class="social-links">
              <a
                v-for="link in socialLinks"
                :key="link.name"
                :href="link.url"
                target="_blank"
                rel="noopener noreferrer"
                class="social-link"
                :title="link.name"
                v-html="link.icon"
              ></a>
            </div>
          </div>
        </div>

        <div class="skills-section fade-in">
          <h3>Skills & Technologies</h3>
          <div class="skills-grid">
            <div
              v-for="skill in skills"
              :key="skill.name"
              class="skill-badge glass-card"
              :class="skill.category"
            >
              {{ skill.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-section {
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

.about-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.about-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem;
}

.avatar-container {
  margin-bottom: 1.5rem;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 3px solid var(--galaxy-violet);
  box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
}

.avatar-placeholder {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    var(--galaxy-violet),
    var(--galaxy-blue)
  );
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.info-content h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.bio {
  font-size: 0.95rem;
  color: var(--galaxy-text-secondary);
  line-height: 1.7;
  margin-bottom: 1.5rem;
}

.stats-row {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 1.5rem;
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
}

.stat-text {
  font-size: 0.75rem;
  color: var(--galaxy-text-muted);
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: var(--radius-md);
  background: var(--galaxy-light-gray);
  color: var(--galaxy-text-secondary);
  transition:
    background var(--transition-fast),
    color var(--transition-fast),
    transform var(--transition-fast);
}

.social-link:hover {
  background: var(--galaxy-violet);
  color: white;
  transform: translateY(-2px);
}

.skills-section {
  padding: 2rem;
}

.skills-section h3 {
  margin-bottom: 1.5rem;
  text-align: center;
}

.skills-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
}

.skill-badge {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: var(--radius-md);
  transition:
    transform var(--transition-fast),
    box-shadow var(--transition-fast);
}

.skill-badge:hover {
  transform: translateY(-2px);
}

.skill-badge.language {
  background: linear-gradient(
    135deg,
    rgba(139, 92, 246, 0.1),
    rgba(99, 102, 241, 0.1)
  );
  border: 1px solid rgba(139, 92, 246, 0.3);
  color: var(--galaxy-violet);
}

.skill-badge.framework {
  background: linear-gradient(
    135deg,
    rgba(59, 130, 246, 0.1),
    rgba(6, 182, 212, 0.1)
  );
  border: 1px solid rgba(59, 130, 246, 0.3);
  color: var(--galaxy-blue);
}

.skill-badge.tool {
  background: linear-gradient(
    135deg,
    rgba(236, 72, 153, 0.1),
    rgba(139, 92, 246, 0.1)
  );
  border: 1px solid rgba(236, 72, 153, 0.3);
  color: var(--galaxy-pink);
}

@media (max-width: 768px) {
  .about-content {
    grid-template-columns: 1fr;
  }

  .stats-row {
    gap: 1.5rem;
  }
}
</style>
