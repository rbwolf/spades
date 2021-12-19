<template>
  <button
      class="spades-button"
      @click="$emit('click')">
    <slot/>
  </button>
</template>

<script>
  export default {
    name: 'Button',
  }
</script>

<style lang="scss" scoped>
  .spades-button {
    outline: none;
    background-color: #44A9AF;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 12px;
    &:active {
      opacity: 80%;
    }
  }
</style>