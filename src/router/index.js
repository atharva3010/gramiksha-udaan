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
import NewProfile from "@/components/User/NewProfile";
import Profile from "@/components/User/Profile";

Vue.use(Router);

export default new Router({
  routes: [{
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
      path: "/signinWithLink/:email",
      name: "Sign in with email"
    },
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
      path: "/profile",
      name: "Profile",
      component: NewProfile
    },
    // {
    //   path: "/profile",
    //   name: "Profile",
    //   component: Profile
    // },
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
