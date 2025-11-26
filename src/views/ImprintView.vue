<script setup lang="ts"></script>

<template>
  <main class="imprint-page">
    <section class="imprint-section section">
      <div class="container">
        <div class="section-header fade-in">
          <h1>
            <span class="gradient-text">Imprint</span>
          </h1>
          <p class="section-subtitle">Legal information</p>
        </div>

        <div class="imprint-content glass-card fade-in">
          <div class="imprint-block">
            <h2>Information according to § 5 TMG</h2>
            <p>ezTxmMC</p>
          </div>

          <div class="imprint-block">
            <h2>Contact</h2>
            <p>
              GitHub:
              <a
                href="https://github.com/ezTxmMC"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/ezTxmMC
              </a>
            </p>
          </div>

          <div class="imprint-block">
            <h2>Disclaimer</h2>
            <h3>Liability for Content</h3>
            <p>
              The contents of our pages were created with the greatest care. However, we
              cannot guarantee the accuracy, completeness, or timeliness of the content.
              As a service provider, we are responsible for our own content on these pages
              in accordance with general laws. However, we are not obligated to monitor
              transmitted or stored third-party information or to investigate circumstances
              that indicate illegal activity.
            </p>

            <h3>Liability for Links</h3>
            <p>
              Our website contains links to external third-party websites over whose
              content we have no influence. Therefore, we cannot assume any liability for
              this external content. The respective provider or operator of the pages is
              always responsible for the content of the linked pages. The linked pages
              were checked for possible legal violations at the time of linking.
            </p>

            <h3>Copyright</h3>
            <p>
              The content and works created on these pages by the site operator are subject
              to copyright law. Duplication, processing, distribution, or any form of
              commercialization of such material beyond the scope of copyright law shall
              require the prior written consent of its respective author or creator.
            </p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.imprint-page {
  padding-top: 5rem;
}

.imprint-section {
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

.imprint-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 2.5rem;
}

.imprint-block {
  margin-bottom: 2rem;
}

.imprint-block:last-child {
  margin-bottom: 0;
}

.imprint-block h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--galaxy-text-primary);
}

.imprint-block h3 {
  font-size: 1.125rem;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--galaxy-text-primary);
}

.imprint-block p {
  color: var(--galaxy-text-secondary);
  line-height: 1.7;
  margin-bottom: 0.75rem;
}

.imprint-block a {
  color: var(--galaxy-violet);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.imprint-block a:hover {
  color: var(--galaxy-purple);
}

@media (max-width: 768px) {
  .imprint-content {
    padding: 1.5rem;
  }
}
</style>
