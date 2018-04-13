<template>
  <div id="app">
    <router-view v-loading.fullscreen.lock="fullscreenLoading"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  computed: {
    fullscreenLoading() {
      return this.$store.state.loading
    }
  }
}
</script>

<style>
@import './styles/common.css';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
