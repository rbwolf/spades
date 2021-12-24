<template>
  <button
      :class="variant === 'secondary' ? 'secondary-button' : 'primary-button'"
      @click="$emit('click')">
    <slot/>
  </button>
</template>

<script>
  export default {
    name: 'Button',
    props: {
      variant: {
        type: String,
        default: 'primary'
      }
    }
  }
</script>

<style lang="scss" scoped>
  $accent: #44A9AF;

  .primary-button {
    user-select: none;
    background-color: $accent;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 12px;
    &:focus {
      outline: 2px solid lightskyblue;
    }
    &:active, &:disabled {
      opacity: 0.6;
    }
  }

  .secondary-button {
    user-select: none;
    color: $accent;
    border: none;
    padding: 12px;
    background: none;
    &:active, &:disabled, &:focus {
      outline: none;
      opacity: 0.6;
    }
  }

</style>