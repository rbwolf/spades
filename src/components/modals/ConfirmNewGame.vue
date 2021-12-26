<template>
  <div>
    <h5>
      Are you sure you want to start a new game?
    </h5>
    <div class="mt-3">
      <action-button
        block
        @click="onConfirm">
        Ok
      </action-button>
      <action-button
        block
        @click="onClose"
        class="mt-1"
        variant="secondary">
        Cancel
      </action-button>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapMutations } from 'vuex'
  import ActionButton from '../common/ActionButton'

  export default {
    name: 'ConfirmNewGame',
    components: { ActionButton },
    methods: {
      ...mapMutations([
        'clearAllData',
        'closeModal'
      ]),
      ...mapActions([
        'clearState'
      ]),
      async onConfirm () {
        await this.clearState()
        this.$nextTick(() => {
          this.$router.push('new')
          this.closeModal()
          this.clearAllData()
        })
      },
      onClose () {
        this.closeModal()
      }
    }
  }
</script>

<style scoped>

</style>