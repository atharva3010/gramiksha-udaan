import { firebase, db } from "@/scripts/firebase";

export default {
  namespaced: true,
  state: {
    userExists: { no: false },
    user: JSON.parse(localStorage.getItem("gramiksha-udaan:user")),
    isSignedUp: false,
    userDetails: JSON.parse(
      localStorage.getItem("gramiksha-udaan:userDetails")
    ),
    isSignedIn: localStorage.getItem("gramiksha-udaan:signedIn") === "true",
    SignedUpUser: null,
    loading: false,
    error: null,
    accessLevel: localStorage.getItem("gramiksha-udaan:accessLevel")
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
      localStorage.setItem("gramiksha-udaan:user", JSON.stringify(payload));
    },
    setUserExists(state, payload) {
      state.userExist = payload;
    },
    setSignedUp(state, payload) {
      state.isSignedUp = payload;
    },
    setUserDetails(state, payload) {
      state.userDetails = payload;
      state.accessLevel = payload.accessLevel;
      localStorage.setItem(
        "gramiksha-udaan:userDetails",
        JSON.stringify(payload)
      );
      localStorage.setItem("gramiksha-udaan:accessLevel", payload.accessLevel);
    },
    setSignedIn(state, payload) {
      state.isSignedIn = payload;
      localStorage.setItem("gramiksha-udaan:signedIn", payload);
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    clearError(state) {
      state.error = null;
    },
    setAccessLevel(state, payload) {
      state.accessLevel = payload;
    },
    CheckUsernames(state, payload) {
      payload.forEach(element => {
        var usersref = db.collection("users");
        var query = usersref.where("username", "==", element.user);
        query.get().then(function(QuerySnapshot) {
          if (QuerySnapshot.empty) {
            state.userExists[element.no] = false;
          } else {
            state.userExists[element.no] = true;
          }
        });
      });
    }
  },
  actions: {
    SignUserIn({ commit, dispatch }, payload) {
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
                docef
                  .get()
                  .then(function(doc) {
                    commit("setUser", user.user);
                    commit("setUserDetails", doc.data());
                    dispatch("setAccessLevel");
                    commit("setSignedIn", true);
                  })
                  .catch(error => {
                    commit("setLoading", false);
                    commit("setError", error);
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
              console.log(doc.data());
              firebase
                .auth()
                .signInWithEmailAndPassword(doc.data().email, payload.password)
                .then(user => {
                  console.log(user);
                  var citiesRef = db.collection("users");
                  citiesRef
                    .where("uid", "==", user.user.uid)
                    .get()
                    .then(qs => {
                      (docRef = db.collection("users").doc(qs.docs[0].id)),
                        docRef.get().then(function(doc) {
                          commit("setUser", user.user);
                          commit("setUserDetails", doc.data());
                          dispatch("setAccessLevel");
                          commit("setSignedIn", true);
                        });
                    });
                })
                .catch(error => {
                  commit("setLoading", false);
                  commit("setError", error);
                });
            } else {
              commit("setLoading", false);
              error => {
                message: "Username Not found";
              };
              commit("setError", error);
            }
          })
          .catch(function(error) {
            commit("setLoading", false);
            error => {
              message: "Can't access Server";
            };
            commit("setError", error);
          });
      }
    },
    SignUserup({ commit, dispatch }, payload) {
      commit("setLoading", true);
      commit("clearError");
      var userDetails = {
        email: payload.email,
        name: payload.name,
        username: payload.username,
        city: payload.city,
        wantedPost: payload.ngopost,
        ngopost: "Joined",
        accessLevel: 0
      };
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(function(user) {
          userDetails.uid = user.user.uid;
          db.collection("users")
            .doc(payload.username)
            .set(userDetails)
            .then(function() {
              commit("setLoading", false);
              commit("setUser", user.user);
              commit("setUserDetails", userDetails);
              dispatch("setAccessLevel");
              commit("setSignedUp", true);
              commit("setSignedIn", true);
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
    async logout({ commit }) {
      await firebase
        .auth()
        .signOut()
        .then(function() {
          commit("setUser", null);
          commit("setLoading", false);
          commit("setSignedIn", false);
          commit("setSignedUp", false);
          commit("setUserDetails", null);
          localStorage.removeItem("gramiksha-udaan:user");
          localStorage.removeItem("gramiksha-udaan:userDetails");
          localStorage.removeItem("gramiksha-udaan:signedIn");
        });
    },
    clearError({ commit }) {
      commit("clearError");
    }
  },
  getters: {
    getUserExists(state) {
      return state.userExists;
    },
    getIsSignedUp(state) {
      return state.isSignedUp;
    },
    getUserDetails(state) {
      return state.userDetails;
    },
    loading(state) {
      return state.loading;
    },
    error(state) {
      return state.error;
    },
    getUser(state) {
      return state.user;
    },
    getIsSignedIn(state) {
      return state.isSignedIn;
    },
    getAccessLevel(state) {
      return state.accessLevel;
    }
  }
};
