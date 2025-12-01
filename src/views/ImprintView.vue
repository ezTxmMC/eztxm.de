<script setup lang="ts"></script>

<template>
  <main class="imprint-page" role="main">
    <section class="imprint-hero">
      <p class="hero-eyebrow">Rechtliche Angaben</p>
      <h1>Impressum</h1>
      <p class="hero-lede">
        Transparente Angaben zu Verantwortlichen, Kontaktwegen und rechtlichen Hinweisen für
        ezTxmMC.
      </p>
    </section>

    <section class="imprint-section" aria-label="Details">
      <div class="card-grid">
        <article class="imprint-card">
          <h2>Verantwortlicher</h2>
          <address>
            <strong>Tom Handrick</strong><br />
            ezTxmMC<br />
            Gladiolenweg 30<br />
            14772 Brandenburg an der Havel
          </address>
        </article>

        <article class="imprint-card">
          <h2>Kontakt</h2>
          <p>Erreichbar per E-Mail – ideal für geschäftliche oder rechtliche Anfragen.</p>
          <a class="cta-link" href="mailto:business@eztxm.de">business@eztxm.de</a>
        </article>

        <article class="imprint-card">
          <h2>Domains</h2>
          <div class="badge-group">
            <a href="https://whiteguards.exposed" target="_blank" rel="noopener noreferrer"
              >whiteguards.exposed</a
            >
            <a href="https://ezarmy.de" target="_blank" rel="noopener noreferrer">ezarmy.de</a>
            <a href="https://varia.cloud" target="_blank" rel="noopener noreferrer">varia.cloud</a>
            <a href="https://better2gethermc.de" target="_blank" rel="noopener noreferrer"
              >better2gethermc.de</a
            >
          </div>
        </article>

        <article class="imprint-card">
          <h2>Social Media</h2>
          <div class="link-list">
            <a href="https://youtube.com/@eztxmmc" target="_blank" rel="noopener noreferrer"
              >YouTube</a
            >
            <a href="https://twitch.tv/eztxmmc" target="_blank" rel="noopener noreferrer">Twitch</a>
            <a href="https://instagram.com/eztxmmc" target="_blank" rel="noopener noreferrer"
              >Instagram</a
            >
            <a href="https://bsky.app/profile/eztxm.de" target="_blank" rel="noopener noreferrer"
              >Bluesky</a
            >
          </div>
        </article>

        <article class="imprint-card">
          <h2>EU-Streitschlichtung</h2>
          <p>
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
            <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer"
              >https://ec.europa.eu/consumers/odr/</a
            >. Unsere E-Mail-Adresse finden Sie oben im Impressum.
          </p>
        </article>

        <article class="imprint-card">
          <h2>Verbraucherstreitbeilegung</h2>
          <p>
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </article>
      </div>

      <p class="imprint-source">
        Quelle:
        <a href="https://www.e-recht24.de" target="_blank" rel="noopener noreferrer"
          >https://www.e-recht24.de</a
        >
      </p>
    </section>
  </main>
</template>

<style scoped>
.imprint-page {
  padding-top: 5rem;
  background: radial-gradient(circle at top, rgba(94, 96, 255, 0.15), transparent 55%);
}

.imprint-hero {
  max-width: 960px;
  margin: 0 auto;
  padding: 6rem 1.5rem 2rem;
  text-align: center;
}

.hero-eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--galaxy-text-muted);
  font-size: 0.875rem;
  margin-bottom: 0.75rem;
}

.hero-lede {
  max-width: 640px;
  margin: 1rem auto 0;
  color: var(--galaxy-text-secondary);
  line-height: 1.7;
}

.imprint-section {
  padding: 2rem 1.5rem 5rem;
  max-width: 1100px;
  margin: 0 auto;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.imprint-card {
  background: rgba(10, 12, 30, 0.65);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 1.25rem;
  padding: 2rem;
  backdrop-filter: blur(12px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.25);
}

.imprint-card h2 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: var(--galaxy-text-primary);
}

.imprint-card p,
.imprint-card address {
  color: var(--galaxy-text-secondary);
  line-height: 1.7;
  font-style: normal;
}

.imprint-card address strong {
  color: var(--galaxy-text-primary);
}

.badge-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.badge-group a {
  padding: 0.4rem 0.9rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: var(--galaxy-text-primary);
  font-size: 0.95rem;
  transition:
    border-color var(--transition-fast),
    color var(--transition-fast);
}

.badge-group a:hover {
  color: var(--galaxy-purple);
  border-color: var(--galaxy-purple);
}

.link-list {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.link-list a {
  color: var(--galaxy-text-secondary);
  transition: color var(--transition-fast);
}

.link-list a:hover {
  color: var(--galaxy-purple);
}

.cta-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  margin-top: 1rem;
  padding: 0.6rem 1.25rem;
  border-radius: 999px;
  background: var(--galaxy-purple);
  color: #fff;
  font-weight: 600;
  transition:
    transform var(--transition-fast),
    box-shadow var(--transition-fast);
}

.cta-link:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 20px rgba(94, 96, 255, 0.35);
}

.imprint-source {
  margin-top: 2.5rem;
  text-align: center;
  color: var(--galaxy-text-muted);
}

.imprint-source a {
  color: inherit;
  text-decoration: underline;
}

@media (max-width: 600px) {
  .imprint-card {
    padding: 1.5rem;
  }
}
</style>
