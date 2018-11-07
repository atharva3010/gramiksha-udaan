import {
  db
} from "@/scripts/firebase";

export default {
  namespaced: true,
  state: {
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
    getStudents(state, payload) {
      state.loading["assessment"] = true;
      state.loading["attendance"] = true;
      db.collection("cities/" + state.city + "/schools/" + state.school + "/classes/" + state.class + "/sessions/").doc(payload.no.toString()).get().then(doc => {
        state.assessment = doc.data().assessment;
        state.attendance = doc.data().attendance;
        state.loading["assessment"] = false;
        state.loading["attendance"] = false;

      });

    },
    pushStudent(state, payload) {
      state.students.push(payload);
    },
    pushAttendance(state, payload) {
      state.attendance = payload;
    },
    pushAssessment(state, payload) {
      state.loading["assessment"] = true;
      db.collection("cities/" + state.city + "/schools/" + state.school + "/classes/" + state.class + "/sessions/").doc(state.no.toString()).set({
        assessment: state.assessment
      }, {
        merge: true
      })
      state.loading["assessment"] = false;
    },
  },
  actions: {
    setSession({
      commit
    }, payload) {
      commit('setSession', payload);
    },
    getStudents({
      commit
    }, payload) {
      commit('getStudents', payload);
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
    }
  },

}
