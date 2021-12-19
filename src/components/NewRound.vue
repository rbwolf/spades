<template>
  <div class="round py-3 px-4">
    <div class="row">
      <new-player-round
          class="col col-3 player-round"
          v-for="player in players"
          :key="player.id"
          :player="player"/>
    </div>
    <div class="row mt-3">
      <action-button class="col">
        Confirm bids
      </action-button>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import NewPlayerRound from './NewPlayerRound'
  import ActionButton from './ActionButton'

  export default {
    name: 'Round',
    components: {ActionButton, NewPlayerRound },
    data() {
      return {
        bidding: true,
        scoring: false,
        complete: false
      }
    },
    computed: {
      ...mapState([
        'players'
      ])
    }
  }
</script>

<style scoped>
  .round {
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    border: 1px solid lightgrey;
  }
</style>