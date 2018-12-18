import Vue from "vue";
import VuexPersist from "vuex-persist";
import Vuex from "vuex";
import user from "./modules/userModule.js";
import school from "./modules/schoolModule.js";
import students from "./modules/students.js";
Vue.use(Vuex);
const vuexPersist = new VuexPersist({
  storage: window.localStorage
});

export const store = new Vuex.Store({
  // plugins: [vuexPersist.plugin],
  modules: {
    user,
    school,
    students
  }
});
