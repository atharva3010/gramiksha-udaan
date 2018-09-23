<template>
  <v-app>
    <v-toolbar>
  
      <v-toolbar-side-icon class="hidden-sm-and-up" @click.stop="isDrawer=!isDrawer"> </v-toolbar-side-icon>
    <v-toolbar-title> <router-link tag="span" to="/" style="cursor:pointer;">GM PORTAL</router-link></v-toolbar-title>
    
       <v-spacer></v-spacer>
           <v-toolbar-items >
    <v-btn to="/Login" flat><v-icon left>lock</v-icon>Log in</v-btn>
    <v-btn to="/Signup" flat><v-icon left>face</v-icon>Sign Up</v-btn>
 </v-toolbar-items>
    </v-toolbar>
    <v-container>
      <div id="app">
        <router-view/>
      </div>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
</style>
