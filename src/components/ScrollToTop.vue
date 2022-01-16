<template>
  <transition name="fade-up">
    <button
        v-if="showButton"
        class="scroll-to-top"
        @click="scrollToTop">
      <chevron-up
          class="up-arrow"
          :size="36"/>
    </button>
  </transition>
</template>

<script>
  import ChevronUp from './svg/ChevronUp'
  export default {
    name: 'ScrollToTop',
    components: {ChevronUp},
    data () {
      return {
        showButton: false
      }
    },
    methods: {
      scrollToTop () {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    },
    mounted () {
      window.addEventListener('scroll', () => {
        if (window.scrollY > (window.innerHeight / 2)) {
          this.showButton = true
        } else {
          this.showButton = false
        }
      })
    }
  }
</script>

<style lang="scss" scoped>
  @import "../global.scss";

  .scroll-to-top {
    height: 56px;
    width: 56px;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $darkAccent;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    border: none;
    outline: none;
    &:active {
      outline: none;
      opacity: 0.8;
    }
  }

  .up-arrow {
    stroke: $darkBackground;
  }

  .fade-up-enter-active, .fade-up-leave-active {
    transition: all 250ms;
  }

  .fade-up-enter, .fade-up-leave-to {
    transform: translateY(18px);
    opacity: 0;
  }


</style>