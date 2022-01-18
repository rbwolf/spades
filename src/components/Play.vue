<template>
  <div class="mt-4">
    <score-board
      :teams="teamArray"
      :scores="scores"
      :bags="bags"/>
    <new-round
      v-if="!winner"
      class="mt-4"/>
    <h1
      v-else
      class="px-3 mt-4 text-center">
      {{ winner.name }} wins!
    </h1>
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
    <scroll-to-top class="scroll-button"/>
  </div>
</template>

<script>
  import NewRound from './NewRound'
  import ScoreBoard from './ScoreBoard'
  import RoundSummary from './history/RoundSummary'
  import { mapGetters, mapMutations, mapState } from 'vuex'
  import ScrollToTop from './ScrollToTop'

  export default {
    name: 'Play',
    components: {ScrollToTop, RoundSummary, ScoreBoard, NewRound},
    computed: {
      ...mapState([
        'teams',
        'rounds',
        'loaded',
      ]),
      ...mapGetters([
        'getTeamScore',
        'getTeamBags',
        'winner'
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
    mounted () {
      this.checkWinner()
    },
    watch: {
      winner () {
        this.checkWinner()
      }
    },
    methods: {
      ...mapMutations([
        'openModal'
      ]),
      checkWinner () {
        if (this.winner) {
          this.openModal('game-over')
        }
      }
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

  .scroll-button {
    position: fixed;
    bottom: 36px;
    right: 36px;
  }
</style>