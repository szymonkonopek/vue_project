import { createRouter, createWebHistory } from "vue-router";

import GlobalFeed from "@/views/GlobalFeedView.vue";
import YourFeed from "@/views/YourFeed.vue";
import RegisterView from "@/views/RegisterView.vue";
import LoginView from "@/views/LoginView.vue";
import TagFeed from "@/views/TagFeed.vue";
import ArticleView from "@/views/ArticleView";
import CreateArticle from "@/views/CreateArticleView";
import EditArticle from "@/views/EditArticleView";

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
  {
    path: "/feed",
    name: "yourFeed",
    component: YourFeed,
  },
  {
    path: "/tags/:slug",
    name: "tag",
    component: TagFeed,
  },
  {
    path: "/articles/new",
    name: "createArticle",
    component: CreateArticle,
  },
  {
    path: "/articles/:slug",
    name: "article",
    component: ArticleView,
  },
  {
    path: "/articles/:slug/edit",
    name: "editArticle",
    component: EditArticle,
  },
  {
    path: "/settings",
    name: "settings",
    component: GlobalFeed,
  },
  {
    path: "/profiles/:slug",
    name: "userProfile",
    component: GlobalFeed,
  },
  {
    path: "/profiles/:slug/favourites",
    name: "userProfleFavourites",
    component: GlobalFeed,
  },
];

const router = new createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
