<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 0 24 24" fill="none" :stroke="color"
       stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-up">
    <polyline points="18 15 12 9 6 15"></polyline>
  </svg>
</template>

<script>
  export default {
    name: 'ChevronUp',
    props: {
      size: {
        type: Number,
        default: 24
      },
      color: {
        type: String,
        default: '#FF5A5A'
      }
    }
  }
</script>

<style scoped>

</style>