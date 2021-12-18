<template>
  <div class="row mb-4">
    <div
      v-for="(team, id) in teams"
      :key="'team-' + id"
      class="col text-center">
      <h1>{{ getTeamScore(Number(id)) }}</h1>
      <h3>{{ team.name }}</h3>
      <h6>{{ team.bags }} bag{{ team.bags !== 1 ? 's' : '' }}</h6>
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
        'getTeamScore'
      ])
    }
  }
</script>

<style scoped>

</style>