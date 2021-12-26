<template>
  <transition name="fade">
    <div
        v-if="modal !== null"
        @click="onClose"
        class="modal-bg">
      <div class="content">
        <component :is="modal"/>
      </div>
    </div>
  </transition>
</template>

<script>
  import { mapMutations, mapState } from 'vuex'
  import ConfirmNewGame from './ConfirmNewGame'

  export default {
    name: 'Modal',
    components: { ConfirmNewGame },
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
      }
    }
  }
</script>

<style lang="scss" scoped>
  .modal-bg {
    position: absolute;
    z-index: 1;
    width: 100vw;
    height: 100vh;
    background-color: rgba(grey, 0.6);
    padding: 18px;
  }

  .content {
    position: relative;
    top: 30%;
    border-radius: 8px;
    border: 1px solid lightgrey;
    background-color: #fefefe;
    padding: 24px;
  }
</style>