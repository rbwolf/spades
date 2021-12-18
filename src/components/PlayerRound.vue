<template>
  <div class="player-round">
    <div class="row">
      <div class="col">
        <TextInput max="10" disabled/>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <p class="player-name">
          Blah
        </p>
      </div>
    </div>
    <div class="row">
      <div class="col d-flex align-items-center">
        <span class="me-2">Bid</span>
        <TextInput class="bid-field"/>
      </div>
    </div>
    <div class="row border-top">
      <div class="col d-flex align-items-center">
        <span class="me-2">Tricks</span>
        <TextInput disabled="true" class="trick-field"/>
      </div>
    </div>
  </div>
</template>

<script>
  import TextInput from './TextInput'

  export default {
    name: 'PlayerRound',
    components: {TextInput}
  }
</script>

<style scoped>

  .player-name {
    font-weight: bold;
  }
</style>