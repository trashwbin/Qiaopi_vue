import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/user/userLogin.vue'
import Register from '@/views/user/register.vue'
import ForgetCode from '@/views/user/forgetCode.vue'
import Impact from '@/views/import/import.vue'
import Index from '@/views/index/index'
import Letter from '@/views/index/letter'
import Game from '@/views/index/game'
import Shop from '@/views/index/shop'
import Introduce from '@/views/index/introduce'
import Profile from '@/views/profile/index.vue'
import WriteLetter from '@/views/letter/WriteLetter.vue'
import ReceiveLetter from '@/views/letter/ReceiveLetter.vue'
import DriftingBottle from '@/views/letter/DriftingBottle.vue'
import GameKown from '@/views/game/know.vue'
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
        path: '/profile',
        name: 'Profile',
        component: Profile
      },
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
        path: '/shop',
        name: 'Shop',
        component: Shop
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
      },
      {
        path: 'know',
        name: 'GameKnow',
        component: GameKown
      }
    ]
  }
  ]
})

export default router
