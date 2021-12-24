import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import App from './App.vue'
import store from './store'
import router from './router'

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(VueRouter)

const appStore = new Vuex.Store(store)

new Vue({
  render: h => h(App),
  store: appStore,
  router,
}).$mount('#app')
