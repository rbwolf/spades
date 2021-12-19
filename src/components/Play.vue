<template>
  <div class="container mt-4">
    <score-board
      :teams="teams"
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
  import { mapGetters, mapMutations, mapState } from 'vuex'

  export default {
    name: 'Game',
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
      scores () {
        return this.teams.map(team => this.getTeamScore(team.id))
      },
      bags () {
        return this.teams.map(team => this.getTeamBags(team.id))
      }
    },
    methods: {
      ...mapMutations([
        'addNewRound'
      ])
    }
  }
</script>

<style scoped>

</style>