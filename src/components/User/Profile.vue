<template>
  <v-container grid-list-md>
    <div class="text-xs-center display-2 font-weight-light text-capitalize">
      Profile
    </div>
    <v-layout row wrap>
      <h1>{{user.name}}</h1>
      <v-flex xs12 lg5 mb-3>
        <v-expansion-panel popout>
          <v-expansion-panel-content
            v-for="(item,i) in 5"
            :key="i"
          >
            <div slot="header">Name</div>
            <v-card>
              <v-card-text>Edit Information</v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
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
