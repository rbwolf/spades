import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'

Vue.config.productionTip = false
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    pointsToWin: 500,
    players: [],
    rounds: [],
  },
  mutations: {
    setPlayers (state, players) {
      state.players = players
    },
    setPointsToWin (state, score) {
      state.pointsToWin = parseInt(score)
    }
  },
  actions: {

  },
  getters: {

  }
})

new Vue({
  render: h => h(App),
  store: store,
}).$mount('#app')
