import Vue from "vue";
import Router from "vue-router";
import firebase from "firebase/app";
import "firebase/auth";
import CitiesHome from "@/components/Home/Cities";
import CitySchools from "@/components/Home/Schools";
import signup from "@/components/User/signup";
import login from "@/components/User/Login";
import School from "@/components/Dashboard/school";
import session from "@/components/Dashboard/session";
import NewProfile from "@/components/User/NewProfile";
import LoginScreen from "@/components/User/loggerin";
import addVolunteer from "@/components/User/addVolunteer";
import addProgramCoordinator from "@/components/User/addProgramCoordinator";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "Cities Home",
      component: CitiesHome
    },
    {
      path: "/addVolunteer",
      name: "Add Volunteer",
      component: addVolunteer,
      meta: {
        authRequired: true
      }
    },
    {
      path: "/addProgramCoordinator",
      name: "Add addProgramCoodinator",
      component: addProgramCoordinator
    },
    {
      path: "/signinWithLink/:email",
      name: "Signing You In",
      component: LoginScreen
    },
    {
      path: "/signup/:email",
      name: "Sign Up",
      component: signup,
      meta: {
        authRequired: true
      }
    },
    {
      path: "/login",
      name: "Log In",
      component: login
      // meta: {
      //   authRequired: true
      // }
    },
    {
      path: "/profile",
      name: "Profile",
      component: NewProfile,
      meta: {
        authRequired: true
      }
    },
    {
      path: "/:city/",
      name: "Schools",
      component: CitySchools
    },
    {
      path: "/:city/:school",
      name: "School",
      component: School,
      meta: {
        authRequired: true
      }
    },
    {
      path: "/:city/:school/:class/:session",
      name: "Session",
      component: session
    }
  ],
  mode: "history"
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authRequired || false)) {
    firebase.auth().onAuthStateChanged(function(user) {
      if (!user) {
        if (to.path != "/login") {
          next({
            path: "/login"
          });
        } else {
          next();
        }
      } else {
        if (to.name == "Log In" || to.name == "Sign Up") {
          next({
            path: "/"
          });
        }
        next();
      }
    });
  } else {
    next();
  }
});

export default router;
