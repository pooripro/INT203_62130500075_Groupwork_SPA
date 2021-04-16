import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import WhoRU from '../views/WhoRU.vue'
import About from '../views/About.vue'

const routes = [
  {
    path: '/',
    name: 'WhoRU',
    component: WhoRU
  },
  {
    path: '/Home/:name/:id',
    name: 'Home',
    component: Home

  },
  {
    path: '/About/:name/:id',
    name: 'About',
    component: About
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
