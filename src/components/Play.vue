<template>
  <div class="mt-4">
    <score-board
      :teams="teamArray"
      :scores="scores"
      :bags="bags"/>
    <new-round class="mt-4"/>
    <transition-group
      name="history"
      class="d-flex flex-column-reverse">
      <round-summary
          class="mt-4 history-item"
          v-for="(round, i) in rounds"
          :key="round.id"
          :roundId="round.id"
          :round-number="i + 1"
          :team-array="teamArray"/>
    </transition-group>
  </div>
</template>

<script>
  import NewRound from './NewRound'
  import ScoreBoard from './ScoreBoard'
  import RoundSummary from './history/RoundSummary'
  import { mapGetters, mapMutations, mapState } from 'vuex'

  export default {
    name: 'Play',
    components: {RoundSummary, ScoreBoard, NewRound},
    mounted() {
      this.openModal('game-over')
    },
    computed: {
      ...mapState([
        'teams',
        'rounds',
        'loaded'
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
    watch: {
      scores (scores) {
        console.log(scores)
      }
    },
    methods: {
      ...mapMutations([
        'openModal'
      ])
    }
  }
</script>

<style lang="scss" scoped>
  .history-item {
    display: inline-block;
  }

  .history-enter-active, .history-leave-active {
    transition: all 750ms;
    transition-property: opacity, transform;
    transition-delay: 500ms, 300ms;
  }

  .history-enter, .history-leave-to {
    opacity: 0;
    transform: translateY(-100px);
  }

  .history-move {
    transition: transform 1s;
  }
</style>