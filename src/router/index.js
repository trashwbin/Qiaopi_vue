import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/login.vue'
import Register from '@/views/login/register.vue'
import ForgetCode from '@/views/login/forgetCode.vue'
import Impact from '@/views/import/import.vue'
import Index from '@/views/index/index'
import Letter from '@/views/index/letter'
import Game from '@/views/index/game'
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [{
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/forget',
    name: 'ForgetCode',
    component: ForgetCode
  },
  {
    path: '/',
    name: 'Impact',
    component: Impact
  },
  {
    path: '/index',
    name: 'Index',
    component: Index,
    children: [
      {
        path: '/letter',
        name: 'Letter',
        component: Letter
      },
      {
        path: '/game',
        name: 'Game',
        component: Game
      }
    ]
  }
  ]
})

export default router
