<template>
  <div class="round">
    <PlayerRound/>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import PlayerRound from './PlayerRound'

  export default {
    name: 'Round',
    components: {PlayerRound},
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
    width: 100%;
    padding: 12px;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
  }
</style>