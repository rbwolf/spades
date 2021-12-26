<template>
  <input
      class="text-input"
      :type="type"
      :maxlength="10"
      :min="min"
      :max="max"
      :placeholder="placeholder"
      :value="value"
      @input="emitValue"/>
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
    },
    methods: {
      emitValue (e) {
        this.$emit('input', this.type === 'number'
          ? Number(e.target.value)
          : e.target.value)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../global.scss';

  .text-input {
    width: 100%;
    outline: none;
    padding: 12px;
    box-sizing: border-box;
    border: $defaultBorder;
    border-radius: $borderRadius;
    &:disabled {
      background-color: lightgrey;
    }
  }
</style>