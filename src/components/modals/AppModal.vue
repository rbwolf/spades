<template>
  <transition name="fade">
    <div
      v-if="modal !== null"
      @click="onClose"
      class="modal-bg">
      <div
        @click="onClickContent"
        class="content">
        <component :is="modal"/>
      </div>
    </div>
  </transition>
</template>

<script>
  import { mapMutations, mapState } from 'vuex'
  import ConfirmNewGame from './ConfirmNewGame'
  import Settings from './Settings'

  export default {
    name: 'Modal',
    components: { ConfirmNewGame, Settings },
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
    z-index: 1;
    width: 100vw;
    height: 100vh;
    background-color: rgba(grey, 0.6);
    padding: 18px;
  }

  .content {
    z-index: 2;
    width: 100%;
    padding: 24px;
    border-radius: $borderRadius;
    border: $defaultBorder;
    background-color: $white;
  }

</style>