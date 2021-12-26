<template>
  <div>
    <h5 class="fw-bold pb-2">Settings</h5>
    <div class="settings">
      <div
        v-for="[setting,] in availableSettings"
        :key="setting"
        class="mt-2">
        <label>
          {{ displayNames[setting] }}
        </label>
        <text-input
          v-model="localSettings[setting]"
          type="number"/>
      </div>
    </div>
    <div class="footer">
      <action-button
        @click="onSave"
        block>
        Save
      </action-button>
      <action-button
        @click="onCancel"
        block
        variant="secondary">
        Cancel
      </action-button>
    </div>
  </div>
</template>

<script>
  import { mapMutations, mapState } from 'vuex'
  import TextInput from '../common/TextInput'
  import ActionButton from '../common/ActionButton'

  export default {
    name: 'Settings',
    components: {TextInput, ActionButton},
    data () {
      return {
        localSettings: {},
        displayNames: {
          pointsToWin: 'Points to Win',
          matchedBidScore: 'Matched Bid Score',
          surplusBidScore: 'Surplus Bid Score',
          bagLimit: 'Bag Limit',
          bustPenalty: 'Bust Penalty',
          blindBonus: 'Blind Bonus',
          nilBonus: 'Blind Bonus'
        }
      }
    },
    created () {
      this.localSettings = { ...this.settings }
    },
    computed: {
      ...mapState([
        'settings'
      ]),
      availableSettings () {
        return Object.entries(this.settings).filter(([k,]) => k !== 'pointsToWin')
      }
    },
    methods: {
      ...mapMutations([
        'updateSettings',
        'closeModal'
      ]),
      onSave () {
        this.updateSettings(this.localSettings)
        this.closeModal()
      },
      onCancel () {
        this.closeModal()
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../global.scss';

  .settings {
    max-height: 60vh;
    overflow: scroll;
    padding-bottom: 12px;
  }

  .footer {
    z-index: 1;
    position: sticky;
    bottom: 0;
    background-color: $white;
    padding-top: 12px;
  }

</style>