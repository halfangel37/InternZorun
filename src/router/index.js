import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

// * Handle router
const isNotAllowed = (to, from, next) => {
  if (!store.getters['authen/isLoggedIn']) {
    next()
    return
  }
  next('/')
}

const isAllowed = (to, from, next) => {
  if (store.getters['authen/isLoggedIn']) {
    next()
    return
  }
  next('/account')
}

const routes = [
  {
    path: '/account',
    component: () => import('@/layouts/ZrAccount'),
    redirect: { name: 'login' },
    beforeEnter: isNotAllowed,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@/pages/account/ZrLogin'),
      },
      {
        path: 'authen',
        name: 'authen',
        component: () => import('@/pages/account/ZrLoginAuthen'),
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('@/pages/account/ZrRegister'),
      },
    ],
  },
  {
    path: '',
    component: () => import('@/layouts/ZrHome'),
    redirect: { name: 'home' },
    beforeEnter: isAllowed,
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/pages/home/ZrMain'),
      },
      {
        path: 'club',
        name: 'club',
        component: () => import('@/pages/home/ZrClub'),
      },
      {
        path: 'profile',
        name: 'profile',
        component: () => import('@/pages/home/ZrProfile'),
      },
    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
