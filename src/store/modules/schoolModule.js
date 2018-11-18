import {
  db
} from "@/scripts/firebase";

export default {

  namespaced: true,
  state: {
    loading: {
      "school": false,
      "classes": false
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
      state.refresh = false
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
              no: index + 1,
              title: sessiondata.title,
              date: sessiondata.date
            });
            state.loading["classes"] = false;
          });
        else
          state.loading["classes"] = false;
      });

    },
    getSchool(state) {
      state.loading["school"] = true;
      var schoolsRef = db
        .collection("cities/" + state.currentcity + "/schools/")
        .doc(state.currentschoolname);

      schoolsRef.get().then(doc => {
        state.currentschool.name = doc.id;
        state.currentschool.imgURL = doc.data().imgurl;
        state.currentschool.address = doc.data().address;
        state.currentschool.total = doc.data().total;
        state.currentschool.city = state.currentcity;
        db.collection(
            "cities/" + state.currentcity + "/schools/" + doc.id + "/classes"
          )
          .get()
          .then(classdata => {
            classdata.forEach(adoc => {
              var classRef = db.collection(
                "cities/" +
                state.currentcity +
                "/schools/" +
                state.currentschoolname +
                "/classes/" +
                adoc.id +
                "/sessions"
              );
              var noofsssion = 0;
              classRef.get().then(function (docx) {
                noofsssion =
                  docx.docs.length;
                state.currentschool.classes = {
                  ...state.currentschool.classes,
                  ...{
                    [adoc.id]: {
                      strength: adoc.data().strength,
                      noofsession: noofsssion

                    }
                  }
                };
                state.loading["school"] = false;
              });



            });
          });

        //
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
        "cities/" + state.currentcity + "/schools/" + state.currentschoolname + "/classes/" + state.SelectedClass + "/sessions"
      )

      db.collection(
        "cities/" + state.currentcity + "/schools/" + state.currentschoolname + "/classes/").doc(state.SelectedClass).get().then(classdoc => {
        let attendance = []
        let assessment = []
        var i = 0
        console.log(classdoc.data())

        classdoc.data().students.forEach(element => {
          attendance[i] = { ...element,
            ...{
              status: false
            }
          }
          assessment[i++] = { ...element,
            ...{
              marks: 0
            }
          }
        });
        var vol = [];
        payload.data.volunteer.forEach(element => {

          db.collection("users/").doc(element.user).get().then(doc => {
            console.log(doc)
            if (doc.exists)
              vol.push(doc.data().uid);

          })
        })
        sessionref.get().then(doc => {
          payload.data = {
            title: payload.data.title,
            volunteers: vol,
            no: doc.docs.length + 1,
            date: sdate,
            assessment: assessment,
            attendance: attendance

          };
          sessionref.doc([doc.docs.length + 1].toString()).set(payload.data).then(dooc => {

            state.refresh = true
            state.loading["classes"] = false;


          })
        })
      });




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
    }
  }
};
