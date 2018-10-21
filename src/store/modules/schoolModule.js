export default {
  namespaced: true,
  state: {
    currentschool: {
      name: "Sen. Sec School ",
      address: "Bittan market",
      city: "Bhopal",
      imgURL: "https://images.indianexpress.com/2017/10/nava-nadisar.jpg",
      total: 120,
      classes: {
        "Sixth": {
          Stregnth: 40,
          sessions: [{
              no: 3,
              volunteer: [{
                user: "Rohit",
                no: 1
              }, {
                user: "Shubham",
                no: 2
              }],
              title: "Literature",
              date: "2018-10-25"
            },
            {
              no: 2,
              volunteer: [{
                user: "Rohit",
                no: 1
              }, {
                user: "Shubham",
                no: 2
              }],
              title: "Literature",
              date: "2018-10-18"
            },
            {
              no: 1,
              volunteer: [{
                user: "Rohit",
                no: 1
              }, {
                user: "Shubham",
                no: 2
              }],
              title: "Literature",
              date: "2018-10-11"
            },
          ]
        },
        "Seventh": {

          Stregnth: 40,
          sessions: [{
              no: 3,
              volunteer: [{
                user: "Rohit",
                no: 1
              }, {
                user: "Shubham",
                no: 2
              }],
              title: "Literature",
              date: "2018-10-25"
            },
            {
              no: 2,
              volunteer: [{
                user: "Rohit",
                no: 1
              }, {
                user: "Shubham",
                no: 2
              }],
              title: "Literature",
              date: "2018-10-18"
            },
            {
              no: 1,
              volunteer: [{
                user: "Rohit",
                no: 1
              }, {
                user: "Shubham",
                no: 2
              }],
              title: "Literature",
              date: "2018-10-11"
            },
          ]
        },
        "Eighth": {
          Stregnth: 40,
          sessions: [{
              no: 3,
              volunteer: [{
                user: "Rohit",
                no: 1
              }, {
                user: "Shubham",
                no: 2
              }],
              title: "Literature",
              date: "2018-10-25"
            },
            {
              no: 2,
              volunteer: [{
                user: "Rohit",
                no: 1
              }, {
                user: "Shubham",
                no: 2
              }],
              title: "Literature",
              date: "2018-10-18"
            },
            {
              no: 1,
              volunteer: [{
                user: "Rohit",
                no: 1
              }, {
                user: "Shubham",
                no: 2
              }],
              title: "Literature",
              date: "2018-10-11"
            },
          ]
        }
      }
    }
  },
  mutations: {
    pushSession(state, payload) {

      var today = new Date();
      console.log(today);
      var dd = today.getDate()
      var mm = today.getMonth() + 1
      var yyyy = today.getFullYear()
      var sdate = dd + "-" + mm + "-" + yyyy
      var sno = state.currentschool.classes[payload.class].sessions[0].no + 1;
      payload.data = { ...payload.data,
        ...{
          no: sno,
          date: sdate
        }
      }

      console.log(payload.data)
      state.currentschool.classes[payload.class].sessions.unshift(payload.data)


    }
  },
  actions: {
    addSession({
      commit
    }, payload) {

      commit('pushSession', payload)
    }
  },
  getters: {
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
