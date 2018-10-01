import { firebase, db } from "@/scripts/firebase";

export default {
  namespaced: true,
  state: {
    userExist: false,
    user: null,
    isSignedUp: false,
    isSignedIn: false,
    SignedUpUser: null,
    loading: false,
    error: null
  },
  mutations: {
    setUser(state, payload) {
      (state.isSignedIn = true), (state.user = payload);
    },
    setUserExists(state, payload) {
      state.userExist = payload;
    },
    setSignedUp(state, payload) {
      (state.isSignedUp = true), (state.SignedUpUser = payload.name);
    },
    setSignedIn(state, payload) {
      (state.isSignedUp = true), (state.SignedUpUser = payload.name);
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    clearError(state) {
      state.error = null;
    }
  },
  actions: {
    SignUserIn({ commit }, payload) {
      commit("setLoading", true);
      commit("clearError");
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (re.test(String(payload.email).toLowerCase())) {
        firebase
          .auth()
          .signInWithEmailAndPassword(payload.email, payload.password)
          .then(function(user) {
            var usersRef = db.collection("users");
            usersRef
              .where("uid", "==", user.user.uid)
              .get()
              .then(function(qs) {
                var docef = db.collection("users").doc(qs.docs[0].id);
                docef.get().then(function(doc) {
                  commit("setUser", doc.data());
                });
              });
          })
          .catch(error => {
            commit("setLoading", false);
            commit("setError", error);
          });
      } else {
        var docRef = db.collection("users").doc(payload.email);
        docRef
          .get()
          .then(function(doc) {
            if (doc.exists) {
              firebase
                .auth()
                .signInWithEmailAndPassword(doc.data().email, payload.password)
                .then(user => {
                  var citiesRef = db.collection("users");
                  citiesRef
                    .where("uid", "==", user.user.uid)
                    .get()
                    .then(qs => {
                      (docRef = db.collection("users").doc(qs.docs[0].id)),
                        docRef.get().then(function(doc) {
                          commit("setUser", doc.data());
                        });
                    });
                })
                .catch(error => {
                  commit("setLoading", false);
                  commit("setError", error);
                });
            } else {
              commit("setLoading", false);
              errorn => {
                message: "Username Not found";
              };
              commit("setError", errorn);
            }
          })
          .catch(function(error) {
            commit("setLoading", false);
            errorn => {
              message: "Can't access Server";
            };
            commit("setError", errorn);
          });
      }
    },
    SignUserup({ commit }, payload) {
      commit("setLoading", true);
      commit("clearError");
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(function(user) {
          db.collection("users")
            .doc(payload.username)
            .set({
              email: payload.email,
              name: payload.name,
              username: payload.username,
              city: payload.city,
              ngopost: payload.ngopost,
              uid: user.user.uid
            })
            .then(function(docRef) {
              commit("setLoading", false);
              commit("setSignedUp", {
                name: payload.name
              });
            })
            .catch(error => {
              commit("setLoading", false);
              commit("setError", error);
            });
        })
        .catch(error => {
          commit("setLoading", false);
          commit("setError", error);
        });
    },
    CheckUsename({ commit }, payload) {
      var usersref = db.collection("users");
      var query = usersref.where("username", "==", payload.username);
      query.get().then(function(QuerySnapshot) {
        if (QuerySnapshot.empty) {
          commit("setUserExists", false);
        } else {
          commit("setUserExists", true);
        }
      });
    },
    clearError({ commit }) {
      commit("clearError");
    }
  },
  getters: {
    getUserExists(state) {
      return state.userExist;
    },
    getIsSignedUp(state) {
      return {
        isSignedUp: state.isSignedUp,
        SignedUpUser: state.SignedUpUser
      };
    },
    loading(state) {
      return state.loading;
    },
    error(state) {
      return state.error;
    },
    getIsSignedIn(state) {
      return {
        user: state.user,
        isSignedIn: state.isSignedIn
      };
    }
  }
};
