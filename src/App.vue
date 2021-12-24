<template>
  <div>
    <AppBar/>
    <div class="container game">
      <div class="mt-3">
        <transition
          name="fade"
          mode="out-in">
          <router-view :key="$route.name"/>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
  import AppBar from './components/AppBar'

  export default {
    name: 'App',
    components: {
      AppBar
    }
  }
</script>

<style lang="scss">
  @import "~bootstrap";

  h1 {
    font-weight: bold;
  }

  body {
    font-family: 'Raleway', Helvetica, sans-serif;
    margin: 0;
    background-color: #fafafa;
  }

  .game {
    max-width: 1000px;
    padding-bottom: 100px;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 100ms;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
