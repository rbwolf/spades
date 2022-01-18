<template>
  <div>
    <div class="row">
      <h2 class="text-center fw-bold team-score">
        {{ teamScore }}
      </h2>
    </div>
    <div class="row mt-2">
      <round-player-summary
        v-for="playerRound in playerRounds"
        :key="playerRound.id"
        :player-name="getPlayer(playerRound.playerId).name"
        :player-round="playerRound"/>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapState } from 'vuex'
  import RoundPlayerSummary from './RoundPlayerSummary'

  export default {
    name: 'RoundTeamSummary',
    components: {RoundPlayerSummary},
    props: {
      teamId: {
        type: String,
        required: true
      },
      roundId: {
        type: String,
        required: true
      }
    },
    computed: {
      ...mapState([
        'players'
      ]),
      ...mapGetters([
        'getTeamPlayerIds',
        'getPlayerRoundsByRoundId',
        'getTeamRoundScore'
      ]),
      playerRounds () {
        const playerIds = this.getTeamPlayerIds(this.teamId)
        return this.getPlayerRoundsByRoundId(this.roundId).filter(pr => playerIds.includes(pr.playerId))
      },
      teamScore () {
        return this.getTeamRoundScore(this.teamId, this.roundId)
      }
    },
    methods: {
      getPlayer (playerId) {
        return this.players[playerId]
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../global';

  .team-score {
    font-family: $headerFont;
  }

</style>