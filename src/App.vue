<template>
  <div>
    <AppBar/>
    <div class="container">
      <div class="mt-3">
        <NewGame
            @start-game="startGame($event)"/>
      </div>
    </div>
  </div>
</template>

<script>
import AppBar from './components/AppBar'
import NewGame from './components/NewGame'
import { mapState } from 'vuex'

export default {
  name: 'App',
  components: {
    NewGame,
    AppBar
  },
  computed: {
    ...mapState([
      'players',
      'rounds',
      'pointsToWin'
    ])
  },
  methods: {
    startGame () {
      console.log(this.players)
      console.log(this.rounds)
      console.log(this.pointsToWin)
    }
  }
}
</script>

<style lang="scss">
  @import "~bootstrap";

  h1 {
    font-weight: bold;
  }

  body {
    font-family: 'Raleway', Helvetica, sans-serif;
    margin: 0;
    background-color: #fafafa;
  }
</style>
