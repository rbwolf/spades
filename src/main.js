import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import App from './App.vue'
import store from './store'
import router from './router'
import './registerServiceWorker'
import VueGtag from "vue-gtag";

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(VueRouter)

Vue.use(VueGtag, {
  config: { id: 'UA-210378975-2' }
});

const appStore = new Vuex.Store(store)

new Vue({
  render: h => h(App),
  store: appStore,
  router,
}).$mount('#app')
