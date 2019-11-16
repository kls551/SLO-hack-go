import Vue from "vue";
import Router from "vue-router";

import users from "@/components/users";
import HelloWorld from "@/components/HelloWorld";


Vue.use(Router);

export const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: HelloWorld
    },
    {
      path: "/users",
      name: "users",
      component: users
    }
    ]
});