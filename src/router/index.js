import Vue from "vue";
import Router from "vue-router";

/* Main Views */
import Home from "../views/Home.vue";
import Cite from "../views/CitePage.vue";
import Code from "../views/CodePage.vue";
import Diagnostics from "../views/Diagnostics.vue";
import FAQ from "../views/FAQ.vue";
import Submit from "../views/Submit.vue";
import Leaderboard from "../views/Leaderboard.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import Profile from "../views/Profile.vue";
import Paper from "../views/Paper.vue";
import Tasks from "../views/Tasks.vue";
import TermsAndConditions from "../views/TermsAndConditions.vue";
import PrivacyPolicy from "../views/PrivacyPolicy.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "/",
      component: Home,
      beforeEnter: (to, from, next) => {
        next({ path: "/home"});
        next();
      }
    },
    {
      path: "/home",
      name: "home",
      component: Home
    },
    {
      path: "/cite",
      name: "cite",
      component: Cite
    },
    {
      path: "/code",
      name: "code",
      beforeEnter() {window.open('https://github.com/Alue-Benchmark/alue_baselines', '_blank')},
      // component: Code
    },
    {
      path: "/diagnostics",
      name: "diagnostics",
      component: Diagnostics
    },
    {
      path: "/FAQ",
      name: "FAQ",
      component: FAQ
    },
    {
      path: "/Submit",
      name: "Submit",
      component: Submit
    },
    {
      path: "/leaderboard",
      name: "leaderboard",
      component: Leaderboard
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/paper",
      name: "paper",
      beforeEnter() {window.open('https://www.aclweb.org/anthology/2021.wanlp-1.18.pdf', '_blank');}
    },
    {
      path: "/tasks",
      name: "tasks",
      component: Tasks
    },
    {
      path: "/terms_and_conditions",
      name: "terms_and_conditions",
      component: TermsAndConditions
    },
    {
      path: "/privacy_policy",
      name: "privacy_policy",
      component: PrivacyPolicy
    },
    {
      path: "/*",
      name: "404",
      beforeEnter: (to, from, next) => {
        next({ path: "/home"});
        next();
      }
    }
  ]
});