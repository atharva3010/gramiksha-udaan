<template>
    <v-container>
        
        <v-layout>
            <v-flex sx12 sm6 offset-sm3>
                <v-card>
                    
                <v-card-text>
                    <v-container>
                    <v-card-title><h1> Sign Up</h1></v-card-title>
                        <form @submit.prevent="OnSignup"
                        >
                            <v-layout row>
                                <v-flex xs12>
                                <v-text-field
                                label="Email"
                                id="email"
                                v-model="email"
                                type="email"
                                required
                                ></v-text-field>
                                </v-flex>

                            </v-layout>
                             <v-layout row>
                                <v-flex xs12>
                                <v-text-field
                                label="Username"
                                id="username"
                                v-model="username"
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
                                <v-text-field
                                label="Confirm password"
                                id="cnpassword"
                                v-model="cnpassword"
                                :rules="[comparepass]"
                                type="password"
                                ></v-text-field>
                                </v-flex>

                            </v-layout>
                                 <v-layout row>
                                <v-flex xs12>
                              <v-btn type="sumbit">Submit</v-btn>
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
  data () {
    return {
      email: '',
      password: '',
      cnpassword: '',
      username: ''
    }
  },
  computed: {
    comparepass () {
      return this.password !== this.cnpassword ? 'Password Do not match' : true
    }
  },
  methods: {
    OnSignup () {
      this.$store.dispatch('SignUserup', {email: this.email, password: this.password})
    }
  }
}
</script>
