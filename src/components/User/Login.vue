<template>
  <v-container>
    <v-layout row v-if="error">
      <v-flex xs12 sm6 offset-sm3>
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex sx12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container>
              <v-card-title>
                <h1>Log in</h1>
              </v-card-title>
              <v-form ref="loginForm" v-model="loginValid" @submit.prevent="OnSignin">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      :rules="[rules.required]"
                      label="Username or Email"
                      id="email"
                      v-model="email"
                      type="text"
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      :rules="[rules.required]"
                      label="Password"
                      id="password"
                      v-model="password"
                      type="password"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-btn type="submit" :disabled="loading" :loading="loading">Log In</v-btn>
                    <v-btn :disabled="loading" @click="clearFields">Clear</v-btn>
                  </v-flex>
                </v-layout>
              </v-form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      loginValid: true,
      rules: {
        required: v => !!v || "Required"
      }
    };
  },
  created() {
    if (this.$store.getters["user/getIsSignedIn"])
      this.$router.push("/dashboard");
  },
  computed: {
    userSignedIn() {
      return this.$store.getters["user/getIsSignedIn"];
    },
    error() {
      return this.$store.getters["user/error"];
    },
    loading() {
      return this.$store.getters["user/loading"];
    }
  },
  watch: {
    userSignedIn(value) {
      this.$router.push(
        decodeURIComponent(this.$route.query.redirect) || "/dashboard"
      );
    }
  },
  methods: {
    clearFields() {
      this.$refs.loginForm.reset();
    },
    OnSignin() {
      var validate = this.$refs.loginForm.validate();
      if (!validate) return;
      this.$store.dispatch("user/SignUserIn", {
        email: this.email,
        password: this.password
      });
    },
    onDismissed() {
      this.$store.dispatch("user/clearError");
    }
  }
};
</script>
