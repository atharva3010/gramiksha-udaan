// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import {
  store
} from "./store";
import "@/scripts/firebase";
import AlertCmp from "./components/Shared/Alert.vue";
import divider from "./components/Shared/divider.vue";
import signout from "./components/Shared/signedout.vue";
Vue.use(Vuetify);
Vue.component("app-alert", AlertCmp);
Vue.component("Divider", divider);
Vue.component('signedout', signout);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: {
    App
  },
  template: "<App/>"
});
