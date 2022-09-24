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
          @click="onClick">
          <!-- TODO: Switch out a gear icon when downloading one isn't $25 -->
          <icon-button
            :icon-name="actionIcon"
            :size="28"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Spade from './svg/Spade'
  import { mapActions, mapMutations } from 'vuex'
  import IconButton from './common/IconButton'

  export default {
    name: 'App',
    components: {IconButton, Spade},
    methods: {
      ...mapMutations([
        'clearAllData',
        'openModal',
        'closeModal'
      ]),
      ...mapActions([
        'clearState'
      ]),
      onClick () {
        this.openModal(this.$route.name === 'new' ? 'settings' : 'confirm-new-game')
      },
    },
    computed: {
      actionIcon () {
        return this.$route.name === 'new' ? 'gear' : 'circle-plus'
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../global.scss';

  .bar {
    background-color: $cardBackground;
    box-shadow: $defaultShadow;
    padding: 8px 0;
    border-bottom: $defaultBorder;
  }

  .title {
    font-weight: bold;
    margin-bottom: 0;
    cursor: default;
    user-select: none;
    font-family: 'Damion', Helvetica, serif;

  }

  .spade {
    margin-left: 8px;
    fill: $accent;
  }

  .new-game {
    &:active {
      opacity: 0.7;
    }
  }
</style>
