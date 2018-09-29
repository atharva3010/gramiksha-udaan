export default {
  namespaced: true,
  state: {
    currentschool: {
      name: "Sen. Sec School ",
      address: "Bittan market",
      city: "Bhopal",
      imgURL: "https://images.indianexpress.com/2017/10/nava-nadisar.jpg",
      total: 120,
      classes: [
        {
          name: "Sixth",
          Stregnth: 40,
          sessions: [
            {
              no: 1,
              teachers: ["rohit", "shubham"],
              module: "litrature",
              date: "2018-10-11"
            },
            {
              no: 2,
              teachers: ["rohit", "shubham"],
              module: "litrature",
              date: "2018-10-18"
            },
            {
              no: 4,
              teachers: ["rohit", "shubham"],
              module: "litrature",
              date: "2018-10-25"
            }
          ]
        },
        {
          name: "Seventh",
          Stregnth: 40,
          sessions: [
            {
              no: 1,
              teachers: ["rohit", "shubham"],
              module: "litrature",
              date: "2018-10-11"
            },
            {
              no: 2,
              teachers: ["rohit", "shubham"],
              module: "litrature",
              date: "2018-10-18"
            },
            {
              no: 4,
              teachers: ["rohit", "shubham"],
              module: "litrature",
              date: "2018-10-25"
            }
          ]
        },
        {
          name: "Eighth",
          Stregnth: 40,
          sessions: [
            {
              no: 1,
              teachers: ["rohit", "shubham"],
              module: "litrature",
              date: "2018-10-11"
            },
            {
              no: 2,
              teachers: ["rohit", "shubham"],
              module: "litrature",
              date: "2018-10-18"
            },
            {
              no: 4,
              teachers: ["rohit", "shubham"],
              module: "litrature",
              date: "2018-10-25"
            }
          ]
        }
      ]
    }
  },
  mutations: {},
  actions: {},
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
