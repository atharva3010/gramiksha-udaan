<template>
  <v-container grid-list-md>
    <div class="text-xs-center display-2 font-weight-light text-capitalize">Profile</div>
    <v-layout justify-space-between justify-space-around align-center wrap>
      <v-flex xs12 sm6 md4>
        <div style="margin:10px;">
          <v-card width="100%">
            <div style="margin:10px; padding:10px;">
              <h1>
                Name: 
              </h1>
              <h1> 
                {{user.name}}
              </h1>
              <br>
              <input v-model="Name" placeholder="Enter a new Name">
            </div>
          </v-card>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.getters["user/getUserDetails"];
    }
  }
}
</script>

<style>

</style>
