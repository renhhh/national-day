import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Form',
    component: () => import('../views/form.vue'),
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
