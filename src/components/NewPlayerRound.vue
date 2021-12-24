<template>
  <div class="player-round">
    <div class="row">
      <div class="col d-flex justify-content-center align-items-center">
        <p class="player-name">
          {{ player.name }}
        </p>
        <blind-toggle
          :blind="blind"
          :disabled="!allowBidding"
          @toggle="$emit('toggle-blind')"
          class="mx-2"/>
      </div>
    </div>
    <div class="row align-items-center mt-3">
      <div class="col col-12 col-md-4">
        <label>
          Bid
        </label>
      </div>
      <div class="col col-12 col-md-8 px-2">
        <TextInput
          :value="bid"
          @input="v => $emit('update-bid', Number(v))"
          :disabled="!allowBidding"
          type="number"
          ref="bid"/>
      </div>
    </div>
    <div class="row align-items-center mt-2">
      <div class="col col-12 col-md-4">
        <label>
          Tricks
        </label>
      </div>
      <div class="col col-12 col-md-8 px-2">
        <TextInput
          :value="tricks"
          @input="v => $emit('update-tricks', Number(v))"
          :disabled="!allowCounting"
          type="number"
          ref="tricks"/>
      </div>
    </div>
  </div>
</template>

<script>
  import TextInput from './common/TextInput'
  import BlindToggle from './BlindToggle'

  export default {
    name: 'PlayerRound',
    components: {BlindToggle, TextInput},
    props: {
      player: {
        type: Object,
        required: true
      },
      bid: {
        type: Number,
        required: true
      },
      tricks: {
        type: Number,
        required: true
      },
      blind: {
        type: Boolean,
        required: true
      },
      allowBidding: {
        type: Boolean,
        required: true
      },
      allowCounting: {
        type: Boolean,
        required: true
      }
    }
  }
</script>

<style scoped>
  .player-name {
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 0;
  }

  label {
    margin-bottom: 0;
    text-align: center;
  }
</style>