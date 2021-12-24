<template>
  <div class="mt-4">
    <score-board
      :teams="teamArray"
      :scores="scores"
      :bags="bags"/>
    <new-round class="mt-4"/>
    <div class="d-flex flex-column-reverse">
      <round-summary
          class="mt-4"
          v-for="(round, i) in finishedRounds"
          :key="round.id"
          :roundId="round.id"
          :round-number="i + 1"
          :team-array="teamArray"/>
    </div>
  </div>
</template>

<script>
  import NewRound from './NewRound'
  import ScoreBoard from './ScoreBoard'
  import RoundSummary from './history/RoundSummary'
  import { mapActions, mapGetters, mapState } from 'vuex'

  export default {
    name: 'Play',
    components: {RoundSummary, ScoreBoard, NewRound},
    created () {
      this.startNewRound()
    },
    computed: {
      ...mapState([
        'teams',
        'rounds'
      ]),
      ...mapGetters([
        'getTeamScore',
        'getTeamBags'
      ]),
      finishedRounds () {
        return this.rounds.slice(0, this.rounds.length - 1)
      },
      teamArray () {
        return Object.values(this.teams)
      },
      scores () {
        return this.teamArray.map(team => this.getTeamScore(team.id))
      },
      bags () {
        return this.teamArray.map(team => this.getTeamBags(team.id))
      }
    },
    methods: {
      ...mapActions([
        'startNewRound'
      ])
    }
  }
</script>

<style lang="scss" scoped>
</style>