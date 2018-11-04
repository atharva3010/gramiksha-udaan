import {
  db
} from "@/scripts/firebase";
import {
  stat
} from "fs";

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
    getStudents(state, payload) {
      state.loading["assessment"] = true;
      state.loading["attendance"] = true;
      state.city = payload.city
      state.no = payload.no
      state.school = payload.school
      state.class = payload.class
      db.collection("cities/" + payload.city + "/schools/" + payload.school + "/classes/" + payload.class + "/sessions/").doc(payload.no.toString()).get().then(doc => {
        state.assessment = doc.data().assessment;
        state.attendance = doc.data().attendance;

      });


      state.loading["assessment"] = false;
      state.loading["attendance"] = false;
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
