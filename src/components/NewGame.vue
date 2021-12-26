<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1>Who's playing?</h1>
      </div>
    </div>
    <div class="row">
      <div
        v-for="(team, i) in teams"
        :key="i"
        class="col col-6">
        <h2>Team {{ names[i] }}</h2>
        <text-input
          v-for="(_, j) in team"
          :key="j"
          class="mb-2"
          v-model="teams[i][j]"/>
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
      <action-button
          class="mt-4"
          @click="initGame">
        Let's play!
      </action-button>
    </div>
  </div>
</template>

<script>
  import TextInput from './common/TextInput'
  import ActionButton from './common/ActionButton'
  import { Player, Team } from '../models'
  import { mapActions, mapMutations } from 'vuex'

  export default {
    name: 'NewGame',
    components: { ActionButton, TextInput },
    data () {
      return {
        teams: [['', ''], ['', '']],
        names: [],
        score: 300
      }
    },
    mounted () {
      // TODO: Put something fun here
      this.names = ['1', '2']
    },
    methods: {
      ...mapMutations([
        'addPlayer',
        'addTeam',
        'setPointsToWin'
      ]),
      ...mapActions([
        'saveState'
      ]),
      async initGame () {
        for (const i in this.teams) {
          const team = new Team('Team ' + this.names[i])
          this.addTeam(team)
          let playerIndex = 1
          for (const name of this.teams[i]) {
            const player = new Player(name || `Player ${playerIndex}`, team.id)
            this.addPlayer(player)
            playerIndex++
          }
        }
        this.setPointsToWin(this.score)
        await this.saveState()
        this.$router.push('play')
      }
    }
  }
</script>

<style scoped>
</style>