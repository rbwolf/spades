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

<style lang="scss" scoped>
  @import '../../global.scss';

  .round {
    padding: 18px;
    box-shadow: $defaultShadow;
    border-radius: $borderRadius;
    border: $defaultBorder;
  }
</style>