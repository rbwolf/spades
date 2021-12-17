<template>
  <div>
    <AppBar/>
    <div class="container">
      <div class="mt-3">
        <NewGame
            v-if="showNewGame"
            @start-game="startGame($event)"/>
        <Main v-else/>
      </div>
    </div>
  </div>
</template>

<script>
import AppBar from './components/AppBar'
import NewGame from './components/NewGame'
import { mapState } from 'vuex'
import Main from './components/Main'

export default {
  name: 'App',
  components: {
    NewGame,
    Main,
    AppBar
  },
  data () {
    return {
      showNewGame: true,
    }
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
      this.showNewGame = false
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
