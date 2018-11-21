import {
  firebase,
  db
} from "@/scripts/firebase";

export default {
  namespaced: true,
  state: {
    snackbar: {
      text: "", //snackbartext
      bar: false, //snackbar
      mode: "", //mode
      timeout: 6000,
    },
    goBack: false,
    lessonplan: {
      data: ""
    },
    refresh: false,
    city: null,
    no: null,
    school: null,
    class: null,
    date: null,
    updated: {
      attendance: false,
      assessment: false
    },
    loading: {
      attendance: false,
      assessment: false,
      lessonplan: false
    },
    attendance: [{
      name: "",
      status: false
    }],
    assessment: [{
      name: "",
      marks: 0
    }]
  },
  mutations: {
    setSession(state, payload) {
      //to set the sessions identification details
      state.city = payload.city;
      state.no = payload.no;
      state.school = payload.school;
      state.class = payload.class;
    },
    deleteSession(state) {
      db.collection(
          "cities/" +
          state.city +
          "/schools/" +
          state.school +
          "/classes/" +
          state.class +
          "/sessions/"
        )
        .doc(state.no.toString())
        .delete()
        .then(success => {
          console.log(success);
          state.goBack = true;
        });
    },
    getStudents(state) {
      //getting the session details and making the loading values True during that time
      state.loading["assessment"] = true;
      state.loading["attendance"] = true;
      state.loading["lessonplan"] = true;
      state.goBack = false;
      db.collection(
          "cities/" +
          state.city +
          "/schools/" +
          state.school +
          "/classes/" +
          state.class +
          "/sessions/"
        )
        .doc(state.no.toString())
        .get()
        .then(doc => {
          state.assessment = doc.data().assessment;
          state.attendance = doc.data().attendance;
          state.lessonplan.data = doc.data().lessonplan;

          if (!("attendance" in doc.data())) {
            state.attendance = [];
            db.collection(
                "cities/" + state.city + "/schools/" + state.school + "/classes/"
              )
              .doc(state.class)
              .get()
              .then(classd => {
                classd.data().students.forEach(element => {
                  state.attendance.push({
                    ...element,
                    ...{
                      status: false
                    }
                  });
                });
              });
          } else {
            state.updated.attendance = true;
            state.attendance = doc.data().attendance;
          }

          if (!("assessment" in doc.data())) {
            state.assessment = [];
            db.collection(
                "cities/" + state.city + "/schools/" + state.school + "/classes/"
              )
              .doc(state.class)
              .get()
              .then(classd => {
                classd.data().students.forEach(element => {
                  state.assessment.push({
                    ...element,
                    ...{
                      marks: 0
                    }
                  });
                });
              });
          } else {
            state.updated.assessment = true;
            state.assessment = doc.data().assessment;
          }

          state.date = doc.data().date;
          state.loading["assessment"] = false;
          state.loading["attendance"] = false;
          state.loading["lessonplan"] = false;
        });
    },
    pushLessonPlan(state, payload) {
      //pushing the lesson plan to firebase, and making the loading value True during that time.
      state.loading["lessonplan"] = true;
      db.collection(
          "cities/" +
          state.city +
          "/schools/" +
          state.school +
          "/classes/" +
          state.class +
          "/sessions/"
        )
        .doc(state.no.toString())
        .set({
          lessonplan: payload.data
        }, {
          merge: true
        })
        .then(doc => {
          state.loading["lessonplan"] = false;
          state.refresh = true;
        });
    },
    pushAttendance(state, payload) {
      //pushing the attendence to firebase, and making the loading value True during that time.
      console.log(firebase.auth);
      state.attendance = payload;
      state.loading["attendance"] = true;
      db.collection(
          "cities/" +
          state.city +
          "/schools/" +
          state.school +
          "/classes/" +
          state.class +
          "/sessions/"
        )
        .doc(state.no.toString())
        .set({
          attendance: state.attendance
        }, {
          merge: true
        })
        .then(doc => {
          state.loading["attendance"] = false;
          state.refresh = true;
        });
    },
    pushAssessment(state, payload) {
      //pushing the assessment to firebase, and making the loading value True during that time.
      state.assessment = payload;
      state.loading["assessment"] = true;
      db.collection(
          "cities/" +
          state.city +
          "/schools/" +
          state.school +
          "/classes/" +
          state.class +
          "/sessions/"
        )
        .doc(state.no.toString())
        .set({
          assessment: state.assessment
        }, {
          merge: true
        })
        .then(
          doc => {
            state.loading["assessment"] = false;
            state.refresh = true;
          },
          err => {
            console.log(err);
          }
        );
    },
    addStudents(state, payload) {

      //pushing the added students to firebase, and making the loading value True during that time.
      state.loading["assessment"] = true;
      state.loading["attendance"] = true;
      var classref = db
        .collection(
          "cities/" + state.city + "/schools/" + state.school + "/classes/"
        )
        .doc(state.class);
      classref.get().then(doc => {
        var updatedstudentlist = doc.data().students;

        //getting a copy of students list of class from firebase and appending the new students to it.
        payload.forEach(element => {
          updatedstudentlist.push(element);
        });

        //pushing the updated student list to the firebase if sucessfull then setting the loading value false
        classref
          .set({
            students: updatedstudentlist
          }, {
            merge: true
          })
          .then(aaa => {
            //code for adding the new students to the assessment and attendence records
            var sref = classref.collection("/sessions/").doc(state.no.toString());
            var updatedAttendance = state.attendance;
            var updatedAssessment = state.assessment;
            payload.forEach(element => {
              updatedAssessment.push({
                name: element.name,
                marks: 0
              });
              updatedAttendance.push({
                name: element.name,
                status: false
              });
            });
            sref
              .set({
                attendance: updatedAttendance,
                assessment: updatedAssessment
              }, {
                merge: true
              })
              .then(asdf => {
                state.refresh = true;
                //if successful the seting the refresh value to true
                state.loading["assessment"] = false;
                state.loading["attendance"] = false;
                state.snackbar.bar = true
                state.snackbar.text = "Students Added"
              });



          });
      });


    },
    deleteSession(state) {
      //deleteing session and making goBack true to that getters react and watch propery in the session page reacts to it and goes back to school page
      var sref = db.collection(
          "cities/" +
          state.city +
          "/schools/" +
          state.school +
          "/classes/" +
          state.class +
          "/sessions/"
        )
        .doc(state.no.toString())
      sref.delete().then(success => {
        state.goBack = true;
      })
    }
  },
  actions: {
    deleteSession({
      commit
    }) {
      commit("deleteSession");
    },
    addStudents({
      commit
    }, payload) {
      commit("addStudents", payload);
    },
    setSession({
      commit
    }, payload) {
      commit("setSession", payload);
    },
    getStudents({
      commit
    }) {
      commit("getStudents");
    },
    addStudent({
      commit
    }, payload) {
      commit("pushStudent", payload);
    },
    addAttendance({
      commit
    }, payload) {
      commit("pushAttendance", payload);
    },
    pushAssessment({
      commit
    }, payload) {
      commit("pushAssessment", payload);
    },
    pushAttendance({
      commit
    }, payload) {
      commit("pushAttendance", payload);
    },
    pushLessonPlan({
      commit
    }, payload) {
      commit("pushLessonPlan", payload);
    }
  },
  getters: {
    getStudentList(state) {
      return state.students;
    },
    getAttendance(state) {
      return state.attendance;
    },
    getAssessment(state) {
      return state.assessment;
    },
    getLoading(state) {
      return state.loading;
    },
    getDate(state) {
      return state.date;
    },
    getRefresh(state) {
      return state.refresh;
    },
    getLessonPlan(state) {
      return state.lessonplan;
    },
    getsnackbar(state) {
      return state.snackbar;
    },
    getGoBack(state) {
      return state.goBack;
    }
  }
};
