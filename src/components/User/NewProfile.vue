<template>
  <v-container grid-list-md>
    <v-snackbar v-model="snackbar" :timeout="5000">
      {{ message }}
      <v-btn color="pink" flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <div class="text-xs-center display-2 font-weight-light text-capitalize pb-5">Profile</div>
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
    <v-layout column wrap>
      <v-flex xs12 class="text-xs-center pb-2">
        <img
          v-if="user.profilePic !== undefined && user.profilePic !== ''"
          :src="user.profilePic"
          width="150"
          alt
        >
        <img v-else src="/static/images/profile/profile.svg" width="150" alt>
        <br>
        <v-btn color="primary" @click="uploadCard=true">Edit Profile Picture</v-btn>
        <v-dialog v-model="uploadCard" width="525">
          <v-card id="upload" dark wrap>
            <v-card-title class="font-weight-light display-1">
              <div v-if="selectedFile === null">Please select a file to upload.</div>
              <div v-else>{{selectedFile.name}}</div>
            </v-card-title>
            <v-card-text>
              <input
                type="file"
                @change="onFileSelected"
                accept="image/*"
                ref="fileInput"
                style="display:none"
              >
            </v-card-text>
            <v-card-actions>
              <v-btn
                @click="$refs.fileInput.click()"
                v-if="selectedFile === null"
                color="purple"
                class="left mb-3"
                dark
              >Pick File</v-btn>
              <v-btn
                color="green"
                :loading="profilePicLoading"
                class="mb-3"
                v-else
                dark
                @click="onUpload"
              >Upload</v-btn>
              <v-spacer></v-spacer>
              <v-btn
                color="blue"
                class="mb-3"
                :disabled="profilePicLoading"
                v-if="selectedFile !== null"
                dark
                @click="selectedFile=null;"
              >Clear Files</v-btn>
              <v-btn
                color="red"
                :disabled="profilePicLoading"
                class="mb-3"
                dark
                @click="uploadCard=false; selectedFile=null;"
              >Cancel</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>
      <v-flex xs6>
        <v-layout row wrap>
          <v-flex sm9 class="pb-3">
            <h1 class="font-weight-light display-1 pb-3 pt-3">Basic Information:</h1>
          </v-flex>
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
          <v-flex xs12 sm6 class="pb-3">
            <h4 class="title font-weight-regular">
              Email:
              <span class="blue--text text--darken-3">{{user.email}}</span>
            </h4>
          </v-flex>
          <v-flex sm6>
            <v-btn dark color="red" @click="passwordDialog = true">Update Password</v-btn>
          </v-flex>
          <v-layout row wrap>
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="date"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            ></v-menu>
            <v-flex sm3 class="pb-3">
              <v-dialog
                ref="dialog"
                v-model="modal"
                :return-value.sync="date"
                persistent
                lazy
                full-width
                width="290px"
              >
                <v-text-field
                  slot="activator"
                  v-model="date"
                  label="Date of Birth"
                  prepend-icon="event"
                  persistent-hint
                  hint="YYYY/MM/DD format"
                ></v-text-field>
                <v-date-picker v-model="date" scrollable reactive color="purple">
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                  <v-btn flat color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                </v-date-picker>
              </v-dialog>
            </v-flex>
          </v-layout>
        </v-layout>
      </v-flex>
    </v-layout>

    <v-dialog v-model="passwordDialog" dark persistent max-width="300px">
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
              @click.prevent="saveNewPassword"
            >Save</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
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
      selectedFile: null,
      uploadCard: false,
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      passwordDialog: false,
      changePassword: {
        old: "",
        new: "",
        reNew: ""
      },
      snackbar: false,
      passwordLoading: false,
      profilePicLoading: false,
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
    async onUpload() {
      this.profilePicLoading = true;
      var _this = this;
      var user = this.$auth.currentUser;
      var file = this.selectedFile;
      // console.log(file);
      // Create a Storage Ref w/ username
      var storageRef = this.$storage.ref(
        "/profilePictures/" + user.email + "/profilepic.jpg"
      );

      // Upload file
      var task = await storageRef.put(file);
      var dURL = await storageRef.getDownloadURL();
      await this.$store.dispatch("user/updateUserDetails", {
        profilePic: dURL
      });
      _this.profilePicLoading = false;
      _this.selectedFile = null;
      _this.uploadCard = false;
      _this.$store.dispatch("setAlert", "Profile picture added successfully.");
    },
    onFileSelected(event) {
      console.log("fired");
      this.selectedFile = event.target.files[0];
    },
    closePasswordDialog() {
      this.$refs.changePasswordForm.reset();
      this.changePassword.old = "";
      this.changePassword.new = "";
      this.changePassword.reNew = "";
      this.passwordDialog = false;
    },
    saveNewPassword(event) {
      if (this.changePassword.new != this.changePassword.reNew) {
        this.snackbar = true;
        this.message = "Both Passwords don't match.";
        return;
      } else if (
        this.changePassword.new == "" ||
        this.changePassword.old == ""
      ) {
        this.snackbar = true;
        this.message = "Fill All Fields";
        return;
      } else {
        this.passwordLoading = true;
        this.$store
          .dispatch("user/updatePassword", this.changePassword)
          .then(() => {
            this.message = "Password updated successfully.";
            this.snackbar = true;
            this.passwordLoading = false;
            this.passwordDialog = false;
          })
          .catch(error => {
            this.message = error.message;
            this.snackbar = true;
            this.passwordLoading = false;
          });
      }
    }
  }
};
</script>

<style>
#upload {
  padding: 15px;
  margin: 15px;
}
</style>
