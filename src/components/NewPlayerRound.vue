<template>
  <div class="player-round">
    <div class="row">
      <div class="col">
        <p class="player-name">
          {{ player.name }}
        </p>
      </div>
    </div>
    <div class="row align-items-center">
      <div class="col col-12 col-md-4">
        <label>
          Bid
        </label>
      </div>
      <div class="col col-12 col-md-8 px-2">
        <TextInput
            v-model="bid"
            @input="$emit('update-bid', Number(bid))"
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
            v-model="tricks"
            @input="$emit('update-tricks', Number(tricks))"
            :disabled="!allowCounting"
            type="number"
            ref="tricks"/>
      </div>
    </div>
  </div>
</template>

<script>
  import TextInput from './TextInput'

  export default {
    name: 'PlayerRound',
    components: {TextInput},
    props: {
      player: {
        type: Object,
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
    },
    data () {
      return {
        bid: 0,
        tricks: 0
      }
    }
  }
</script>

<style scoped>
  .player-name {
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  label {
    margin-bottom: 0;
    text-align: center;
  }
</style>