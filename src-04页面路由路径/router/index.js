import Vue from 'vue'
import VueRouter from 'vue-router'
import { staticRoutes } from './constantRoutes'
Vue.use(VueRouter)


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes:staticRoutes
})

export default router
