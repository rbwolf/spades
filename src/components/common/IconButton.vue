<template>
  <button
    @click="e => $emit('click', e)"
    class="plain-button">
    <component
      :is="iconName"
      :class="{disabled}"
      :size="size"
      :color="color"/>
  </button>
</template>

<script>
  import X from '../svg/X'
  import Eye from '../svg/Eye'
  import EyeOff from '../svg/EyeOff'
  import Gear from '../svg/Gear'
  import CirclePlus from '../svg/CirclePlus'
  import Edit from '../svg/Edit'
  import Check from '../svg/Check'

  export default {
    name: 'IconButton',
    components: {Edit, Eye, EyeOff, X, Gear, CirclePlus, Check},
    props: {
      iconName: {
        type: String,
        required: true
      },
      size: {
        type: Number,
        default: 24
      },
      color: {
        type: String,
        default: 'white'
      },
      disabled: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .plain-button {
    padding: 0;
    margin: 0;
    outline: none;
    border: none;
    background: none;
    :active {
      opacity: 0.7;
    }
  }

  .disabled {
    opacity: 0.2;
  }
</style>