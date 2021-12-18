import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import App from './App.vue'
import store from './store'
import routes from './routes'

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: routes
})

const appStore = new Vuex.Store(store)

new Vue({
  render: h => h(App),
  store: appStore,
  router,
}).$mount('#app')
