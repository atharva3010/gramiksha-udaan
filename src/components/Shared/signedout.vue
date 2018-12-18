<template>
  <v-dialog persistent v-model="userSignedIn" width="400">
    <v-card>
      <h3 style="font-weight:300;padding:40px;">You Need to be Signed up to view this page</h3>
      <v-layout style="padding:25px;">
        <v-spacer></v-spacer>
        <v-flex>
          <v-btn to="/login" color="primary">Sign in</v-btn>
        </v-flex>
        <v-flex>
          <v-btn to="/Signup" flat>Register</v-btn>
        </v-flex>
        <v-spacer></v-spacer>
      </v-layout>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return { rs: true };
  },
  computed: {
    userSignedIn() {
      return !this.$store.getters["user/getIsSignedIn"];
    }
  }
};
</script>
