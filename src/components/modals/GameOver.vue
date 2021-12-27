<template>
  <div class="game-over">
    <div class="content-wrapper">
      <h1>
        Team 1 wins!
      </h1>
      <p>Get fucked, losers</p>
    </div>
    <confetti
      class="h-100 w-100"
      :show-confetti="showConfetti"/>
  </div>
</template>

<script>
  import Confetti from './Confetti'
  export default {
    name: 'GameOver',
    components: {Confetti},
    data () {
      return {
        showConfetti: false
      }
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
    height: 50vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .content-wrapper {
    position: absolute;
    text-align: center;
  }
</style>