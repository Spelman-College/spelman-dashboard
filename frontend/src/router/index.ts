import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import StoriesView from '@/views/StoriesView.vue'
import FAQView from '@/views/FAQView.vue'
import IndividualStoryView from '@/views/IndividualStoryView.vue'
import AboutView from '@/views/AboutView.vue'
import ResourcesView from '@/views/ResourcesView.vue'
import ContactView from '@/views/ContactView.vue'
import DataDashboard from '@/views/DataDashboard.vue'
import DataDashboardMainView from '@/views/DataDashboardMainView.vue'
import DDWelcomeView from '@/views/dataDashboardViews/DDWelcomeView.vue'

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
      path: '/data',
      name: 'data',
      component: DataDashboard
    },
    {
      path: '/data/:dataset',
      component: DataDashboard
    },
    {
      path: '/data-dashboard',
      name: 'data-dashboard',
      component: DataDashboardMainView,
      children: [
        {
          path: '',
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
