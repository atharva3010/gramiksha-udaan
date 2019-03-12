<template>
  <v-container>
    <v-snackbar v-model="snackbar" :timeout="5000">
      {{ message }}
      <v-btn color="pink" flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <v-layout>
      <v-flex sx12 sm6 offset-sm3>
        <v-card>
          <v-container>
            <h1 class="font-weight-light display-2">Add User</h1>
            <v-form>
              <v-layout style="margin:10px 0" row>
                <v-flex xs12>
                  <v-text-field
                    :rules="[rules.required,isEmailValid]"
                    label="Email"
                    id="email"
                    v-model="email"
                    type="text"
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-btn @click="addUser" :disabled="loading" :loading="loading">Add Program coordinator</v-btn>
            </v-form>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      isEmailValid: true,
      email: "",
      rules: {
        required: v => !!v || "Required"
      },
      snackbar: false,
      message: ""
    };
  },
  methods: {
    addUser() {
      this.loading = true;
      this.snackbar = false;
      this.message = "";
      this.$store
        .dispatch("user/addUser",{email: this.email,post:"prog"})
        .then(() => {
          this.loading = false;
          this.snackbar = true;
          this.email = "";
          this.message = "Invite Sent";
        })
        .catch(err => {
          this.loading = false;
          if (err === "This Email Belongs to another User") {
            this.isEmailValid = "Email Already Exists";
          } else {
            this.snackbar = true;
            this.message = err;
          }
        });
    }
  }
};
</script>

