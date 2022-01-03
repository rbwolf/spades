<template>
  <svg width="63" height="15" viewBox="0 0 63 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line y1="10" x2="63" y2="10" :stroke="color" stroke-width="2"/>
    <path d="M6 14H57" :stroke="color"/>
    <rect x="31.8284" y="0.707107" width="3" height="3" transform="rotate(45 31.8284 0.707107)" :fill="color" :stroke="color"/>
  </svg>
</template>

<script>
  export default {
    name: 'Deco',
    props: {
      color: {
        type: String,
        default: '#BAA866'
      }
    }
  }
</script>

<style scoped>

</style>