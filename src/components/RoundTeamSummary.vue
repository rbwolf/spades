<template>
  <div>
    <div class="row">
      <h2 class="text-center fw-bold">
        <ICountUp :endVal="teamScore"/>
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
  import ICountUp from 'vue-countup-v2';
  import { mapGetters, mapState } from 'vuex'
  import RoundPlayerSummary from './RoundPlayerSummary'

  export default {
    name: 'RoundTeamSummary',
    components: {RoundPlayerSummary, ICountUp},
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
        'getPlayerRoundScore'
      ]),
      playerRounds () {
        const playerIds = this.getTeamPlayerIds(this.teamId)
        return this.getPlayerRoundsByRoundId(this.roundId).filter(pr => playerIds.includes(pr.playerId))
      },
      teamScore () {
        return this.playerRounds.reduce((score, pr) => score + this.getPlayerRoundScore(pr.id), 0)
      }
    },
    methods: {
      getPlayer (playerId) {
        return this.players[playerId]
      }
    }
  }
</script>

<style scoped>

</style>