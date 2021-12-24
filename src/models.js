const uuid = require('short-uuid')

class Model {
  constructor ()  {
    this.id = uuid.generate()
  }
}

class Team extends Model {
  constructor (name) {
    super()
    this.name = name
  }
}

class Player extends Model {
  constructor (name, teamId) {
    super()
    this.name = name
    this.teamId = teamId
  }
}

class Round extends Model {
  constructor () {
    super()
  }
}

class PlayerRound extends Model {
  constructor (playerId, roundId, bid, tricks, blind) {
    super()
    this.playerId = playerId
    this.roundId = roundId
    this.bid = bid
    this.tricks = tricks
    this.blind = blind
  }
}

export { Model, Team, Player, Round, PlayerRound }
