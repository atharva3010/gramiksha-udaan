import Vue from "vue";
import Router from "vue-router";
import CitiesHome from "@/components/Home/Cities";
import CitySchools from "@/components/Home/Schools";
import signup from "@/components/User/signup";
import login from "@/components/User/Login";
import signupmsg from "@/components/User/signupmsg";
import Dashboard from "@/components/Dashboard/Dashboard";
import School from "@/components/Dashboard/school";
import session from "@/components/Dashboard/session";
import Profile from "@/components/User/NewProfile";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Cities Home",
      component: CitiesHome
    },

    // {
    //   path: "",
    //   name: "Dashboard",
    //   component: Dashboard
    // },

    {
      path: "/signup",
      name: "Sign Up",
      component: signup
    },
    {
      path: "/login",
      name: "Log in",
      component: login
    },
    {
      path: "/newprofile",
      name: "Profile",
      component: Profile
    },
    {
      path: "/:city/",
      name: "Schools",
      component: CitySchools
    },
    {
      path: "/:city/:school",
      name: "School",
      component: School
    },
    {
      path: "/:city/:school/:class/:session",
      name: "Session",
      component: session
    }
  ],
  mode: "history"
});
