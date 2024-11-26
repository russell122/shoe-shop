import { createRouter, createWebHistory } from 'vue-router'

import MainLayout from '../layouts/MainLayout.vue'
import SimpleLayout from '../layouts/SimpleLayout.vue'

import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Auth from '../views/Auth.vue'
import History from '../views/History.vue'
import Registration from '../views/Registration.vue'
import AuthTest from '../testСomponents/views/AuthTest.vue'
import NotFound from '../views/NotFound.vue'
import DataRetrievalError from '../views/DataRetrievalError.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', name: 'home', component: Home },
      { path: 'history', name: 'history', component: History },
      { path: 'about', name: 'about', component: About },
      { path: 'auth', name: 'auth', component: Auth },
      { path: 'authTest', name: 'authTest', component: AuthTest },
      { path: 'registration', name: 'registration', component: Registration },
    ],
  },
  {
    path: '/dataRetrievalError',
    component: SimpleLayout,
    children: [
      { path: '', name: 'dataRetrievalError', component: DataRetrievalError }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    component: SimpleLayout,
    children: [
      { path: '', name: 'NotFound', component: NotFound }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
