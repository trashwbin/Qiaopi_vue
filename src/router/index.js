import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/user/userLogin.vue'
import Register from '@/views/user/register.vue'
import ForgetCode from '@/views/user/forgetCode.vue'
import Impact from '@/views/import/import.vue'
import Index from '@/views/index/index'
import Letter from '@/views/index/letter'
import Game from '@/views/index/game'
import Introduce from '@/views/index/introduce'
import Profile from '@/views/profile/index.vue'
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
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/',
    name: 'Impact',
    component: Impact
  },
  {
    path: '/index',
    redirect: '/introduce',
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
      },
      {
        path: '/introduce',
        name: 'Introduce',
        component: Introduce
      }
    ]
  }
  ]
})

export default router
