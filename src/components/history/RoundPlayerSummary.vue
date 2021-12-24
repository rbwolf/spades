<template>
  <div>
    <div class="row my-2 my-md-0">
      <div class="col col-12 col-md-6 player-name text-center text-md-start fw-bold">
        {{ playerName }}
      </div>
      <div class="col col-12 col-md-6">
        <div class="d-flex align-items-center justify-content-center">
          {{ playerRound.tricks }}
          <div class="mx-1">
            <chevron-up v-if="overscored"/>
            <chevron-down v-else-if="underscored"/>
            <check v-else/>
          </div>
          {{ playerRound.bid }}
          <div class="position-relative">
            <eye-off
                v-if="playerRound.blind"
                :size="14"
                class="blind-icon"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ChevronUp from '../svg/ChevronUp'
  import ChevronDown from '../svg/ChevronDown'
  import Check from '../svg/Check'
  import EyeOff from '../svg/EyeOff'
  export default {
    name: 'RoundPlayerSummary',
    components: {EyeOff, Check, ChevronDown, ChevronUp},
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
  .blind-icon {
    position: absolute;
    opacity: 25%;
    top: -6px;
    left: 8px;
  }
</style>