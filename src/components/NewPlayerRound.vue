<template>
  <div class="player-round">
    <div class="row">
      <div class="col d-flex justify-content-center align-items-center">
        <p class="player-name">
          {{ player.name }}
        </p>
      </div>
    </div>
    <div class="row align-items-center mt-2">
      <div class="col col-12 col-md-5 d-flex align-items-md-center">
        <label>
          Bid
        </label>
        <icon-button
          :icon-name="blind ? 'eye-off' : 'eye'"
          :disabled="!allowBidding"
          @click="$emit('toggle-blind')"
          :class="{'unselected': !blind}"
          tabindex="-1"
          class="blind-button px-2 mb-2 mb-md-0"/>
      </div>
      <div class="col col-12 col-md-7 px-2">
        <TextInput
          :value="bid"
          @input="v => $emit('update-bid', Number(v))"
          :disabled="!allowBidding"
          type="number"
          class="bid-input"/>
      </div>
    </div>
    <div class="row align-items-center mt-2">
      <div class="col col-12 col-md-5">
        <label>
          Tricks
        </label>
      </div>
      <div class="col col-12 col-md-7 px-2">
        <TextInput
          :value="tricks"
          @input="v => $emit('update-tricks', Number(v))"
          :disabled="!allowCounting"
          type="number"
          class="tricks-input"/>
      </div>
    </div>
  </div>
</template>

<script>
  import TextInput from './common/TextInput'
  import IconButton from './common/IconButton'

  export default {
    name: 'PlayerRound',
    components: {IconButton, TextInput},
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
    white-space: nowrap;
    margin-bottom: 0;
  }

  .unselected {
    opacity: 0.2;
  }

  label {
    margin-bottom: 0;
    text-align: center;
  }

  .blind-button {
    flex-shrink: 0;
  }

  .bid-input {
    /* No style; just used for auto-selecting next input */
  }
</style>