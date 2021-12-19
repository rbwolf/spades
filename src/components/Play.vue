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
  import { mapMutations } from 'vuex'

  export default {
    name: 'Game',
    components: {ScoreBoard, Round},
    mounted () {
      this.addNewRound()
    },
    methods: {
      ...mapMutations([
        'addNewRound'
      ])
    }
  }
</script>

<style scoped>

</style>