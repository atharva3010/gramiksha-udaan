<template>
  <v-container>
    <v-snackbar v-model="snackbar" :timeout="5000">
      {{ message }}
      <v-btn color="pink" flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>
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
              <h1 class="font-weight-light display-2">Login</h1>
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

                <v-dialog v-model="forgotDialog" dark style="padding:15px 0" max-width="400px">
                  <v-card>
                    <v-form ref="changePasswordForm" @submit.prevent>
                      <v-card-title>
                        <h2 class="headline">Change Password</h2>
                      </v-card-title>
                      <v-card-text>
                        <v-layout row wrap>
                          <v-flex xs12>
                            <p>We'll send you an Email with the Password reset Link.</p>
                          </v-flex>
                        </v-layout>

                        <v-layout row wrap>
                          <v-flex xs12>
                            <v-text-field v-model="user" label="Email or Username"></v-text-field>
                          </v-flex>
                        </v-layout>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn :disabled="loading" @click="forgotDialog=false">Close</v-btn>
                        <v-btn
                          type="submit"
                          :loading="loadingReset"
                          :disabled="loadingReset"
                          @click.prevent="resetPassword"
                        >Send Email</v-btn>
                      </v-card-actions>
                    </v-form>
                  </v-card>
                </v-dialog>
                <v-layout row>
                  <v-spacer></v-spacer>
                  <v-btn
                    color=" primary"
                    flat
                    @click="forgotDialog=true"
                    :disabled="loadingReset"
                    :loading="loadingReset"
                  >Forgot Password</v-btn>
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
      loadingReset: false,
      user: "",
      forgotDialog: false,
      email: "",
      password: "",
      loginValid: true,
      snackbar: false,
      message: "",
      rules: {
        required: v => !!v || "Required"
      }
    };
  },
  created() {
    if (this.$store.getters["user/getIsSignedIn"]) this.$router.push("/");
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
      this.$router.push(decodeURIComponent(this.$route.query.redirect) || "/");
    }
  },
  methods: {
    resetPassword() {
      this.snackbar = false;
      this.loadingReset = true;
      if (this.user == "") {
        this.loadingReset = false;
        this.snackbar = true;
        this.message = "Please Enter user id";
      } else {
        this.$store
          .dispatch("user/resetPassword", this.user)
          .then(() => {
            this.snackbar = true;
            this.message = "Email Sent Successfully";
            this.forgotDialog = false;
            this.loadingReset = false;
          })
          .catch(error => {
            console.log(error);
            this.snackbar = true;
            this.message = error;
            this.loadingReset = false;
          });
      }
    },
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
