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
      <span class="col justify-content-end">
        Bid
      </span>
      <TextInput
        v-model="bid"
        @input="$emit('update-bid', bid)"
        class="col input-field"/>
    </div>
    <div class="row align-items-center">
      <span class="col">
        Tricks
      </span>
      <TextInput
        disabled
        v-model="tricks"
        @input="$emit('update-tricks', tricks)"
        class="col input-field"/>
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
      }
    },
    data() {
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
  }
  .input-field {
  }
</style>