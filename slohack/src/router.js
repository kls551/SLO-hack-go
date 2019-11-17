import Vue from "vue";
import Router from "vue-router";

import users from "@/components/users";
import parkings from "@/components/parkings";


Vue.use(Router);

export const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: parkings
    },
    {
      path: "/users",
      name: "users",
      component: users
    }
    ]
});