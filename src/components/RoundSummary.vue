<template>
  <div class="round">
    <div class="row align-items-center">
      <round-team-summary
        class="col"
        :team-id="teamArray[0].id"
        :round-id="roundId"/>
      <h6 class="col text-center">
        - Round {{ roundNumber }} -
      </h6>
      <round-team-summary
        class="col"
        :team-id="teamArray[1].id"
        :round-id="roundId"/>
    </div>
  </div>
</template>

<script>
  import RoundTeamSummary from './RoundTeamSummary'

  export default {
    name: 'RoundSummary',
    components: {RoundTeamSummary},
    props: {
      roundNumber: {
        type: Number,
        required: true
      },
      roundId: {
        type: String,
        required: true
      },
      teamArray: {
        type: Array,
        required: true
      }
    }
  }
</script>

<style scoped>
  .round {
    padding: 18px;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    border: 1px solid lightgrey;
  }
</style>