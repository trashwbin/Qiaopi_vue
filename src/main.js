import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { createPinia } from 'pinia'
import Avue from '@smallwei/avue'
import '@smallwei/avue/lib/index.css'
Vue.config.productionTip = false
const pinia = createPinia()

Vue.use(ElementUI)
Vue.use(Avue)
Vue.use(pinia)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
