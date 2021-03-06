import { db } from "@/scripts/firebase";
export default {
  namespaced: true,
  state: {
    snackbar: {
      text: "", //snackbartext
      bar: false, //snackbar
      mode: "", //mode
      timeout: 6000
    },
    loading: {
      school: false,
      classes: false
    },
    noofsssion: 0,
    SelectedClass: null,
    refresh: false,
    currentcity: "Bhopal",
    currentSession: null,
    currentschoolname: "Sen. Sec School",
    currentclass: "",
    currentschool: {
      name: "",
      address: "",
      city: "",
      imgurl: "",
      total: 0,
      classes: {},
      location: ""
    }
  },
  mutations: {
    deselectClass(state) {
      state.SelectedClass = null;
      state.loading["classes"] = false;
    },
    getSessions(state, payload) {
      state.refresh = false;
      state.loading["classes"] = true;
      var classRef = db.collection(
        "cities/" +
          payload.city +
          "/schools/" +
          payload.school +
          "/classes/" +
          payload.class +
          "/sessions"
      );
      classRef.get().then(doc => {
        state.SelectedClass = payload.class;

        state.currentschool.classes[payload.class].sessions = [];
        if (doc.docs.length > 0)
          doc.docs.forEach(function(sessiondoc, index) {
            let sessiondata = sessiondoc.data();
            let volunteer = "";
            sessiondata.volunteers.forEach(username => {
              volunteer += `${username} `;
            });
            sessiondata.volunteers;

            state.currentschool.classes[payload.class].sessions.unshift({
              no: parseInt(sessiondoc.id),
              title: sessiondata.title,
              date: sessiondata.date,
              volunteer
            });
            state.loading["classes"] = false;
          });
        else state.loading["classes"] = false;
      });
    },
    getSchool(state, payload) {
      state.currentschool.name = "";
      state.currentschool.imgurl = "";
      state.currentschool.address = "";
      state.currentschool.total = "";
      state.currentschool.city = "";
      state.currentschool.classes = {};
      state.currentschool.location = "";
      state.snackbar.bar = false;
      state.loading["school"] = true;
      var schoolsRef = db
        .collection("cities/" + payload.city + "/schools/")
        .doc(payload.school);

      schoolsRef
        .get()
        .then(doc => {
          state.currentschool.name = doc.id;
          state.currentschool.imgurl = doc.data().imgurl;
          state.currentschool.address = doc.data().address;
          state.currentschool.total = doc.data().total;
          state.currentschool.city = state.currentcity;
          console.log(state);
          if (doc.data().location) {
            state.currentschool.location = doc.data().location;
          }
          return db
            .collection(
              "cities/" + payload.city + "/schools/" + doc.id + "/classes"
            )
            .get();
        })
        .then(classdata => {
          var classpromises = classdata.docs.map(classitr => {
            db.collection(
              "cities/" +
                payload.city +
                "/schools/" +
                payload.school +
                "/classes/" +
                classitr.id +
                "/sessions"
            )
              .get()
              .then(function(docx) {
                var noofsssion = docx.docs.length;
                state.currentschool.classes = {
                  ...state.currentschool.classes,
                  ...{
                    [classitr.id]: {
                      strength: classitr.data().strength,
                      noofsession: noofsssion
                    }
                  }
                };
              });
          });
          return Promise.all(classpromises);
        })
        .then(() => {
          state.loading["school"] = false;
        });
    },
    pushSession(state, payload) {
      state.loading["classes"] = true;
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth() + 1;
      var yyyy = today.getFullYear();
      var sdate = dd + "-" + mm + "-" + yyyy;

      var sessionref = db.collection(
        "cities/" +
          payload.city +
          "/schools/" +
          payload.school +
          "/classes/" +
          payload.class +
          "/sessions"
      );

      db.collection(
        "cities/" +
          state.currentcity +
          "/schools/" +
          state.currentschoolname +
          "/classes/"
      )
        .doc(state.SelectedClass)
        .get()
        .then(classdoc => {
          classdoc.data();
          var vol = payload.data.volunteer;

          sessionref.get().then(doc => {
            payload.data = {
              title: payload.data.title,
              volunteers: vol,
              no: doc.docs.length + 1,
              date: sdate
            };

            if (doc.docs.length != 0)
              var nextSessonno = [
                parseInt(doc.docs[doc.docs.length - 1].id) + 1
              ].toString();
            else var nextSessonno = "1";
            sessionref
              .doc(nextSessonno)
              .set(payload.data)
              .then(dooc => {
                state.refresh = true;
                state.loading["classes"] = false;
                state.snackbar.text = "Session Added";
                state.snackbar.bar = true;
              });
          });
        });
    }
  },
  actions: {
    updateSchoolDetails: async ({ commit }, payload) => {
      await db
        .collection("/cities")
        .doc(payload.city)
        .collection("/schools")
        .doc(payload.school)
        .update({
          imgurl: payload.schoolPhotoURL
        });
    },
    addClass({ commit }, payload) {
      return new Promise((resolve, reject) => {
        db.collection(
          `cities/${payload.city}/schools/${payload.school}/classes`
        )
          .doc(payload.newClass)
          .set({ strength: "0" })
          .then(resolve())
          .catch(err => {
            reject(err);
          });
      });
    },
    getSessions({ commit }, payload) {
      commit("getSessions", payload);
    },
    getSchool({ commit }, payload) {
      commit("getSchool", payload);
    },
    addSession({ commit }, payload) {
      commit("pushSession", payload);
    }
  },
  getters: {
    getLoading(state) {
      return state.loading;
    },
    getRefresh(state) {
      return state.refresh;
    },
    getSelectedClass(state) {
      return state.SelectedClass;
    },
    getSchoolDetails(state) {
      return {
        name: state.currentschool.name,
        address: state.currentschool.address,
        imgurl: state.currentschool.imgurl,
        city: state.currentschool.city,
        total: state.currentschool.total,
        location: state.currentschool.location
      };
    },
    getSchoolClasses(state) {
      return state.currentschool.classes;
    },
    getsnackbar(state) {
      return state.snackbar;
    }
  }
};
