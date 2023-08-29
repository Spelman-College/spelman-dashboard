import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import StoriesView from '@/views/StoriesView.vue'
import BiosView from '@/views/BiosView.vue'
import FAQView from '@/views/FAQView.vue'
import IndividualStoryView from '@/views/IndividualStoryView.vue'
import IndividualBioView from '@/views/IndividualBioView.vue'
import AboutView from '@/views/AboutView.vue'
import ResourcesView from '@/views/ResourcesView.vue'
import IndividualReadsView from '@/views/reads/IndividualReadsView.vue'
import ContactView from '@/views/ContactView.vue'
import DataDashboardDatasetView from '@/views/DataDashboardDatasetView.vue'
import DataDashboardView from '@/views/DataDashboardView.vue'
import DDWelcomeView from '@/views/dataDashboardViews/DDWelcomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    // Always scroll to top
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/stories',
      name: 'stories',
      component: StoriesView
    },
    {
      path: '/bios',
      name: 'bios',
      component: BiosView
    },
    {
      path: '/FAQ',
      name: 'FAQ',
      component: FAQView
    },
    {
      path: '/stories/:id',
      component: IndividualStoryView
    },
    {
      path: '/bios/:id',
      component: IndividualBioView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/resources',
      name: 'resources',
      component: ResourcesView
    },
    {
      path: '/resources/:id',
      component: IndividualReadsView
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView
    },
    {
      path: '/data/:view/:dataset',
      component: DataDashboardDatasetView,
      meta: { reload: true },
    },
    {
      path: '/data/:view',
      redirect: '/data-dashboard'
    },
    {
      path: '/data',
      name: 'data',
      redirect: '/data-dashboard'
    },
    {
      path: '/data-dashboard',
      component: DataDashboardView,
      children: [
        {
          path: '',
          name: 'dataDashboard',
          component: DDWelcomeView
        }
      ]
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   // component: () => import('')
    // }
  ]
})

export default router
