<template>
  <div>
    <div class="row">
      <div class="col player-name">
        {{ playerName }}
      </div>
      <div class="col">
        <div class="d-flex align-items-center">
          {{ playerRound.tricks }}
          <div class="mx-1">
            <chevron-up v-if="overscored"/>
            <chevron-down v-else-if="underscored"/>
            <check v-else/>
          </div>
          {{ playerRound.bid }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ChevronUp from './svg/ChevronUp'
  import ChevronDown from './svg/ChevronDown'
  import Check from './svg/Check'
  export default {
    name: 'RoundPlayerSummary',
    components: {Check, ChevronDown, ChevronUp},
    props: {
      playerName: {
        type: String,
        required: true
      },
      playerRound: {
        type: Object,
        required: true
      }
    },
    computed: {
      overscored () {
        return this.playerRound.tricks > this.playerRound.bid
      },
      underscored () {
        return this.playerRound.tricks < this.playerRound.bid
      }
    }
  }
</script>

<style scoped>
  .player-name {
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>