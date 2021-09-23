import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/scss/reset.scss'
import './components/register'
import LuckDraw from 'vue-luck-draw'
Vue.use(LuckDraw)
// import VConsole from 'vconsole'
// new VConsole()
Vue.config.productionTip = false

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
