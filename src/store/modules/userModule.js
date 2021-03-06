import { firebase, db } from "@/scripts/firebase";

export default {
  namespaced: true,
  state: {
    userExists: {
      no: false
    },
    user: null,
    isSignedUp: false,
    userDetails: null,
    isSignedIn: null,
    SignedUpUser: null,
    loading: false,
    error: null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setUserExists(state, payload) {
      state.userExist = payload;
    },
    setSignedUp(state, payload) {
      state.isSignedUp = payload;
    },
    setUserDetails(state, payload) {
      state.userDetails = payload;
    },
    setSignedIn(state, payload) {
      state.isSignedIn = payload;
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
    updateUserDetails: async ({ commit }, payload) => {
      return new Promise(async (resolve, reject) => {
        let user = firebase.auth().currentUser;
        let userDetSnapshot = await db
          .collection("users")
          .where("uid", "==", user.uid)
          .get();
        let userDetails = userDetSnapshot.docs[0].data();
        await db
          .collection("/users")
          .doc(userDetails.username)
          .update({
            ...payload
          });
        var docef = db.collection("users").doc(userDetails.username);
        await docef
          .get()
          .then(function(doc) {
            commit("setUser", user.user);
            commit("setUserDetails", doc.data());
            commit("setSignedIn", true);
            resolve();
          })
          .catch(function(error) {
            reject(error);
          });
      });
    },
    addUser({ commit }, payload) {
      return new Promise((resolve, reject) => {
        db.collection("/users")
          .where("email", "==", payload)
          .get()
          .then(doc => {
            if (!doc.empty) {
              reject("This Email Belongs to another User");
            } else {
              return db.collection("/unverified").add({
                email: payload.email,
                post: payload.post
              });
            }
          })
          .then(() => {
            resolve();
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    signInWithLink({ commit }, payload) {
      let link = window.location.href;
      return new Promise((resolve, reject) => {
        if (firebase.auth().isSignInWithEmailLink(link)) {
          firebase
            .auth()
            .signInWithEmailLink(payload, link)
            .then(user => {
              commit("setUser", user.user);
              return resolve();
            })
            .catch(err => reject(err));
        } else {
          reject("Invalid Sign In");
        }
      });
    },
    async SignUserIn({ commit, dispatch }, payload) {
      commit("setLoading", true);
      commit("clearError");
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (re.test(String(payload.email).toLowerCase())) {
        firebase
          .auth()
          .signInWithEmailAndPassword(payload.email, payload.password)
          .then(async function(user) {
            // await firebase
            //   .auth()
            //   .setPersistence(firebase.auth.Auth.Persistence.SESSION);
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
                          commit("setUser", user.user);
                          commit("setUserDetails", doc.data());
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
              message: "Can't  Server";
            };
            commit("setError", error);
          });
      }
    },
    SignUserup({ commit, dispatch, state }, payload) {
      commit("setLoading", true);
      commit("clearError");
      var userDetails = {
        uid: state.user.uid,
        email: payload.email,
        name: payload.name,
        username: payload.username
      };
      db.collection("/users")
        .doc(payload.username)
        .set(userDetails)
        .then(function() {
          commit("setLoading", false);
          commit("setUser", state.user);
          commit("setUserDetails", userDetails);
          commit("setSignedUp", true);
          commit("setSignedIn", true);
        })

        .catch(error => {
          commit("setLoading", false);
          commit("setError", error);
        });
    },
    resetPassword({ commit }, payload) {
      var id = payload;

      return new Promise((resolve, reject) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(String(id).toLowerCase())) {
          firebase
            .auth()
            .sendPasswordResetEmail(id)
            .then(() => {
              resolve();
            })
            .catch(error => {
              console.log(error);
              reject(error);
            });
        } else {
          var docRef = db.collection("users").doc(id);
          docRef
            .get()
            .then(function(doc) {
              if (doc.exists) {
                return firebase.auth().sendPasswordResetEmail(doc.data().email);
              }
            })
            .then(() => {
              resolve();
            })
            .catch(error => {
              console.log(error);
              reject(error);
            });
        }
      });
    },
    getUsernamesFromCity({ commit }, payload) {
      return new Promise((resolve, reject) => {
        var usersnames = [];
        db.collection("/users")
          .where("city", "==", payload)
          .get()
          .then(res => {
            res.docs.forEach(element => {
              usersnames.push(element.id);
            });
            resolve(usersnames);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    async logout({ commit }) {
      return new Promise(
        await function(resolve, reject) {
          firebase
            .auth()
            .signOut()
            .then(function() {
              commit("setUser", null);
              commit("setLoading", false);
              commit("setSignedIn", false);
              commit("setSignedUp", false);
              commit("setUserDetails", null);
              resolve();
            })
            .catch(function(error) {
              reject(error);
            });
        }
      );
    },
    clearError({ commit }) {
      commit("clearError");
    },
    updatePassword({ commit }, payload) {
      const oldPassword = payload.old;
      const newPassword = payload.reNew;
      return new Promise((resolve, reject) => {
        firebase
          .auth()
          .signInWithEmailAndPassword(this.state.user.user.email, oldPassword)
          .then(() => {
            return firebase.auth().currentUser.updatePassword(newPassword);
          })
          .then(() => {
            resolve();
          })
          .catch(error => {
            console.log(error);
            reject(error);
          });
      });
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
    }
  }
};
