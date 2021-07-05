import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import store from "@/store";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/allboard",
    name: "Allboard",
    component: () =>
      import(/* webpackChunkName: "allboard" */ "../views/Allboard.vue"),
  },
  {
    path: "/rankboard",
    name: "Rankboard",
    component: () =>
      import(/* webpackChunkName: "rankboard" */ "../views/Rankboard.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/Profile.vue"),
    meta: {
      requiresAuth: true,
    },
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
    path: "/post",
    name: "Post",
    component: () => import(/* webpackChunkName: "post" */ "../views/Post.vue"),
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
  linkExactActiveClass: "bg-green-800",
});
router.beforeEach((to, from, next) => {
  if (!to.matched.some((record) => record.meta.requiresAuth)) {
    next();
    return;
  }
  if (store.state.userLoggedIn) {
    next();
  } else {
    next({ name: "Home" });
  }
});

export default router;
