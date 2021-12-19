<template>
  <div class="row mb-4">
    <div
      v-for="team in teams"
      :key="team.id"
      class="col text-center">
      <h1>{{ getTeamScore(team.id) }}</h1>
      <h3>{{ team.name }}</h3>
      <h6>{{ getTeamBags(team.id) }} bag{{ getTeamBags(team.id) !== 1 ? 's' : '' }}</h6>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapState } from 'vuex'

  export default {
    name: 'ScoreBoard',
    computed: {
      ...mapState([
        'teams'
      ]),
      ...mapGetters([
        'getTeamScore',
        'getTeamBags'
      ])
    }
  }
</script>

<style scoped>

</style>