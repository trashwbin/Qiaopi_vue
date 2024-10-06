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
import WriteLetter from '@/views/letter/WriteLetter.vue'
import ReceiveLetter from '@/views/letter/ReceiveLetter.vue'
import DriftingBottle from '@/views/letter/DriftingBottle.vue'
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
    path: '/impact',
    name: 'Impact',
    component: Impact
  },
  {
    path: '/',
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
      },
      {
        path: '/write',
        name: 'WriteLetter',
        component: WriteLetter
      },
      {
        path: '/receive',
        name: 'ReceiveLetter',
        component: ReceiveLetter
      },
      {
        path: 'drifting',
        name: 'DriftingBottle',
        component: DriftingBottle
      }
    ]
  }
  ]
})

export default router
