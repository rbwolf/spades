<template>
  <div class="game-over">
    <div class="content-wrapper">
      <h1>
        Game over!
      </h1>
      <h4>
        Congrats, {{ winner.name }}!
      </h4>
      <div class="action-buttons">
        <action-button
          block
          @click="startNewGame">
          New Game
        </action-button>
        <action-button
          variant="secondary"
          @click="closeModal"
          class="mt-1">
          Go back
        </action-button>
      </div>
    </div>
    <confetti
      class="h-100 w-100"
      :show-confetti="showConfetti"/>
  </div>
</template>

<script>
  import Confetti from './Confetti'
  import { mapGetters } from 'vuex'
  import ActionButton from '../common/ActionButton'
  import newGameMixin from '../../newGameMixin'

  export default {
    name: 'GameOver',
    components: {Confetti, ActionButton},
    mixins: [newGameMixin],
    data () {
      return {
        showConfetti: false
      }
    },
    computed: {
      ...mapGetters([
        'winner'
      ])
    },
    mounted () {
      setTimeout(() => {
        this.showConfetti = true
      }, 750)
    }
  }
</script>

<style lang="scss" scoped>
  .game-over {
    height: 40vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .content-wrapper {
    position: absolute;
    text-align: center;
  }

  .action-buttons {
    padding-top: 36px;
  }
</style>