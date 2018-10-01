<template>
  <v-app>
    <v-layout row>
      <v-flex>
        <v-navigation-drawer permanent dark persistant v-if="isDrawer">
          <v-toolbar class="transparent" flat>
              <v-list class="pa-0">
                <v-list-tile style="margin-top:8px;"> 
                  <v-btn @click="isDrawer=!isDrawer" icon><v-icon>close</v-icon></v-btn>
                </v-list-tile>
          <v-list-tile avatar v-if="userSignedIn">
            <v-list-tile-avatar>
              <img src="https://randomuser.me/api/portraits/men/85.jpg">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>{{user.name}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
                  <v-list-tile
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
         <v-list-group
        prepend-icon="dashboard"
        value="true"
      >
        <v-list-tile slot="activator">
          <v-list-tile-title>Dashboard</v-list-tile-title>
        </v-list-tile>
         <v-list-tile
           to="/dashboard/school"
          >
            <v-list-tile-title >School</v-list-tile-title>
            <v-list-tile-action>
              <v-icon >school</v-icon>
            </v-list-tile-action>
          </v-list-tile>
      </v-list-group>
        </v-list>
          </v-toolbar>
        </v-navigation-drawer>
      </v-flex>
      <v-flex xs12>
        <v-toolbar dark>
          <v-toolbar-side-icon v-if="!isDrawer" @click="isDrawer=!isDrawer"> </v-toolbar-side-icon>
          <v-toolbar-title class="font-weight-regular">
            Gramiksha - Udaan<span v-if="userSignedIn">, {{user.name}}</span>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn icon>
              <v-icon>person</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>logout</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
  
  
        <v-container>
          <div id="app">
            <!-- <img src="./assets/logo.png"> -->
            <router-view/>
          </div>
        </v-container>
      </v-flex>
    </v-layout>
    <v-footer class="pa-3" dark>
        <img src="../static/download.png" style="width:20px;height:20px;border-radius:50%;margin:10px;">
        <div>Gramiksha</div>
        <v-spacer></v-spacer>
        <div> &copy; {{ new Date().getFullYear() }} All rights Reserved.</div>
      </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      isDrawer: true
    };
  },
  computed: {
    menuItems() {
      let menuItems = [
        { icon: "face", title: "Sign up", link: "/signup" },
        { icon: "lock_open", title: "Sign in", link: "/Login" }
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
  }
};
</script>
