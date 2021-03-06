import Vue from "vue";
import VuexPersist from "vuex-persist";
import Vuex from "vuex";
import user from "./modules/userModule.js";
import school from "./modules/schoolModule.js";
import students from "./modules/students.js";
import city from "./modules/city.js";
import images from "./modules/images.js";
import alert from "./global/alert";
Vue.use(Vuex);
const vuexPersist = new VuexPersist({
  storage: window.localStorage
});

export const store = new Vuex.Store({
  // plugins: [vuexPersist.plugin],
  modules: {
    user,
    school,
    students,
    city,
    images,
    alert
  }
});
