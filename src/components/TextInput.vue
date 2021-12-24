<template>
  <input
      class="text-input"
      :type="type"
      :maxlength="10"
      :min="min"
      :max="max"
      :placeholder="placeholder"
      :value="value"
      @input="$emit('input', $event.target.value)"/>
</template>

<script>
  export default {
    name: 'TextInput',
    props: {
      value: {
        type: [String, Number],
        default: ''
      },
      type: {
        type: String,
        default: 'text'
      },
      placeholder: {
        type: String,
        required: false
      },
      min: {
        type: Number,
        default: 1
      },
      max: {
        type: Number,
        default: 13
      }
    }
  }
</script>

<style lang="scss" scoped>
  .text-input {
    border-radius: 8px;
    outline: none;
    padding: 12px;
    border: 1px solid lightgrey;
    /*box-shadow: inset 0 4px 4px rgba(0, 0, 0, 0.25);*/
    box-sizing: border-box;
    width: 100%;
    &:disabled {
      background-color: lightgrey;
    }
  }
</style>