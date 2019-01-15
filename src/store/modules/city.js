import { db } from "@/scripts/firebase";

export default {
  namespaced: true,
  state: {
    schools: [],
    city: "",
    cities: [],
    loading: {
      cities: false
    },
    imageUrl: {
      Laxmangarh: "/static/images/cities/Laxmangarh.jpg",
      Jaipur: "/static/images/cities/Jaipur.jpg",
      Delhi: "/static/images/cities/Delhi2.jpg",
      Indore: "/static/images/cities/Indore.jpg",
      Gwalior: "/static/images/cities/Gwalior.jpg",
      Bhopal: "/static/images/cities/Bhopal.jpg"
    }
  },
  mutations: {
    setSchools(state, payload) {
      state.schools = payload;
    },
    addSchool(state, payload) {
      db.collection("cities/" + payload + "/schools")
        .doc(payload.name)
        .set({
          address: payload.address,
          total: payload.total
        });
    },
    getAllSchools(state) {
      state.cities = [];
      state.loading["cities"] = true;
      db.collection("cities")
        .get()
        .then(function(result) {
          result.docs.forEach(city => {
            db.collection("cities/" + city.id + "/schools")
              .get()
              .then(function(schoolsResult) {
                var schools = [];
                schoolsResult.docs.forEach(school => {
                  schools.push(school.id);
                });

                state.cities.push({
                  name: city.id,
                  description: city.data().description,
                  imgURL: state.imageUrl[city.id],
                  schools: schools
                });
              });
          });
          state.loading["cities"] = false;
        });
    }
  },
  actions: {
    addSchooltoCurrentCity({ commit }, newschooldata) {
      commit("addSchool", state.city, newschooldata);
    },
    getSchoolFromCurrentCity({ commit }) {
      commit("getSchools", state.city);
    },
    getSchools({ commit }, payload) {
      db.collection("cities/" + payload + "/schools")
        .get()
        .then(result => {
          var schools = [];
          result.docs.forEach(element => {
            schools.push({
              ...element.data(),
              ...{
                name: element.id
              }
            });
          });
          commit("setSchools", schools);
        });
    },
    addSchool({ commit }, cityname, newschooldata) {
      commit("addSchool", cityname, newschooldata);
    },
    getAllSchools({ commit }) {
      commit("getAllSchools");
    }
  },
  getters: {
    getCities(state) {
      return state.cities;
    },
    getSchools(state) {
      return state.schools;
    },
    getLoading(state) {
      return state.loading;
    }
  }
};
