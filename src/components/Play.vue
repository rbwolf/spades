<template>
  <div class="container mt-4">
    <ScoreBoard/>
    <div class="row">
      <round/>
    </div>
  </div>
</template>

<script>
  import Round from './Round'
  import ScoreBoard from './ScoreBoard'
  export default {
    name: 'Game',
    components: {ScoreBoard, Round}
  }
</script>

<style scoped>

</style>