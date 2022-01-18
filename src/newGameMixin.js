import { mapActions, mapMutations } from 'vuex'

export default {
  methods: {
    ...mapActions([
      'clearState'
    ]),
    ...mapMutations([
      'clearAllData',
      'closeModal'
    ]),
    async startNewGame () {
      await this.clearState()
      this.$nextTick(() => {
        this.$router.push('new')
        this.closeModal()
        this.clearAllData()
      })
    }
  }
}