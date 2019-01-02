import Vue from "vue";
import Router from "vue-router";
import ProgramHead from "@/components/Dashboard/ProgramHead";
import signup from "@/components/User/signup";
import login from "@/components/User/Login";
import signupmsg from "@/components/User/signupmsg";
import Dashboard from "@/components/Dashboard/Dashboard";
import School from "@/components/Dashboard/school";
import session from "@/components/Dashboard/session";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Head",
      component: ProgramHead
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: Dashboard
    },
    {
      path: "/dashboard/school",
      name: "School",
      component: School
    },
    {
      path: "/dashboard/session/:city/:school/:class/:session",
      name: "Session",
      component: session
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
    }
  ],
  mode: "history"
});
