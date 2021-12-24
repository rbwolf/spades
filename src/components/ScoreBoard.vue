<template>
  <div class="row">
    <div
      v-for="(team, i) in teams"
      :key="team.id"
      class="col text-center">
      <h1>
        <ICountUp :endVal="scores[i]"/>
      </h1>
      <h3>{{ team.name }}</h3>
      <h6>
        <ICountUp :endVal="bags[i]"/> bag{{ bags[i] !== 1 ? 's' : '' }}</h6>
    </div>
  </div>
</template>

<script>
  import ICountUp from 'vue-countup-v2';

  export default {
    name: 'ScoreBoard',
    components: { ICountUp },
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