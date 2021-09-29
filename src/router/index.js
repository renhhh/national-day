import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/login.vue'),
  },
  {
    path: '/form',
    name: 'Form',
    component: () => import('../views/form.vue'),
  },
  {
    path: '/card',
    name: 'Card',
    component: () => import('../views/card.vue'),
  },
  {
    path: '/poster',
    name: 'Poster',
    component: () => import('../views/poster.vue'),
  },
  {
    path: '/leader-board',
    name: 'LeaderBoard',
    component: () => import('../views/leader-board.vue'),
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/redeem',
    name: 'Redeem',
    component: () => import('../views/redeem.vue'),
  },
  {
    path: '/phone',
    name: 'Phone',
    component: () => import('../views/ContactInfo.vue'),
  },
]

const router = new VueRouter({
  routes,
})

export default router
