import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/allboard",
    name: "Allboard",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "allboard" */ "../views/Allboard.vue"),
  },
  {
    path: "/rankboard",
    name: "Rankboard",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "rankboard" */ "../views/Rankboard.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/Profile.vue"),
  },
  {
    path: "/articles",
    name: "Articles",
    component: () =>
      import(/* webpackChunkName: "articles" */ "../views/Articles.vue"),
  },
  {
    path: "/favs",
    name: "Favs",
    component: () =>
      import(/* webpackChunkName: "favs" */ "../views/Favcomment.vue"),
  },
  {
    // path: "*",
    path: "/:catchAll(.*)",
    name: "NotFound",
    redirect: { name: "Home" },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
