<template>
  <div class="mt-4">
    <score-board
      :teams="teamArray"
      :scores="scores"
      :bags="bags"/>
    <new-round
      v-for="round in rounds"
      class="mt-4"
      :key="round.id"/>
  </div>
</template>

<script>
  import NewRound from './NewRound'
  import ScoreBoard from './ScoreBoard'
  import { mapActions, mapGetters, mapState } from 'vuex'

  export default {
    name: 'Play',
    components: {ScoreBoard, NewRound},
    created () {
      this.addNewRound()
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
        'addNewRound'
      ])
    }
  }
</script>

<style scoped>

</style>