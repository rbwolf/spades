import { PlayerRound, Round } from './models'
import Vue from 'vue'

export default {
  state: {
    rounds: [],
    teams: {
      // Team
      0: {id: 0, name: 'Team 1'},
      1: {id: 1, name: 'Team 2'}
    },
    players: {
      // Player
      0: {id: 0, teamId: 0, name: 'Ryan'},
      1: {id: 1, teamId: 0, name: 'Sophie'},
      2: {id: 2, teamId: 1, name: 'Shannon'},
      3: {id: 3, teamId: 1, name: 'Kyle'}
    },
    playerRounds: {},
    pointsToWin: 500,
    matchedBidScore: 10,
    surplusBidScore: 1,
    bagLimit: 10,
    bustPenalty: 100,
    blindBonus: 100,
    nilBonus: 100,
    blindNilBonus: 200
  },
  mutations: {
    addTeam (state, team) {
      state.teams = [...state.teams, team]
    },
    addPlayer (state, player) {
      state.players = [...state.players, player]
    },
    setPointsToWin (state, score) {
      state.pointsToWin = parseInt(score)
    },
    updatePlayerRound (state, data) {
      state.playerRounds[data.id] = { ...state.playerRounds[data.id], ...data}
    }
  },
  actions: {
    addNewRound ({ state }) {
      const newRound = new Round()
      state.rounds = [...state.rounds, newRound]
      const playerRounds = Object.values(state.players).map(player => new PlayerRound(player.id, newRound.id))
      playerRounds.forEach(playerRound => Vue.set(state.playerRounds, playerRound.id, playerRound))
    },
    submitRound ({ state, getters, commit }, { bids, tricks, blind }) {
      Object.values(state.players).forEach(player => {
        const playerRound = getters.getCurrentPlayerRound(player.id)
        commit('updatePlayerRound', {
          id: playerRound.id,
          bid: bids[player.id],
          tricks: tricks[player.id],
          blind: blind[player.id]
        })
      })
    }
  },
  getters: {
    getCurrentRound: (state) => {
      return state.rounds[state.rounds.length - 1]
    },
    getCurrentPlayerRound: (state, getters) => playerId => {
      return Object.values(state.playerRounds).find(playerRound =>
        playerRound.playerId === playerId &&
        playerRound.roundId === getters.getCurrentRound.id)
    },
    getPlayerScore: (state, getters) => playerId => {
      return getters.getPlayerRounds(playerId).reduce((score, playerRound) => {
        const {bid, tricks} = playerRound
        if (tricks < bid) {
          return score - (bid * state.matchedBidScore)
        } else if (tricks > bid) {
          return score + (bid * state.matchedBidScore) + (tricks - bid) * state.surplusBidScore
        } else {
          return score + (tricks * state.matchedBidScore)
        }
      }, 0)
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
      const playerIds = getters.getTeamPlayerIds(teamId)
      const totalScore = playerIds.map(getters.getPlayerScore).reduce((sum, curr) => sum + curr)
      const bags = getters.getTotalTeamBags(teamId)
      const bagPenalties = Math.floor(bags / state.bagLimit)
      return totalScore - (bagPenalties * state.bustPenalty)
    },
    getTotalTeamBags: (state, getters) => teamId => {
      const playerIds = getters.getTeamPlayerIds(teamId)
      return playerIds.map(getters.getPlayerBags).reduce((sum, curr) => sum + curr)
    },
    getTeamBags: (state, getters) => teamId => {
      return getters.getTotalTeamBags(teamId) % state.bagLimit
    }
  }
}