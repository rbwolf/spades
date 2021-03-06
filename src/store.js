import { PlayerRound, Round } from './models'
import Vue from 'vue'

const STORAGE_KEY = 'spades'

export default {
  state: {
    modal: null,
    loaded: false,
    rounds: [],
    teams: {
      // Team
      // '0': {id: '0', name: 'Team 1'},
      // '1': {id: '1', name: 'Team 2'}
    },
    players: {
      // Player
      // '0': {id: '0', teamId: '0', name: 'Ryan'},
      // '1': {id: '1', teamId: '0', name: 'Sophie'},
      // '2': {id: '2', teamId: '1', name: 'Shannon'},
      // '3': {id: '3', teamId: '1', name: 'Kyle'}
    },
    playerRounds: {},
    settings: {
      pointsToWin: 300,
      matchedBidScore: 10,
      surplusBidScore: 1,
      bagLimit: 10,
      bustPenalty: 100,
      blindBonus: 100,
      nilBonus: 100
    }
  },
  mutations: {
    addTeam (state, team) {
      state.teams = {...state.teams, [team.id]: team}
    },
    addPlayer (state, player) {
      state.players = {...state.players, [player.id]: player}
    },
    updatePlayerRound (state, data) {
      Vue.set(state.playerRounds, data.id, { ...state.playerRounds[data.id], ...data })
    },
    clearAllData (state) {
      state.rounds = []
      state.playersRounds = {}
      state.players = {}
      state.teams = {}
    },
    setState (state, newState) {
      Object.entries(state).forEach(([k,]) => {
        Vue.set(state, k, newState[k])
      })
    },
    setLoaded (state, val) {
      state.loaded = val
    },
    openModal (state, modalName) {
      state.modal = modalName
    },
    closeModal (state) {
      state.modal = null
    },
    updateSettings (state, settings) {
      state.settings = { ...state.settings, ...settings }
    }
  },
  actions: {
    async submitRound ({ state, getters, commit, dispatch }, { bids, tricks, blind }) {
      // Create new round
      const newRound = new Round()
      state.rounds = [...state.rounds, newRound]

      // Create player rounds and attach to new round
      Object.values(state.players).forEach(player => {
        const playerRound = new PlayerRound(player.id, newRound.id, bids[player.id], tricks[player.id], blind[player.id])
        commit('updatePlayerRound', playerRound)
      })

      // Determine if this round has led to a win
      if (getters.winner) {
        state.winnerTeamId = getters.winner.id
      }

      dispatch('saveState')
    },
    async restart ({ commit, dispatch }) {
      commit('clearAllData')
      await dispatch('clearState')
    },
    loadState ({ commit }) {
      const storedState = window.localStorage.getItem(STORAGE_KEY)
      if (storedState) {
        commit('setState', JSON.parse(storedState))
        commit('setLoaded', true)
      }
    },
    saveState ({ state }) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    },
    clearState () {
      window.localStorage.removeItem(STORAGE_KEY)
    }
  },
  getters: {
    getPlayerRoundsByRoundId: (state) => roundId => {
      return Object.values(state.playerRounds).filter(playerRound => playerRound.roundId === roundId)
    },
    currentRound: (state) => {
      return state.rounds[state.rounds.length - 1]
    },
    getCurrentPlayerRound: (state, getters) => playerId => {
      return Object.values(state.playerRounds).find(playerRound =>
        playerRound.playerId === playerId &&
        playerRound.roundId === getters.currentRound.id)
    },
    getTeamRoundScore: (state, getters) => (teamId, roundId) => {
      const { matchedBidScore, surplusBidScore, blindBonus, nilBonus } = state.settings

      const playerIds = getters.getTeamPlayerIds(teamId)
      const playerRounds = Object.values(state.playerRounds).filter(pr => pr.roundId === roundId && playerIds.includes(pr.playerId))
      const totalBid = playerRounds.reduce((curr, pr) => curr + pr.bid, 0)
      const totalTricks = playerRounds.reduce((curr, pr) => curr + pr.tricks, 0)

      // Standard player-round score
      let score = 0
      if (totalTricks < totalBid) {
        score -= totalBid * matchedBidScore
      } else if (totalTricks > totalBid) {
        score += (totalBid * matchedBidScore) + (totalTricks - totalBid) * surplusBidScore
      } else {
        score += (totalTricks * matchedBidScore)
      }

      // Calculate per-player blind/nil bonuses
      score += playerRounds.reduce((curr, pr) => {
        if (pr.blind) {
          curr += (pr.tricks === pr.bid ? blindBonus : -blindBonus)
        }
        if (pr.bid === 0) {
          curr += (pr.tricks === pr.bid ? nilBonus : -nilBonus)
        }
        return curr
      }, 0)

      return score
    },
    getPlayerRounds: state => playerId => {
      return Object.values(state.playerRounds).filter(playerRound => playerRound.playerId === playerId)
    },
    getPlayerBags: (state, getters) => playerId => {
      return getters.getPlayerRounds(playerId).reduce((bags, playerRound) => {
        const { bid, tricks } = playerRound
        if (tricks > bid) {
          return bags + (tricks - bid)
        }
        return bags
      }, 0)
    },
    getTeamPlayerIds: (state) => teamId => {
      return Object.values(state.players)
        .filter(player => player.teamId === teamId)
        .map(player => player.id)
    },
    getTeamScore: (state, getters) => teamId => {
      const totalScore = state.rounds.reduce((score, round) => score + getters.getTeamRoundScore(teamId, round.id), 0)
      const bags = getters.getTotalTeamBags(teamId)
      const bagPenalties = Math.floor(bags / state.settings.bagLimit)
      return totalScore - (bagPenalties * state.settings.bustPenalty)
    },
    getTotalTeamBags: (state, getters) => teamId => {
      const playerIds = getters.getTeamPlayerIds(teamId)
      return playerIds.map(getters.getPlayerBags).reduce((sum, curr) => sum + curr)
    },
    getTeamBags: (state, getters) => teamId => {
      return getters.getTotalTeamBags(teamId) % state.settings.bagLimit
    },
    winner: (state, getters) => {
      const teams = Object.values(state.teams).map(team => ({ ...team, score: getters.getTeamScore(team.id) }))
      const winners = teams.filter(t => t.score >= state.settings.pointsToWin)

      // Only one has achieved necessary points
      if (winners.length === 0) {
        return null
      } else if (winners.length === 1) {
        return winners[0]
      } else {
        // If it's a tie, there is no winner
        if (winners[0].score === winners[1].score) {
          return null
        // Otherwise the winner is the one with more points
        } else {
          return winners.reduce((winner, team) => team.score > winner.score ? team : winner, { score: 0 })
        }
      }
    }
  }
}