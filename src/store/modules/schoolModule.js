import {
  db
} from "@/scripts/firebase";

export default {
  namespaced: true,
  state: {
    SelectedClass: null,
    refresh: false,
    currentcity: "Bhopal",
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
    },
    getSessions(state, payload) {
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
        doc.docs.forEach(function (sessiondoc, index) {
          let sessiondata = sessiondoc.data();
          state.currentschool.classes[payload].sessions.unshift({
            no: index + 1,
            title: sessiondata.title,
            date: sessiondata.date
          });

        });
      });

    },
    getSchool(state) {
      var schoolsRef = db
        .collection("cities/" + state.currentcity + "/schools/")
        .doc(state.currentschoolname);

      schoolsRef.get().then(doc => {
        state.currentschool.name = doc.id;
        state.currentschool.imgURL = doc.data().imgurl;
        state.currentschool.address = doc.data().address;
        state.currentschool.total = doc.data().total;

        db.collection(
            "cities/" + state.currentcity + "/schools/" + doc.id + "/classes"
          )
          .get()
          .then(classdata => {
            classdata.forEach(adoc => {

              state.currentschool.classes = {
                ...state.currentschool.classes,
                ...{
                  [adoc.id]: {
                    strength: adoc.data().strength
                  }
                }
              };
            });
          });

        //
      });
    },
    pushSession(state, payload) {
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth() + 1;
      var yyyy = today.getFullYear();
      var sdate = dd + "-" + mm + "-" + yyyy;

      var sessionref = db.collection(
        "cities/" + state.currentcity + "/schools/" + state.currentschoolname + "/classes/" + state.SelectedClass + "/sessions"
      )

      sessionref.get().then(doc => {
        payload.data = {
          title: payload.data.title,
          volunteers: payload.data.volunteer,
          no: doc.docs.length + 1,
          date: sdate
        };
        sessionref.doc([doc.docs.length + 1].toString()).set(payload.data).then(dooc => {

          state.refresh = true


        })
      })



    }
  },
  actions: {
    getSessions({
      commit
    }, payload) {
      commit("getSessions", payload);
    },
    getSchool({
      commit
    }) {
      commit("getSchool");
    },
    addSession({
      commit
    }, payload) {
      commit("pushSession", payload);
    }
  },
  getters: {
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
    }
  }
};
