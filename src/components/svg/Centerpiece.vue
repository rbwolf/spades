<template>
  <svg id="centerpiece" width="22" height="37" viewBox="0 0 22 37" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect :class="{show}" x="10.6066" y="0.707107" width="14" height="14" transform="rotate(45 10.6066 0.707107)" stroke="#BAA866"/>
    <rect :class="{show}" x="10.6066" y="3.70711" width="14" height="14" transform="rotate(45 10.6066 3.70711)" stroke="#BAA866"/>
    <rect :class="{show}" x="10.6066" y="12.7071" width="14" height="14" transform="rotate(45 10.6066 12.7071)" stroke="#BAA866"/>
    <rect :class="{show}" x="10.6066" y="15.7071" width="14" height="14" transform="rotate(45 10.6066 15.7071)" stroke="#BAA866"/>
  </svg>
</template>

<script>
  export default {
    name: 'Centerpiece',
    data () {
      return {
        show: false
      }
    },
    mounted () {
      setTimeout(() => this.show = true, 1)
    }
  }
</script>

<style lang="scss" scoped>
  $duration: 300ms;

  rect {
    transition: all $duration linear;
    opacity: 0;
  }

  .show {
    opacity: 1;
  }

  @for $i from 1 through 4 {
    #centerpiece rect:nth-child(#{$i}) {
      transition-delay: ($duration / 4) * $i;
    }
  }

</style>