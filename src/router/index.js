import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Auth from '../views/Auth.vue'
import History from '../views/History.vue'
import Registration from '../views/Registration.vue'
import AuthTest from '../views/AuthTest.vue'
import NotFound from '../views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/history',
      name: 'history',
      component: History
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/auth',
      name: 'auth',
      component: Auth
    },
    {
      path: '/authTest',
      name: 'authTest',
      component: AuthTest
    },
    {
      path: '/registration',
      name: 'registration',
      component: Registration
    },
    {
      path: '/:pathMatch(.*)*', // Это обрабатывает все неизвестные пути
      name: 'NotFound',
      component: NotFound
    }
  ]
})

export default router
