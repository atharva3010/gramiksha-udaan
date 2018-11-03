import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld";
import signup from "@/components/User/signup";
import login from "@/components/User/Login";
import signupmsg from "@/components/User/signupmsg";
import Dashboard from "@/components/Dashboard/Dashboard";
import School from "@/components/Dashboard/school";
import session from "@/components/Dashboard/session";

Vue.use(Router);

export default new Router({
  routes: [{
      path: "/",
      name: "HelloWorld",
      component: HelloWorld
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
    }, {
      path: "/dashboard/school/session",
      name: "Session",
      component: session
    },
    {
      path: "/Signup",
      name: "Sign Up",
      component: signup
    },
    {
      path: "/Login",
      name: "Log in",
      component: login
    },
    {
      path: "/Signupafter",
      name: "Successfully Signed up",
      component: signupmsg
    }
  ],
  mode: "history"
});
