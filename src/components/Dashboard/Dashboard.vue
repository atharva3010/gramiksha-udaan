<template>
  <div>
    <h1 class="font-weight-regular">Dashboard</h1>
    <h1 class="font-weight-thin">{{user.name}}</h1>
    <h3 class="font-weight-thin">( {{ user.username }} )</h3>
    <br>
    <h2 class="font-weight-regular">{{user.ngopost}}</h2>
    <br>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  computed: {
    user() {
      return this.$store.getters["user/getUserDetails"];
    }
  }
};
</script>
