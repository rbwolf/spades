<template>
  <div class="text-center">
    <h1 class="score">
      <ICountUp :endVal="score"/>
    </h1>
    <h3 class="team-name">{{ teamName }}</h3>
    <h6>
      <ICountUp :endVal="bags"/> bag{{ bags !== 1 ? 's' : '' }}
    </h6>
  </div>
</template>

<script>
  import ICountUp from 'vue-countup-v2';

  export default {
    name: 'TeamScore',
    components: { ICountUp },
    props: {
      score: {
        type: Number,
        default: 0
      },
      bags: {
        type: Number,
        default: 0
      },
      teamName: {
        type: String,
        required: true
      }
    }
  }
</script>

<style scoped>
  .score {
    font-size: 2.5em;
  }

  .team-name {
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>