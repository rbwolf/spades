<template>
  <div class="round">
    <div class="row align-items-center">
      <round-team-summary
        class="col"
        :team-id="teamArray[0].id"
        :round-id="roundId"/>
      <div class="col d-flex flex-column align-items-center">
        <deco/>
        <h5 class="round-number mt-2">
          Round {{ roundNumber }}
        </h5>
        <deco class="deco-bottom"/>
      </div>
      <round-team-summary
        class="col"
        :team-id="teamArray[1].id"
        :round-id="roundId"/>
    </div>
  </div>
</template>

<script>
  import RoundTeamSummary from './RoundTeamSummary'
  import Deco from '../svg/Deco'

  export default {
    name: 'RoundSummary',
    components: {Deco, RoundTeamSummary},
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
    background-color: $cardBackground;
  }

  .round-number {
    font-family: $headerFont;
    text-align: center;
  }

  .deco-bottom {
    transform: rotate(180deg);
  }
</style>