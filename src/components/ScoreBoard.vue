<template>
  <div class="row">
    <div
      v-for="(team, i) in teams"
      :key="team.id"
      class="col text-center">
      <h1>{{ scores[i] }}</h1>
      <h3>{{ team.name }}</h3>
      <h6>{{ bags[i] }} bag{{ bags[i] !== 1 ? 's' : '' }}</h6>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ScoreBoard',
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