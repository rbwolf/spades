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
        <h2>Team {{ i }}</h2>
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
  import { mapMutations } from 'vuex'

  export default {
    name: 'NewGame',
    components: { ActionButton, TextInput },
    data () {
      return {
        teams: [['', ''], ['', '']],
        score: '500'
      }
    },
    methods: {
      ...mapMutations([
        'addPlayer',
        'addTeam',
        'setPointsToWin'
      ]),
      initGame () {
        for (const i in this.teams) {
          const team = new Team('Team ' + (i + 1))
          this.addTeam(team)
          for (const name of this.teams[i]) {
            const player = new Player(name, team.id)
            this.addPlayer(player)
          }
        }
        this.setPointsToWin(this.score)
        this.$router.push('play')
      }
    }
  }
</script>

<style scoped>
</style>