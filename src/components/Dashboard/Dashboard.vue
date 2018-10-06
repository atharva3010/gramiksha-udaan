<template>
  <div>
    <h1>Dashboard</h1>
    <h1> {{user.name}} </h1><h3> ( {{ user.username }} ) </h3>
    <br>
    <h2>
      {{user.ngopost}}
      </h2>
    <v-layout>
      <programhead></programhead>
    </v-layout>
  </div>
</template>

<script>
import ProgramHead from "./ProgramHead";
export default {
  name: "Dashboard",
  components: {
    programhead: ProgramHead
  },
  computed: {
    user() {
      return this.$store.getters["user/getIsSignedIn"].user;
    }
  }
};
</script>
