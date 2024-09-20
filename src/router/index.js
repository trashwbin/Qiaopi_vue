import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/login.vue'
import Register from '@/views/login/register.vue'
import ForgetCode from '@/views/login/forgetCode.vue'
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [{
    path: '/',
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
  }
  ]
})

export default router
