import { db } from "@/scripts/firebase";

export default {
  namespaced: true,
  state: {
    schools: [],
    city: ""
  },
  mutations: {
    getSchools() {
      db.collection("cities/" + city + "/schools")
        .get()
        .then(result => {
          result.docs.forEach(element => {
            state.schools.push(element.data());
          });
        });
    },
    addSchool(payload) {
      db.collection("cities/" + city + "/schools")
        .doc(payload.name)
        .set({
          address: payload.address,
          total: payload.total,
          imgURL: payload.url
        });
    }
  },
  actions: {},
  getters: {}
};
