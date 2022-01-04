<template>
  <transition name="fade">
    <div
      v-if="modal !== null"
      @click="onClose"
      class="modal-bg">
      <div
        @click="onClickContent"
        class="content"
        :class="{'padded': modal !== 'game-over'}">
        <component :is="modal"/>
      </div>
    </div>
  </transition>
</template>

<script>
  import { mapMutations, mapState } from 'vuex'
  import ConfirmNewGame from './ConfirmNewGame'
  import Settings from './Settings'
  import GameOver from './GameOver'

  export default {
    name: 'Modal',
    components: { ConfirmNewGame, Settings, GameOver },
    computed: {
      ...mapState([
        'modal',
      ])
    },
    methods: {
      ...mapMutations([
        'closeModal'
      ]),
      onClose () {
        this.closeModal()
      },
      onClickContent (e) {
        e.stopPropagation()
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../global.scss';

  .modal-bg {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    width: 100vw;
    height: 100vh;
    background-color: rgba(black, 0.7);
    padding: 18px;
  }

  .content {
    z-index: 2;
    border-radius: $borderRadius;
    border: $defaultBorder;
    background-color: $background;
    &.padded {
      padding: 24px;
    }
  }

</style>