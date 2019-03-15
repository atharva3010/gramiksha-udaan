// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import { store } from "./store";
import "@/scripts/firebase";
import AlertCmp from "./components/Shared/Alert.vue";
import divider from "./components/Shared/divider.vue";
import signout from "./components/Shared/signedout.vue";
// Require Froala Editor js file.
require("froala-editor/js/froala_editor.pkgd.min");

// Require Froala Editor css files.
require("froala-editor/css/froala_editor.pkgd.min.css");
require("font-awesome/css/font-awesome.css");
require("froala-editor/css/froala_style.min.css");

// Import and use Vue Froala lib.
import VueFroala from "vue-froala-wysiwyg";
import VueProgressiveImage from "vue-progressive-image";

Vue.use(VueFroala);
Vue.use(VueProgressiveImage, {
  cache: false
});
Vue.use(Vuetify);
Vue.component("app-alert", AlertCmp);
Vue.component("Divider", divider);
Vue.component("signedout", signout);
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
