<template>
  <v-container grid-list-md>
    <v-snackbar v-model="snackbar" :timeout="5000">
      {{ message }}
      <v-btn color="pink" flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <div class="text-xs-center display-2 font-weight-light text-capitalize">Profile</div>
    <!-- <v-layout justify-space-between justify-space-around align-center wrap>
      <v-flex xs12 sm6 md4>
        <div style="margin:10px;">
          <v-card width="100%">
            <div style="margin:10px; padding:10px;">
              <h1>
                Name: 
              </h1>
              <h1> 
                {{user.name}}
              </h1>
              <br>
              <input v-model="Name" placeholder="Enter a new Name">
            </div>
          </v-card>
        </div>
      </v-flex>
    </v-layout>-->
    <v-layout row wrap>
      <v-flex sm3 class="mt-5">
        <img src="/static/images/profile/profile_man.png" width="200" alt>
      </v-flex>
      <v-flex sm9 class="mt-5">
        <v-layout row wrap>
          <v-flex xs12 sm6 class="pb-3">
            <h3 class="title font-weight-regular">
              Name:
              <span class="blue--text text--darken-3">{{user.name}}</span>
            </h3>
          </v-flex>
          <v-flex xs12 sm6 class="pb-3">
            <h4 class="title font-weight-regular">
              Post:
              <span class="blue--text text--darken-3">{{user.ngopost}}</span>
            </h4>
          </v-flex>
          <v-flex xs12 sm6 class="pb-3">
            <h4 class="title font-weight-regular">
              City:
              <span class="blue--text text--darken-3">{{user.city}}</span>
            </h4>
          </v-flex>
          <v-flex xs12 sm6 class="pb-3">
            <h4 class="title font-weight-regular">
              Username:
              <span class="blue--text text--darken-3">{{ user.username }}</span>
            </h4>
          </v-flex>
          <v-flex xs12 class="pb-3">
            <h4 class="title font-weight-regular">
              Email:
              <span class="blue--text text--darken-3">{{user.email}}</span>
            </h4>
          </v-flex>
          <!-- <v-flex xs6>
            <v-btn dark @click="passwordDialog = true">Update Password</v-btn>
          </v-flex>-->
        </v-layout>
      </v-flex>
    </v-layout>

    <!-- <v-dialog v-model="passwordDialog" dark persistent max-width="300px">
      <v-card>
        <v-form ref="changePasswordForm" @submit.prevent="saveNewPassword">
          <v-card-title>
            <h2 class="headline">Change Password</h2>
          </v-card-title>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field
                  label="Old Password"
                  hint="Enter Current Password"
                  :rules="[rules.required, rules.min]"
                  v-model="changePassword.old"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  label="New Password"
                  autocomplete="off"
                  :append-icon="!showPassword ? 'visibility_off' : 'visibility'"
                  :type="showPassword ? 'text' : 'password'"
                  hint="Enter New Password"
                  :rules="[rules.required, rules.min]"
                  v-model="changePassword.new"
                  @click:append="showPassword = !showPassword"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  label="New Password Again"
                  autocomplete="off"
                  :append-icon="!showPassword ? 'visibility_off' : 'visibility'"
                  :type="showPassword ? 'text' : 'password'"
                  hint="Enter New Password Again"
                  :rules="[rules.required, rules.min, rules.repassword]"
                  v-model="changePassword.reNew"
                  @click:append="showPassword = !showPassword"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn :disabled="passwordLoading" @click="closePasswordDialog">Close</v-btn>
            <v-btn
              type="submit"
              :loading="passwordLoading"
              :disabled="passwordLoading"
              @click="saveNewPassword"
            >Save</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>-->
  </v-container>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.getters["user/getUserDetails"];
    }
  },
  data() {
    return {
      passwordDialog: false,
      changePassword: {
        old: "",
        new: "",
        reNew: ""
      },
      snackbar: false,
      passwordLoading: false,
      message: "",
      showPassword: false,
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 6 || "Min 6 characters",
        repassword: value =>
          value == this.changePassword.new || "Both Passwords must be same.",
        name: value =>
          value.trim().split(" ").length > 1 || "Enter Last Name too",
        emailRules: [
          v => !!v || "E-mail is required",
          v => /.+@.+/.test(v) || "E-mail must be valid"
        ]
      }
    };
  },
  methods: {
    closePasswordDialog() {
      this.$refs.changePasswordForm.reset();
      this.changePassword.old = "";
      this.changePassword.new = "";
      this.changePassword.reNew = "";
      this.passwordDialog = false;
    },
    saveNewPassword() {
      var self = this;
      if (this.changePassword.new != this.changePassword.reNew) {
        this.message = "Both Passwords don't match.";
        return;
      }
      this.passwordLoading = true;
      this.$store
        .dispatch("user/updatePassword", this.changePassword)
        .then(function() {
          self.message = "Password updated successfully.";
          self.snackbar = true;
          self.passwordLoading = false;
        })
        .catch(function(error) {
          self.message = error.message;
          self.snackbar = true;
          self.passwordLoading = false;
        });
    }
  }
};
</script>

<style>
</style>
