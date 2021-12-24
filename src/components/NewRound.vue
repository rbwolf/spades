<template>
  <div class="round py-3 px-4">
    <div class="row">
      <new-player-round
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
        @update-tricks="tricks => updateTricks(player.id, tricks)"
        @toggle-blind="toggleBlind(player.id)"/>
    </div>
    <div class="row mt-3">
      <action-button
        @click="onClick"
        class="col col-12">
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
  import ActionButton from './ActionButton'

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
        'players'
      ]),
      buttonText () {
        return this.bidding ? 'Submit Bids' : 'End Round'
      }
    },
    created () {
      Object.values(this.players).forEach(player => {
        this.$set(this.bids, player.id, 0)
        this.$set(this.tricks, player.id, 0)
        this.$set(this.blind, player.id, false)
      })
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
      },
      submitBids () {
        this.bidding = false
        this.counting = true
      },
      updateTricks (playerId, tricks) {
        this.tricks[playerId] = tricks
      },
      endRound () {
        this.submitRound({ bids: this.bids, tricks: this.tricks, blind: this.blind })
      },
      toggleBlind (playerId) {
        this.blind[playerId] = !this.blind[playerId]
      }
    }
  }
</script>

<style scoped>
  .round {
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    border: 1px solid lightgrey;
  }
</style>