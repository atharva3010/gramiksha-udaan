<template>
  <v-dialog persistent v-model="dialog" width="450">
    <v-card>
      <v-card-title
        primary-title
        style="background-color: indigo;"
        class="white--text headline"
      >Please Log In.</v-card-title>
      <v-card-text>
        <h3 style="font-weight:300;padding:40px;">You Need to be Signed In to View This Page.</h3>
      </v-card-text>
      <v-card-actions>
        <v-btn class="ml-3 mb-2" @click="goto('/login')" color="primary">Sign in</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["dialog"],
  data() {
    return { rs: true };
  },
  created() {
    let _this = this;
  },
  methods: {
    goto(route) {
      this.$router.push({
        path: route,
        query: { redirect: this.$route.path }
      });
    }
  }
};
</script>
