import { createRouter, createWebHistory } from "vue-router";

import GlobalFeed from "@/views/GlobalFeedView.vue";
import RegisterView from "@/views/RegisterView.vue";
import LoginView from "@/views/LoginView.vue";

const routes = [
  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/",
    name: "home",
    component: GlobalFeed,
  },
];

const router = new createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
