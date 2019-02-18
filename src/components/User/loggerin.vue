<template>
  <v-container>
    <v-layout>
      <v-flex sx12 sm6 offset-sm3>
        <v-card>
          <h2 style="text-align:center;padding: 50px;" class="font-weight-thin">
            <div class="sk-folding-cube">
              <div class="sk-cube1 sk-cube"></div>
              <div class="sk-cube2 sk-cube"></div>
              <div class="sk-cube4 sk-cube"></div>
              <div class="sk-cube3 sk-cube"></div>
            </div>Signing You In
          </h2>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  created() {
    this.$store
      .dispatch("user/logout")
      .then(() => {
        return this.$store.dispatch(
          "user/signInWithLink",
          this.$route.params.email
        );
      })
      .then(() => {
        this.$router.push("/signup/" + this.$route.params.email);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
