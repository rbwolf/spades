<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 0 24 24" fill="none" :stroke="color"
       stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
</template>

<script>
  export default {
    name: 'ChevronDown',
    props: {
      size: {
        type: Number,
        default: 24
      },
      color: {
        type: String,
        default: '#5A9CFF'
      }
    }
  }
</script>

<style scoped>

</style>