<template>
  <div class="bar">
    <div class="container">
      <div class="row py-2">
        <div class="col">
          <div class="d-flex align-items-center">
            <h1 class="title">
              Spades
            </h1>
            <spade
              :size="28"
              class="spade"/>
          </div>
        </div>
        <div
          class="col d-flex align-items-center justify-content-end new-game"
          @click="onClickNew">
          <circle-plus/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Spade from './svg/Spade'
  import CirclePlus from './svg/CirclePlus'
  import { mapMutations } from 'vuex'

  export default {
    name: 'App',
    components: {CirclePlus, Spade},
    methods: {
      ...mapMutations([
        'clearAllData'
      ]),
      onClickNew () {
        if (confirm('Are you sure you want to start a new game?')) {
          this.clearAllData()
          this.$router.push('new')
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .bar {
    background-color: #fefefe;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
    padding: 8px 0;
  }

  .title {
    font-weight: bold;
    margin-bottom: 0;
    cursor: default;
    user-select: none;
  }

  .spade {
    margin-left: 8px;
  }

  .new-game {
    &:active {
      opacity: 70%;
    }
  }
</style>
