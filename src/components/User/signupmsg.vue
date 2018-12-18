<template>
  <v-container>
    <v-layout row>
      <v-card-title style="font-size:32px;">
        Hello &nbsp;
        <b>{{username}}</b>&nbsp;, Your Account is registered, Please log in.
      </v-card-title>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  computed: {
    username() {
      return this.$store.getters["user/getUserDetails"].username;
    }
  }
};
</script>

