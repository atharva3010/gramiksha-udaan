import {
  firebase,
  db
} from "@/scripts/firebase";

export default {
  namespaced: true,
  state: {
    refresh: false,
    city: null,
    no: null,
    school: null,
    class: null,
    date: null,
    loading: {
      "attendance": false,
      "assessment": false
    },
    attendance: [{
      name: "",
      status: false
    }],
    assessment: [{
        name: "",
        marks: 0
      }

    ]
  },
  mutations: {
    setSession(state, payload) {
      state.city = payload.city
      state.no = payload.no
      state.school = payload.school
      state.class = payload.class
    },
    getStudents(state) {
      state.loading["assessment"] = true;
      state.loading["attendance"] = true;
      db.collection("cities/" + state.city + "/schools/" + state.school + "/classes/" + state.class + "/sessions/").doc(state.no.toString()).get().then(doc => {
        console.log(doc)
        state.assessment = doc.data().assessment;
        state.attendance = doc.data().attendance;
        state.date = doc.data().date;
        state.loading["assessment"] = false;
        state.loading["attendance"] = false;

      });

    },
    pushStudent(state, payload) {
      state.students.push(payload);
    },
    pushAttendance(state, payload) {
      console.log(firebase.auth())
      state.attendance = payload
      state.loading["attendance"] = true;
      db.collection("cities/" + state.city + "/schools/" + state.school + "/classes/" + state.class + "/sessions/").doc(state.no.toString()).set({
        attendance: state.attendance
      }, {
        merge: true
      })
      state.loading["assessment"] = false;

    },
    pushAssessment(state, payload) {
      state.assessment = payload
      state.loading["assessment"] = true;
      db.collection("cities/" + state.city + "/schools/" + state.school + "/classes/" + state.class + "/sessions/").doc(state.no.toString()).set({
        assessment: state.assessment
      }, {
        merge: true
      })
      state.loading["assessment"] = false;
    },
    addStudents(state, payload) {
      state.loading["assessment"] = true;
      state.loading["attendance"] = true;
      var classref = db.collection("cities/" + state.city + "/schools/" + state.school + "/classes/").doc(state.class)
      classref.get().then(
        doc => {
          var updatedstudentlist = doc.data().students;
          payload.forEach(element => {
            updatedstudentlist.push(element)
          });
          classref.set({
            students: updatedstudentlist
          }, {
            merge: true
          }).then(aaa => {
            console.log(updatedstudentlist)
            state.loading["assessment"] = false;
            state.loading["attendance"] = false;
          })
        }
      )
      var sref = classref.collection("/sessions/").doc(state.no.toString())
      var updatedAttendance = state.attendance;
      var updatedAssessment = state.assessment;
      payload.forEach(element => {
        updatedAssessment.push({
          name: element.name,
          marks: 0
        })
        updatedAttendance.push({
          name: element.name,
          status: false
        })
      })
      sref.set({
        attendance: updatedAttendance,
        assessment: updatedAssessment
      }, {
        merge: true
      }).then(asdf => {
        state.refresh = true;
      })
    }
  },
  actions: {
    addStudents({
      commit
    }, payload) {
      commit("addStudents", payload)

    },
    setSession({
      commit
    }, payload) {
      commit('setSession', payload);
    },
    getStudents({
      commit
    }) {
      commit('getStudents');
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
    }
  },

}
