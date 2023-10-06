import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import RegisterView from "@/views/RegisterView.vue";
// import AboutView from "@/views/AboutView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
];

const router = new createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
