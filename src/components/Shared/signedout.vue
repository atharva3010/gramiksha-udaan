<template>
  <v-dialog persistent v-model="userSignedIn" width="400">
    <v-card>
      <h3 style="font-weight:300;padding:40px;">You Need to be Signed In to View This Page.</h3>
      <v-layout style="padding:25px;">
        <v-spacer></v-spacer>
        <v-flex>
          <v-btn @click="goto('/login')" color="primary">Sign in</v-btn>
        </v-flex>
        <v-flex>
          <v-btn @click="goto('/signup')" flat>Register</v-btn>
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
  methods: {
    goto(route) {
      this.$router.push({
        path: route,
        query: { redirect: this.$route.path }
      });
    }
  },
  computed: {
    userSignedIn() {
      return !this.$store.getters["user/getIsSignedIn"];
    }
  }
};
</script>
