<template>
  <div class="round py-3 px-4">
    <div class="d-flex justify-content-center align-items-center mb-2">
      <hr class="round-hr">
      <h5 class="round-number">Round {{ rounds.length + 1 }}</h5>
      <hr class="round-hr">
    </div>
    <div class="row">
      <new-player-round
        ref="new-player-round"
        class="col col-3 player-round"
        v-for="player in players"
        :key="player.id"
        :player="player"
        :allow-bidding="bidding"
        :allow-counting="counting"
        :bid="bids[player.id]"
        :tricks="tricks[player.id]"
        :blind="blind[player.id]"
        @update-bid="bid => updateBid(player.id, bid)"
        @update-tricks="t => updateTricks(player.id, t)"
        @toggle-blind="toggleBlind(player.id)"/>
    </div>
    <div class="row mt-3">
      <action-button
        @click="onClick"
        class="col col-12"
        ref="primary-action">
        {{ buttonText }}
      </action-button>
      <action-button
        v-if="counting"
        @click="editBids"
        variant="secondary"
        class="col col-12 mt-1">
        Edit Bids
      </action-button>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  import NewPlayerRound from './NewPlayerRound'
  import ActionButton from './common/ActionButton'

  export default {
    name: 'Round',
    components: { ActionButton, NewPlayerRound },
    data () {
      return {
        bids: {},
        tricks: {},
        blind: {},
        bidding: true,
        counting: false,
        complete: false,
      }
    },
    computed: {
      ...mapState([
        'players',
        'rounds'
      ]),
      buttonText () {
        return this.bidding ? 'Submit Bids' : 'End Round'
      }
    },
    created () {
      this.initRound()
    },
    methods: {
      ...mapActions([
        'submitRound'
      ]),
      onClick () {
        if (this.bidding) {
          this.submitBids()
        } else {
          this.endRound()
        }
      },
      editBids () {
        this.bidding = true
        this.counting = false
      },
      updateBid (playerId, bid) {
        this.bids[playerId] = bid
        this.autoAdvance('bid-input')
      },
      updateTricks (playerId, tricks) {
        this.tricks[playerId] = tricks
        this.autoAdvance('tricks-input')
      },
      submitBids () {
        this.bidding = false
        this.counting = true
        this.selectFirstInput('tricks-input')
      },
      endRound () {
        this.submitRound({ bids: this.bids, tricks: this.tricks, blind: this.blind })
        this.initRound()
        this.selectFirstInput('bid-input')
      },
      autoAdvance (inputClass) {
        const inputs = Object.values(document.getElementsByClassName(inputClass))
        const activeIndex = inputs.findIndex((el) => document.activeElement === el)
        if (activeIndex < inputs.length - 1) {
          inputs[activeIndex + 1].focus()
        } else {
          this.$refs['primary-action'].$el.focus()
        }
      },
      selectFirstInput (inputClass) {
        const firstInput = Object.values(document.getElementsByClassName(inputClass))[0]
        this.$nextTick(() => {
          firstInput.focus()
        })
      },
      toggleBlind (playerId) {
        this.blind[playerId] = !this.blind[playerId]
      },
      initRound () {
        this.bidding = true
        this.counting = false
        Object.values(this.players).forEach(player => {
          this.$set(this.bids, player.id, 0)
          this.$set(this.tricks, player.id, 0)
          this.$set(this.blind, player.id, false)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../global.scss';

  .round {
    background-color: $cardBackground;
    box-shadow: $defaultShadow;
    border-radius: $borderRadius;
    border: $defaultBorder;
  }

  .round-number {
    flex-grow: 1;
    text-align: center;
    font-family: $darkHeaderFont;
    white-space: nowrap;
    margin-bottom: 0;
    padding: 0 18px;
  }

  .round-hr {
    flex-shrink: 1;
    color: $darkAccent;
    width: 90%;
    height: 1px;
    opacity: 0.5;
  }
</style>