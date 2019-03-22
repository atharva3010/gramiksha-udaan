<template>
  <v-app>
    <v-navigation-drawer
      class="nav-drawer"
      fixed
      clipped
      temporary
      hide-overlay
      dark
      enable-resize-watcher
      persistant
      v-model="isDrawer"
      left
    >
      <v-list class="pa-0">
        <v-list-tile avatar v-if="userSignedIn">
          <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <!-- <v-list-tile-title>{{user.email}}</v-list-tile-title> -->
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-for="item in menuItems" :key="item.title" :to="item.link">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content class="font-weight-regular subheading">{{ item.title }}</v-list-tile-content>
        </v-list-tile>
        <!-- <v-list-group prepend-icon="dashboard" value="true">
          <v-list-tile slot="activator" to="/">
            <v-list-tile-title class="font-weight-regular subheading">Dashboard</v-list-tile-title>
          </v-list-tile>
          <v-list-tile to="/school">
            <v-list-tile-title class="font-weight-regular subheading">School</v-list-tile-title>
            <v-list-tile-action>
              <v-icon>school</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-group>-->
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed dark>
      <v-toolbar-side-icon @click="isDrawer=!isDrawer"></v-toolbar-side-icon>
      <v-btn icon @click="back">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-btn icon @click="forward">
        <v-icon>arrow_forward</v-icon>
      </v-btn>
      <v-toolbar-title class="font-weight-regular" v-if="!isMob">Gramiksha - Udaan</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items v-if="!isMob">
        <v-btn @click="goto('/')">Home
          <v-icon right>home</v-icon>
        </v-btn>
        <v-btn @click="goto('/profile')" v-if="userSignedIn">Profile
          <v-icon right>person</v-icon>
        </v-btn>
        <v-btn v-if="userSignedIn" @click="logout">Logout
          <v-icon right>power_settings_new</v-icon>
        </v-btn>
        <v-btn to="/login" v-if="!userSignedIn">Sign In
          <v-icon right>exit_to_app</v-icon>
        </v-btn>
      </v-toolbar-items>
      <v-toolbar-items v-else>
        <v-btn icon @click="goto('/')">
          <v-icon>home</v-icon>
        </v-btn>
        <v-btn icon  @click="goto('/profile')" v-if="userSignedIn">
          <v-icon>person</v-icon>
        </v-btn>
        <v-btn icon v-if="userSignedIn" @click="logout">
          <v-icon>power_settings_new</v-icon>
        </v-btn>
        <v-btn icon @click="goto('/login')" v-if="!userSignedIn">
          <v-icon>exit_to_app</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <main :style="padStyle">
      <v-container>
        <div id="app">
          <h2 class="display-2 font-weight-light text-xs-center" v-if="isMob">Udaan</h2>
          <router-view/>
        </div>
      </v-container>
    </main>
    <v-footer fixed class="pa-3" dark>
      <img
        src="../static/download.png"
        style="width:20px;height:20px;border-radius:50%;margin:10px;"
      >
      <div>Gramiksha</div>
      <v-spacer></v-spacer>
      <div>&copy; {{ new Date().getFullYear() }} All rights Reserved.</div>
    </v-footer>
  </v-app>
</template>

<style lang="sass">
@import './sass/style'
</style>


<script>
import Alert from "@/components/Global/Alert";
import firebase from "firebase/app";
import "firebase/auth";
export default {
  data() {
    return {
      isDrawer: true,
      toolbarMargin: "",
      isMob: false,
      padStyle: "padding-left: 0",
      userSignedIn: false,
      user: null
    };
  },
  components: {
    "app-alert": Alert
  },
  mounted() {
    this.onResize();
    var _this = this;
    window.addEventListener("resize", this.onResize, { passive: true });
    this.$auth.onAuthStateChanged(function(user) {
      if (user) {
        user.name = "";
        _this.userSignedIn = true;
        _this.user = user;
      } else {
        _this.userSignedIn = false;
        _this.user = null;
      }
    });
  },

  computed: {
    menuItems() {
      let menuItems = [
        {
          icon: "lock_open",
          title: "Sign in",
          link: "/login"
        }
      ];
      if (this.userSignedIn) {
        menuItems = [];
      }
      return menuItems;
    }
  },
  watch: {
    isDrawer(value) {
      if (value == true && this.isMob) {
        this.padStyle = "padding-left: 0";
      } else if (value == true && !this.isMob) {
        this.padStyle = "padding-left: 300px";
      } else if (value == false) {
        this.padStyle = "padding-left: 0";
      }
    }
  },
  methods: {
    onResize() {
      this.isMob = window.innerWidth < 600;
    },
    goto(route) {
      this.$router.push(route);
    },
    logout() {
      let _this = this;
      this.$auth
        .signOut()
        .then(function() {
          _this.userSignedIn = false;
          _this.user = null;
          _this.$router.push("/login");
        })
        .catch(function(error) {
          alert("Error");
        });
    },
    back() {
      this.$router.go(-1);
    },
    forward() {
      this.$router.go(1);
    }
  }
};
</script>

