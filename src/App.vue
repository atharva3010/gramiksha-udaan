<template>
  <v-app>
    <v-container>
      <div id="app">
        <router-view/>
      </div>
    </v-container>
  </v-app>
</template>

<script>
import Dashboard from './components/Dashboard/Dashboard.vue'

export default {
  name: 'App',
  components: {
    Dashboard
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
