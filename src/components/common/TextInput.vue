<template>
  <input
      class="text-input"
      :type="type"
      :maxlength="maxlength"
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
      },
      maxlength: {
        type: Number,
        default: 20
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

  input {
    color: $lightText;
  }

  .text-input {
    width: 100%;
    outline: none;
    padding: 12px;
    box-sizing: border-box;
    border-radius: $borderRadius;
    background-color: $white;
    &:disabled {
      background-color: darken($cardBackground, 5);
      color: rgba($textColor, 0.5);
    }
  }
</style>