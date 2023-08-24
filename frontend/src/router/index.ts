import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import StoriesView from '@/views/StoriesView.vue'
import FAQView from '@/views/FAQView.vue'
import IndividualStoryView from '@/views/IndividualStoryView.vue'
import AboutView from '@/views/AboutView.vue'
import ResourcesView from '@/views/ResourcesView.vue'
import ContactView from '@/views/ContactView.vue'
import DataDashboardExploreView from '@/views/DataDashboardExploreView.vue'
import DataDashboardView from '@/views/DataDashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
      path: '/FAQ',
      name: 'FAQ',
      component: FAQView
    },
    {
      path: '/stories/:id',
      component: IndividualStoryView
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
      path: '/contact',
      name: 'contact',
      component: ContactView
    },
    {
      path: '/data-dashboard',
      name: 'dataDashboard',
      component: DataDashboardExploreView
    },
    {
      path: '/data/:view/:dataset',
      component: DataDashboardView,
      meta: { reload: true},
    },
    {
      path: '/data/:view',
      redirect: '/data-dashboard'
    },
    {
      path: '/data',
      redirect: '/data-dashboard'
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
