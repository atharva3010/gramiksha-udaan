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
                    <v-card-title><h1> Sign Up</h1></v-card-title>
                        <form @submit.prevent="OnSignup"
                        >   <v-layout row>
                                <v-flex xs12>
                                <v-text-field
                                label="name"
                                id="name"
                                v-model="name"
                                required
                              
                                type="text"
                                ></v-text-field>
                                </v-flex>
                                  </v-layout>
                            <v-layout row>
                                <v-flex xs12>
                                <v-text-field
                                label="Email"
                                id="email"
                                v-model="email"
                                type="email"
                                  :rules="[validateEmail]"
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
                                :rules="[CheckUsername]"
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
                                <v-text-field
                                label="City"
                                id="city"
                                v-model="city"
                                required
                                type="text"
                                ></v-text-field>
                                </v-flex>
                              </v-layout>
                             <v-layout row>
                                <v-flex xs12>
                                <v-text-field
                                label="Post"
                                id="ngopost"
                                v-model="ngopost"
                                required
                                type="text"
                                ></v-text-field>
                                </v-flex>
                                  </v-layout>
                                 <v-layout row>
                                <v-flex xs12>
                               <v-btn type="submit" :disabled="loading" :loading="loading">
                      Sign up
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
  data () {
    return {
      email: '',
      name:'',
      password: '',
      cnpassword: '',
      username: '',
      ngopost: '',
      city:''
    }
  },
  computed: {
    comparepass () {
      return this.password !== this.cnpassword ? 'Password Do not match' : true
      
    },


 validateEmail() {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(String(this.email).toLowerCase())==false ?   'Invalid Email' :true ;
},


    CheckUsername(){
      
          this.$store.dispatch('user/CheckUsename',{username:this.username})
     
         if(this.$store.getters['user/getUserExists'])
          return 'Username Exists'
        else{
            return true
        }
    },
    userSignedUp(){
        return this.$store.getters['user/getIsSignedUp'].isSignedUp
            
    },
      error () {
        return this.$store.getters['user/error']
      },
      loading () {
        return this.$store.getters['user/loading']
      }
  },
  watch:{
      userSignedUp(value){
          if(value)
          this.$router.push('/Signupafter')
      }
  },
  methods: {
    OnSignup () {
      this.$store.dispatch('user/SignUserup', {email: this.email,name:this.name, password: this.password,username: this.username,ngopost:this.ngopost,city:this.city})
    },
     onDismissed () {
        this.$store.dispatch('user/clearError')
      }
  }
}
</script>
