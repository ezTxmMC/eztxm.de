import { createRouter, createWebHistory } from 'vue-router'
import { defineComponent } from 'vue'
import HomeView from '../views/HomeView.vue'

const ExternalRedirectView = defineComponent({
  name: 'ExternalRedirectView',
  setup: () => () => null,
})

function externalRedirect(url: string) {
  return () => {
    window.location.assign(url)
    return false
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('../views/ProjectsView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/imprint',
      name: 'imprint',
      component: () => import('../views/ImprintView.vue'),
    },
    {
      path: '/org/:org',
      name: 'organization',
      component: () => import('../views/OrganizationView.vue'),
    },
    {
      path: '/dc',
      name: 'redirect-discord',
      component: ExternalRedirectView,
      beforeEnter: externalRedirect('https://discord.gg/KWXhgWjbjF'),
    },
    {
      path: '/yt',
      name: 'redirect-youtube',
      component: ExternalRedirectView,
      beforeEnter: externalRedirect('https://youtube.com/@eztxmmc'),
    },
    {
      path: '/ttv',
      name: 'redirect-twitch',
      component: ExternalRedirectView,
      beforeEnter: externalRedirect('https://twitch.tv/eztxmmc'),
    },
    {
      path: '/x',
      name: 'redirect-x',
      component: ExternalRedirectView,
      beforeEnter: externalRedirect('https://twitter.com/eztxmmc'),
    },
    {
      path: '/bsky',
      name: 'redirect-bsky',
      component: ExternalRedirectView,
      beforeEnter: externalRedirect('https://bsky.app/profile/eztxm.de'),
    },
    {
      path: '/lp',
      name: 'redirect-luckprefix-short',
      component: ExternalRedirectView,
      beforeEnter: externalRedirect('https://luckprefix.com'),
    },
    {
      path: '/luckprefix',
      name: 'redirect-luckprefix',
      component: ExternalRedirectView,
      beforeEnter: externalRedirect('https://luckprefix.com'),
    },
  ],
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  },
})

export default router
