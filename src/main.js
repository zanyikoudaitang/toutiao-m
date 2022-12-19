import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'

import "amfe-flexible"

import "./styles/index.less"

// 全局过滤器
import './utils/dayjs'


Vue.use(Vant)


Vue.config.productionTip = false





new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
