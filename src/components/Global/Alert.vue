<template lang="html">
  <v-snackbar class="alert"
    v-model="open" @click="$router.push(alert.click_action)"
    bottom right color="green"
    multi-line
    :timeout="timeout">
  {{ alert }}
  </v-snackbar>
</template>

<script>
export default {
  data() {
    return {
      timeout: 5000
    };
  },
  computed: {
    alert() {
      return this.$store.getters.getAlert;
    },
    open() {
      return this.$store.getters.getAlert !== null;
    }
  },
  watch: {
    alert(data) {
      if (data) {
        setTimeout(() => {
          this.$store.dispatch("clearAlert");
        }, 5000);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.alert {
  transition: 0.2s all;
  &:hover {
    cursor: pointer;
    opacity: 0.9;
  }
}
</style>
