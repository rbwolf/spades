<template>
  <input
      class="text-input"
      :type="type"
      :maxlength="10"
      :min="1"
      :max="1000"
      :placeholder="placeholder"
      :value="value"
      @input="$emit('input', $event.target.value)"/>
</template>

<script>
  export default {
    name: 'TextInput',
    props: {
      value: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: 'text'
      },
      placeholder: {
        type: String,
        required: false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .text-input {
    border-radius: 8px;
    outline: none;
    border: none;
    padding: 12px;
    box-shadow: inset 0 4px 4px rgba(0, 0, 0, 0.25);
    box-sizing: border-box;
    width: 100%;
  }
</style>