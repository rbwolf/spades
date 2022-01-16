<template>
  <div class="row d-flex justify-content-center">
    <team-score
      class="col col-4"
      :score="scores[0]"
      :bags="bags[0]"
      :team-name="teams[0].name"/>
    <centerpiece
      class="col col-2 centerpiece"/>
    <team-score
      class="col col-4 team-score"
      :score="scores[1]"
      :bags="bags[1]"
      :team-name="teams[1].name"/>
  </div>
</template>

<script>
  import Centerpiece from './svg/Centerpiece'
  import TeamScore from './TeamScore'

  export default {
    name: 'ScoreBoard',
    components: {TeamScore, Centerpiece },
    props: {
      teams: {
        type: Array,
        required: true
      },
      scores: {
        type: Array,
        required: true
      },
      bags: {
        type: Array,
        required: true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .centerpiece {
    transform: scale(1.7);
    align-self: center;
  }

  .team-score {
    flex-grow: 0;
    overflow: hidden;
  }
</style>