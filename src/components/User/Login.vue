<template>
    <v-container>
         <v-layout row  v-if="error">
      <v-flex xs12 sm6 offset-sm3>
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
      </v-flex>
    </v-layout>
        <v-layout>
            <v-flex sx12 sm6 offset-sm3>
                <v-card>
                    
                <v-card-text>
                    <v-container>
                    <v-card-title><h1> Log in</h1></v-card-title>
                        <form @submit.prevent="OnSignin"
                        > 
                            <v-layout row>
                                <v-flex xs12>
                                <v-text-field
                                label="Username or Email"
                                id="email"
                                v-model="email"
                                type="text"
                                
                                required
                                ></v-text-field>
                                </v-flex>

                            </v-layout>
                            

                             <v-layout row>
                                <v-flex xs12>
                                <v-text-field
                                label="Password"
                                id="password"
                                v-model="password"
                                type="password"
                                required
                                ></v-text-field>
                                </v-flex>
                             </v-layout>
                                <v-layout row>
                                <v-flex xs12>
                               <v-btn type="submit" :disabled="loading" :loading="loading">
                                  Log In
                       <span slot="loader" class="custom-loader">
                        <v-icon light>cached</v-icon>
                       </span>
                    </v-btn>
                                </v-flex>

                            </v-layout>
                            

                        </form>

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
      password: ""
    };
  },
  computed: {
    userSignedIn() {
      return this.$store.getters["user/getIsSignedIn"].isSignedIn;
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
      if (value) this.$router.push("/dashboard");
    }
  },
  methods: {
    OnSignin() {
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
