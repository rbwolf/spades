<template>
  <button
    class="blind-toggle"
    @click="$emit('toggle')">
    <component
      :is="blind ? 'eye-off' : 'eye'"
      class="icon"
      :class="{'off': !blind}"/>
  </button>
</template>

<script>
  import EyeOff from './svg/EyeOff'
  import Eye from './svg/Eye'

  export default {
    name: 'BlindToggle',
    components: {EyeOff, Eye},
    props: {
      blind: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .blind-toggle {
    padding: 0;
    margin: 0;
    outline: none;
    border: none;
    background: none;
  }

  .off {
    opacity: 20%;
  }
</style>