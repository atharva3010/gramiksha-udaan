import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/userModule.js";
import school from "./modules/schoolModule.js";
import students from "./modules/students.js";
Vue.use(Vuex);
export const store = new Vuex.Store({
  modules: {
    user,
    school,
    students
  }
});
