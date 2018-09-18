export default {
    state: {
      user: null,
      username: null
    },
    mutations: {
      setUser (state, payload) {
        state.user = payload
      }
    },
    actions: {
      SignUserup ({commit}, payload) {
        firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password).then(
          function (user) {
            let nuser = {
              id: user.uid
            }
            console.log(user.uid)
            commit('setUser', nuser)
            return user
          }
  
        )
      }
  
    },
    getters: {
      giveUser () {
  
      }
    }
}


  