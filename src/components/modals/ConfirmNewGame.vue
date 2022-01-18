<template>
  <div class="new-game">
    <h5>
      Are you sure you want to start a new game?
    </h5>
    <div class="mt-4">
      <action-button
        block
        @click="startNewGame">
        Ok
      </action-button>
      <action-button
        block
        @click="closeModal"
        class="mt-1"
        variant="secondary">
        Cancel
      </action-button>
    </div>
  </div>
</template>

<script>
  import ActionButton from '../common/ActionButton'
  import newGameMixin from '../../newGameMixin'

  export default {
    name: 'ConfirmNewGame',
    components: { ActionButton },
    mixins: [newGameMixin],
    methods: {
      onClose () {
        this.closeModal()
      }
    }
  }
</script>

<style scoped>
  .new-game {
    max-width: 600px;
  }
</style>