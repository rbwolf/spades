<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h2>Who's playing?</h2>
      </div>
    </div>
    <div class="row mt-2">
      <div
        v-for="(team, i) in teams"
        :key="i"
        class="col col-6">
        <h3>Team {{ names[i] }}</h3>
        <text-input
          v-for="(_, j) in team"
          :key="j"
          class="mb-2"
          v-model="teams[i][j]"/>
      </div>
    </div>
    <div class="row mt-2">
      <div class="col">
        <h2>What are we playing to?</h2>
        <text-input
            type="number"
            v-model="pointsToWin"/>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col">
        <action-button
          block
          @click="initGame">
          Let's play!
        </action-button>
      </div>
    </div>
  </div>
</template>

<script>
  import TextInput from './common/TextInput'
  import ActionButton from './common/ActionButton'
  import { Player, Team } from '../models'
  import { mapActions, mapMutations, mapState } from 'vuex'

  export default {
    name: 'NewGame',
    components: { ActionButton, TextInput },
    data () {
      return {
        teams: [['', ''], ['', '']],
        names: [],
        pointsToWin: 300
      }
    },
    computed: {
      ...mapState([
        'settings'
      ])
    },
    created () {
      // TODO: Put something fun here
      this.names = ['1', '2']
      this.pointsToWin = this.settings.pointsToWin
    },
    methods: {
      ...mapMutations([
        'addPlayer',
        'addTeam',
        'setPointsToWin',
        'updateSettings'
      ]),
      ...mapActions([
        'saveState'
      ]),
      async initGame () {
        let playerIndex = 1
        for (const i in this.teams) {
          const team = new Team('Team ' + this.names[i])
          this.addTeam(team)
          for (const name of this.teams[i]) {
            const player = new Player(name || `Player ${playerIndex}`, team.id)
            this.addPlayer(player)
            playerIndex++
          }
        }
        this.updateSettings({ pointsToWin: this.pointsToWin })
        await this.saveState()
        this.$router.push('play')
      }
    }
  }
</script>

<style scoped>
</style>