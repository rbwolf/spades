export default {
  state: {
    teams: [
      { id: 0, name: 'Team 1', bags: 0 },
      { id: 1, name: 'Team 2', bags: 0 }
    ],
    players: [
      { id: 0, teamId: 0, name: 'Ryan' },
      { id: 1, teamId: 0, name: 'Sophie' },
      { id: 2, teamId: 1, name: 'Shannon' },
      { id: 3, teamId: 1, name: 'Kyle' }
    ],
    rounds: [
      {
        bids: [
          {playerId: 0, bid: 4, blind: false},
          {playerId: 1, bid: 2, blind: false},
          {playerId: 2, bid: 1, blind: false},
          {playerId: 3, bid: 0, blind: true},
        ],
        tricks: [
          {playerId: 0, tricks: 3},
          {playerId: 1, tricks: 4},
          {playerId: 2, tricks: 1},
          {playerId: 3, tricks: 0},
        ]
      }
    ],
    pointsToWin: 500,
    matchedBidScore: 10,
    surplusBidScore: 1,
    bagLimit: 10,
    bagPenalty: 100,
    blindBonus: 100,
    nilBonus: 100,
    blindNilBonus: 200
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
    getPlayerScore: state => playerId => {
      return state.rounds.reduce((acc, round) => {
        const bid = round.bids.find(bid => bid.playerId === playerId).bid
        const tricks = round.tricks.find(trick => trick.playerId === playerId).tricks

        if (bid < tricks) {
          return acc - (tricks * state.matchedBidScore)
        } else if (bid > tricks) {
          return acc + (bid * state.matchedBidScore) + (tricks - bid) * state.surplusBidScore
        } else {
          return acc + (tricks * state.matchedBidScore)
        }
      }, 0)
    },
    getTeamScore: (state, getters) => teamId => {
      const playerIds = Object.values(state.players)
        .filter(player => player.teamId === teamId)
        .map(player => player.id)
      return playerIds.map(id => getters.getPlayerScore(id)).reduce((sum, curr) => sum + curr)
    }
  }
}