<template>
  <v-app>
    <v-layout row>
      <v-flex>
        
        <v-navigation-drawer style="z-index:1" class="nav-drawer" absolute clipped permanent dark persistant v-if="isDrawer">
          <v-toolbar class="transparent" flat>
            <v-list class="pa-0">
              <v-list-tile avatar v-if="userSignedIn">
                <v-list-tile-avatar>
                  <img src="https://randomuser.me/api/portraits/men/85.jpg">
                </v-list-tile-avatar>
  
                <v-list-tile-content>
                  <v-list-tile-title>{{user.name}}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile v-for="item in menuItems" :key="item.title" :to="item.link">
                <v-list-tile-action>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>{{ item.title }}</v-list-tile-content>
              </v-list-tile>
              <v-list-group prepend-icon="dashboard" value="true">
                <v-list-tile slot="activator">
                  <v-list-tile-title>Dashboard</v-list-tile-title>
                </v-list-tile>
                <v-list-tile to="/dashboard/school">
                  <v-list-tile-title>School</v-list-tile-title>
                  <v-list-tile-action>
                    <v-icon>school</v-icon>
                  </v-list-tile-action>
                </v-list-tile>
              </v-list-group>
            </v-list>
          </v-toolbar>
        </v-navigation-drawer>

      </v-flex>
      <v-flex xs12>
        <v-toolbar fixed dark>
          <v-toolbar-side-icon @click="isDrawer=!isDrawer"> </v-toolbar-side-icon>
          <v-toolbar-title class="font-weight-regular">
            Gramiksha - Udaan<span v-if="userSignedIn">, {{user.name}}</span>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn>
              Home
              <v-icon right>home</v-icon>
            </v-btn>
            <v-btn>
              Profile
              <v-icon right>person</v-icon>
            </v-btn>
            <v-btn>
              Logout
              <v-icon right>logout</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
  
        <main :style="isDrawer ? {'padding-left': '300px'} : {'padding-left': '0'}">
          <v-container>
            <div id="app">
              <!-- <img src="./assets/logo.png"> -->
              <router-view/>
            </div>
          </v-container>
        </main>
      </v-flex>
    </v-layout>
    <v-footer fixed class="pa-3" dark>
      <img src="../static/download.png" style="width:20px;height:20px;border-radius:50%;margin:10px;">
      <div>Gramiksha</div>
      <v-spacer></v-spacer>
      <div> &copy; {{ new Date().getFullYear() }} All rights Reserved.</div>
    </v-footer>
  </v-app>
</template>

<style>
.nav-drawer {
  margin-top: 64px !important;
}
@media screen and (max-width: 960px) {
  .nav-drawer {
    margin-top: 48px !important;
  }
  main {
    padding: 48px 0;
  }
}
main {
  padding: 64px 0;
}
</style>

<script>
export default {
  name: "App",
  data() {
    return {
      isDrawer: true,
      toolbarMargin: ""
    };
  },
  computed: {
    menuItems() {
      let menuItems = [
        {
          icon: "face",
          title: "Sign up",
          link: "/signup"
        },
        {
          icon: "lock_open",
          title: "Sign in",
          link: "/Login"
        }
      ];
      if (this.userSignedIn) {
        menuItems = [];
      }
      return menuItems;
    },

    userSignedIn() {
      return this.$store.getters["user/getIsSignedIn"].isSignedIn;
    },
    user() {
      return this.$store.getters["user/getIsSignedIn"].user;
    }
  },
  methods: {
    switchDrawer() {
      this.isDrawer != this.isDrawer;
      if (isDrawer) this.toolbarMargin = "margin:left:300px";
    }
  }
};
</script>

