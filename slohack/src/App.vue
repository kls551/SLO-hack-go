<template>
  <div id="app">
    <b-navbar type="dark" variant="info">
      <b-navbar-brand href=""><img 
        class="logo"
      src="@/assets/logo.png"/></b-navbar-brand>

      <b-button class="button" variant="info" v-bind:to="{ name: 'users' }">Check Status</b-button>

      <b-button class="button" variant="info" v-bind:to="{ name: 'home' }">Home</b-button>

    </b-navbar>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.button {
  margin: 10px;
}
.logo {
  width: 120px;
  height: 80px;
}
</style>
