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
              <h1 class="font-weight-light display-2">Sign Up</h1>
              <v-form v-model="formValid" ref="signUpForm" @submit.prevent="OnSignup">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      label="Name"
                      :rules="[rules.empty]"
                      id="name"
                      v-model="name"
                      type="text"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <!-- <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      label="Email"
                      id="email"
                      v-model="email"
                      type="email"
                      :rules="[rules.empty, validateEmail]"
                    ></v-text-field>
                  </v-flex>
                </v-layout>-->
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      label="Username"
                      id="username"
                      v-model="username"
                      type="text"
                      :rules="[rules.empty,checkUsername]"
                      :error="usernameError"
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      autocomplete="off"
                      label="Password"
                      id="password"
                      v-model="password"
                      type="password"
                      :rules="[rules.empty]"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      label="Confirm password"
                      id="cnpassword"
                      autocomplete="off"
                      v-model="cnpassword"
                      :rules="[rules.empty]"
                      type="password"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <!-- <v-layout row>
                  <v-flex xs12>
                    <v-select
                      :items="cities"
                      label="Select City"
                      v-model="city"
                      :rules="[rules.empty]"
                    ></v-select>
             
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      label="Post"
                      id="ngopost"
                      :rules="[rules.empty]"
                      v-model="ngopost"
                      type="text"
                    ></v-text-field>
                  </v-flex>
                </v-layout>-->
                <v-layout row>
                  <v-flex xs12>
                    <v-btn type="submit" :disabled="loading" :loading="loading">Sign up</v-btn>
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
import firebase from "firebase/app";
export default {
  data() {
    return {
      email: "",
      name: "",
      formValid: true,
      usernameHint: "",
      password: "",
      cnpassword: "",
      usernameError: false,
      username: "",

      usernames: [],
      rules: {
        empty: v => !!v || "Required"
      }
    };
  },
  created() {
    this.email = this.$route.params.email;
    if (this.$store.getters["user/getIsSignedIn"]) this.$router.push("/");
    firebase
      .firestore()
      .collection("users")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.usernames.push(doc.id);
        });
      });
    console.log(this.usernames);
    this.$store.dispatch["user/getCities"];
  },
  computed: {
    comparepass() {
      return this.password !== this.cnpassword ? "Password Do not match" : true;
    },
    validateEmail() {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(this.email).toLowerCase()) == false
        ? "Invalid Email"
        : true;
    },
    error() {
      return this.$store.getters["user/error"];
    },
    loading() {
      return this.$store.getters["user/loading"];
    }
  },
  methods: {
    clearFields() {
      this.$refs.signUpForm.reset();
    },
    OnSignup() {
      if (!this.checkUsername) return;
      let validate = this.$refs.signUpForm.validate();
      if (!validate) return;
      this.$store.dispatch("user/SignUserup", {
        name: this.name,
        password: this.password,
        username: this.username,
        email: this.email
      });
      if (!this.loading) this.$router.push("/");
    },
    checkUsername() {
      for (let i = 0; i < this.usernames.length; i++) {
        if (this.usernames[i] === this.username) {
          console.log(this.usernames[i], this.username);
          return "Username already taken";
        }
      }
      return true;
    },
    onDismissed() {
      this.$store.dispatch("user/clearError");
    }
  }
};
</script>
