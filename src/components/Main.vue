<template>
  <div class="container mt-4">
    <div class="row mb-4">
      <div class="col text-center">
        <h1>132</h1>
        <h3>Team 1</h3>
        <h6>0 bags</h6>
      </div>
      <div class="col text-center">
        <h1>-321</h1>
        <h3>Team 2</h3>
        <h6>0 bags</h6>
      </div>
    </div>
    <div class="row">
      <round/>
    </div>
  </div>
</template>

<script>
  import Round from './Round'
  export default {
    name: 'Game',
    components: {Round}
  }
</script>

<style scoped>

</style>