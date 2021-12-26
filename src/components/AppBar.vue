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
          v-if="$route.name === 'play'"
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
  import { mapActions, mapMutations } from 'vuex'

  export default {
    name: 'App',
    components: {CirclePlus, Spade},
    methods: {
      ...mapMutations([
        'clearAllData',
        'openModal',
        'closeModal'
      ]),
      ...mapActions([
        'clearState'
      ]),
      async onClickNew () {
        this.openModal('confirm-new-game')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../global.scss';

  .bar {
    background-color: $white;
    box-shadow: $defaultShadow;
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
      opacity: 0.7;
    }
  }
</style>
