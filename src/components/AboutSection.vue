<script setup lang="ts">
import { onMounted } from 'vue'
import { useGitHub } from '@/composables/useGitHub'

const { user, organizations, fetchUser, fetchOrganizations } = useGitHub()

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

onMounted(() => {
  fetchUser()
  fetchOrganizations()
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
            <h3>{{ user?.name || 'ezTxmMC' }}</h3>
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
              <!-- GitHub -->
              <a
                href="https://github.com/ezTxmMC"
                target="_blank"
                rel="noopener noreferrer"
                class="social-link"
                title="GitHub"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                  />
                </svg>
              </a>
              <!-- YouTube -->
              <a
                href="https://eztxm.de/yt"
                target="_blank"
                rel="noopener noreferrer"
                class="social-link"
                title="YouTube"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
                  />
                </svg>
              </a>
              <!-- Discord -->
              <a
                href="https://eztxm.de/dc"
                target="_blank"
                rel="noopener noreferrer"
                class="social-link"
                title="Discord"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"
                  />
                </svg>
              </a>
              <!-- Twitch -->
              <a
                href="https://eztxm.de/ttv"
                target="_blank"
                rel="noopener noreferrer"
                class="social-link"
                title="Twitch"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"
                  />
                </svg>
              </a>
              <!-- X/Twitter -->
              <a
                href="https://eztxm.de/x"
                target="_blank"
                rel="noopener noreferrer"
                class="social-link"
                title="X (Twitter)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
                  />
                </svg>
              </a>
              <!-- Bluesky -->
              <a
                href="https://eztxm.de/bsky"
                target="_blank"
                rel="noopener noreferrer"
                class="social-link"
                title="Bluesky"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 0 1-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.206-.659-.298-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8Z"
                  />
                </svg>
              </a>
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

      <!-- Organizations Section -->
      <div v-if="organizations.length > 0" class="organizations-section fade-in">
        <h3>Organizations</h3>
        <p class="organizations-subtitle">Member of these GitHub organizations</p>
        <div class="organizations-grid">
          <a
            v-for="org in organizations"
            :key="org.id"
            :href="`https://github.com/${org.login}`"
            target="_blank"
            rel="noopener noreferrer"
            class="org-card glass-card"
          >
            <img :src="org.avatar_url" :alt="org.login" class="org-avatar" />
            <div class="org-info">
              <h4>{{ org.login }}</h4>
              <p v-if="org.description" class="org-description">
                {{ org.description }}
              </p>
              <span class="org-link">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                View on GitHub
              </span>
            </div>
          </a>
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

  .organizations-grid {
    grid-template-columns: 1fr;
  }
}

/* Organizations Section */
.organizations-section {
  margin-top: 3rem;
  text-align: center;
}

.organizations-section h3 {
  margin-bottom: 0.5rem;
}

.organizations-subtitle {
  font-size: 0.95rem;
  color: var(--galaxy-text-muted);
  margin-bottom: 1.5rem;
}

.organizations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  max-width: 900px;
  margin: 0 auto;
}

.org-card {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.25rem;
  text-decoration: none;
  text-align: left;
  transition:
    transform var(--transition-fast),
    box-shadow var(--transition-fast);
}

.org-card:hover {
  transform: translateY(-4px);
}

.org-avatar {
  width: 64px;
  height: 64px;
  border-radius: var(--radius-md);
  flex-shrink: 0;
  border: 2px solid var(--glass-border);
}

.org-info {
  flex: 1;
  min-width: 0;
}

.org-info h4 {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--galaxy-text-primary);
  margin-bottom: 0.25rem;
}

.org-description {
  font-size: 0.875rem;
  color: var(--galaxy-text-secondary);
  line-height: 1.5;
  margin-bottom: 0.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.org-link {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.8rem;
  color: var(--galaxy-violet);
  font-weight: 500;
}

.org-link svg {
  width: 14px;
  height: 14px;
}
</style>
