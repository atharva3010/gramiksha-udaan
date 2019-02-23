import {
  db
} from "@/scripts/firebase";
import {
  resolve
} from "url";

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
      imgURL: "",
      total: 0,
      classes: {}
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
        state.currentcity +
        "/schools/" +
        state.currentschoolname +
        "/classes/" +
        payload +
        "/sessions"
      );
      classRef.get().then(doc => {
        state.SelectedClass = payload;
        state.currentschool.classes[payload].sessions = [];
        if (doc.docs.length > 0)
          doc.docs.forEach(function (sessiondoc, index) {
            let sessiondata = sessiondoc.data();
            state.currentschool.classes[payload].sessions.unshift({
              no: parseInt(sessiondoc.id),
              title: sessiondata.title,
              date: sessiondata.date
            });
            state.loading["classes"] = false;
          });
        else state.loading["classes"] = false;
      });
    },
    getSchool(state, payload) {
      state.currentschool.name = "";
      state.currentschool.imgURL = "";
      state.currentschool.address = "";
      state.currentschool.total = "";
      state.currentschool.city = "";
      state.currentschool.classes = {};
      state.snackbar.bar = false;
      state.loading["school"] = true;
      var schoolsRef = db
        .collection("cities/" + payload.city + "/schools/")
        .doc(payload.school);

      schoolsRef.get().then(doc => {
        console.log(doc.data())
        state.currentschool.name = doc.id;
        state.currentschool.imgURL = doc.data().imgurl;
        state.currentschool.address = doc.data().address;
        state.currentschool.total = doc.data().total;
        state.currentschool.city = state.currentcity;
        return db.collection(
            "cities/" + state.currentcity + "/schools/" + doc.id + "/classes"
          )
          .get()
      }).then(classdata => {
        var classpromises = classdata.docs.map(classitr => {
          db.collection(
            "cities/" +
            payload.city +
            "/schools/" +
            payload.school +
            "/classes/" +
            classitr.id +
            "/sessions"
          ).get().then(function (docx) {
            console.log(docx)
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

          })
        });
        return Promise.all(classpromises)
      }).then(() => {
        state.loading['school'] = false
      })
    },
    pushSession(state, payload) {
      console.log(payload)
      state.loading["classes"] = true;
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth() + 1;
      var yyyy = today.getFullYear();
      var sdate = dd + "-" + mm + "-" + yyyy;

      var sessionref = db.collection(
        "cities/" +
        state.currentcity +
        "/schools/" +
        state.currentschoolname +
        "/classes/" +
        state.SelectedClass +
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
          var vol = [];
          payload.data.volunteer.forEach(element => {
            db.collection("users/")
              .doc(element)
              .get()
              .then(doc => {
                if (doc.exists) vol.push(doc.data().uid);
              });
          });
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
    addClass({
      commit
    }, payload) {
      console.log(payload)
      return db.collection(`city/${payload.city}/schools/${payload.school}/classes`).doc(payload.newClass)
    },
    getSessions({
      commit
    }, payload) {
      commit("getSessions", payload);
    },
    getSchool({
      commit
    }, payload) {
      commit("getSchool", payload);
    },
    addSession({
      commit
    }, payload) {
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
        url: state.currentschool.imgURL,
        city: state.currentschool.city,
        total: state.currentschool.total
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
