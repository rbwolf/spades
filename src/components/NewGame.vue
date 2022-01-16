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
        <div class="d-flex align-items-center mb-2">
          <div
            class="team-name"
            :class="{'w-100': editNames}">
            <h3
              class="mb-0">
              <span v-if="!editNames">{{ names[i] }}</span>
            </h3>
            <text-input
              v-if="editNames"
              :value="names[i]"
              @input="v => names[i] = v"
              :maxlength="24"
              class="name-input"/>
          </div>
          <icon-button
            @click="editNames = !editNames"
            :size="editNames ? 24 : 18"
            :icon-name="editNames ? 'check' : 'edit'"
            tabindex="-1"
            color="white"
            class="edit-button"/>
        </div>
        <text-input
          v-for="(_, j) in team"
          :key="j"
          class="mb-2"
          v-model="teams[i][j]"
          :placeholder="'Player ' + getIndex(i, j)"/>
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
  import IconButton from './common/IconButton'

  export default {
    name: 'NewGame',
    components: { IconButton, ActionButton, TextInput },
    data () {
      return {
        teams: [['', ''], ['', '']],
        names: [],
        editNames: false,
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
      this.names = ['Team 1', 'Team 2']
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
          const team = new Team(this.names[i])
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
      },
      getIndex (i, j) {
        if (i === j) {
          return i === 1 ? '4' : '1'
        }
        return i === 1 ? '3' : '2'
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../global.scss';

  .team-name {
    display: flex;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .name-input {
    flex: 1;
  }

  .edit-button {
    opacity: 0.2;
    margin-left: 8px;
  }
</style>