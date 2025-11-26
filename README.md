# ezTxm Portfolio

A modern portfolio website with "White Galaxy" design featuring GitHub repository integration and automatic deployment to GitHub Pages.

![Vue.js](https://img.shields.io/badge/Vue.js-3.x-4FC08D?style=flat-square&logo=vue.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?style=flat-square&logo=vite)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)

## Features

- **White Galaxy Design**: Clean, modern design with subtle galaxy-themed effects and glassmorphism
- **GitHub Integration**: Automatically fetches and displays public repositories from GitHub
- **Responsive Layout**: Mobile-first design that works on all devices
- **Animated Background**: Subtle star animations and floating nebula effects
- **Repository Filters**: Sort and filter projects by language, stars, or name
- **LocalStorage Caching**: Caches GitHub API responses to avoid rate limits
- **Smooth Animations**: CSS animations for page transitions and interactions
- **GitHub Pages Ready**: Automatic deployment workflow included

## Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Next generation frontend build tool
- **Pinia** - State management for Vue
- **Vue Router** - Official router for Vue.js
- **GitHub REST API** - Repository data integration

## Project Structure

```
src/
├── components/
│   ├── HeroSection.vue      # Landing section with introduction
│   ├── GalaxyBackground.vue # Animated star background
│   ├── RepositoryCard.vue   # Individual repository display
│   ├── RepositoryGrid.vue   # Grid layout with filters
│   ├── AboutSection.vue     # About me section
│   └── NavigationBar.vue    # Responsive navigation
├── composables/
│   └── useGitHub.ts         # GitHub API composable
├── stores/
│   └── repositories.ts      # Pinia store for repos
├── views/
│   ├── HomeView.vue         # Home page
│   ├── ProjectsView.vue     # All projects page
│   └── AboutView.vue        # About page
├── types/
│   └── github.ts            # TypeScript interfaces
└── assets/
    └── styles/
        └── galaxy-theme.css # Theme CSS variables
```

## Setup

### Prerequisites

- Node.js 22 or higher
- pnpm (recommended) or npm

### Installation

```sh
# Clone the repository
git clone https://github.com/ezTxmMC/eztxm.de.git

# Navigate to the project
cd eztxm.de

# Install dependencies
pnpm install
```

### Development

```sh
# Start development server with hot-reload
pnpm dev
```

### Production Build

```sh
# Type-check and build for production
pnpm build
```

### Linting

```sh
# Run ESLint and Oxlint
pnpm lint

# Format code with Prettier
pnpm format
```

## GitHub Pages Deployment

This project includes an automated GitHub Actions workflow for deployment.

### Automatic Deployment

The site automatically deploys to GitHub Pages when you push to the `main` branch:

1. The workflow runs on every push to `main`
2. Builds the project with `pnpm build`
3. Deploys to GitHub Pages

### Manual Setup

To enable GitHub Pages for your fork:

1. Go to your repository Settings
2. Navigate to **Pages** in the sidebar
3. Under **Build and deployment**, select **GitHub Actions** as the source
4. The workflow will deploy on the next push to `main`

The site will be available at: `https://<username>.github.io/eztxm.de/`

## Customization

### Change GitHub Username

Edit `src/composables/useGitHub.ts`:

```typescript
const GITHUB_USERNAME = 'your-username'
```

### Update Skills & Info

Edit `src/components/AboutSection.vue` to update:
- Skills list
- Social links
- Bio information

### Theme Colors

Edit `src/assets/styles/galaxy-theme.css` to customize:
- Galaxy accent colors
- Glassmorphism effects
- Text and background colors

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (disable Vetur if installed)

## License

MIT
