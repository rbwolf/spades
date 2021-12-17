<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1>Who's playing?</h1>
      </div>
    </div>
    <div class="row">
      <div class="col col-6">
        <h2>Team 1</h2>
        <text-input
            class="mb-2"
            v-model="playerNames[0]"/>
        <text-input
            class="mb-2"
            v-model="playerNames[1]"/>
      </div>
      <div class="col col-6">
        <h2>Team 2</h2>
        <text-input
            class="mb-2"
            v-model="playerNames[2]"/>
        <text-input
            class="mb-2"
            v-model="playerNames[3]"/>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <h1>What are we playing to?</h1>
        <text-input
            type="number"
            v-model="score"/>
      </div>
    </div>
    <div class="row">
      <Button
          class="mt-4"
          @click="initGame">
        Let's play!
      </Button>
    </div>
  </div>
</template>

<script>
  import TextInput from './TextInput'
  import Button from './Button'
  import { mapMutations } from 'vuex'
  export default {
    name: 'NewGame',
    components: { Button, TextInput},
    data () {
      return {
        playerNames: [],
        score: '500'
      }
    },
    methods: {
      ...mapMutations([
        'setPlayers',
        'setPointsToWin',
      ]),
      initGame () {
        this.setPlayers([this.player1, this.player2, this.player3, this.player4])
        this.setPointsToWin(this.score)
        this.$emit('start-game')
      }
    }
  }
</script>

<style scoped>
</style>