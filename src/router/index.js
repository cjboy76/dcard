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
    path: "/:boardKey",
    name: "Articleforum",
    component: () =>
      import(/* webpackChunkName: "Article" */ "../views/Articleforum.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/:boardKey/a/:aID",
    name: "Article",
    component: () =>
      import(/* webpackChunkName: "Article" */ "../views/Article.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/all",
    name: "Allboard",
    component: () =>
      import(/* webpackChunkName: "Allboard" */ "../views/Allboard.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/rk",
    name: "Rankboard",
    component: () =>
      import(/* webpackChunkName: "Rankboard" */ "../views/Rankboard.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () =>
      import(/* webpackChunkName: "Profile" */ "../views/Profile.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/mas",
    name: "Myarticles",
    component: () =>
      import(/* webpackChunkName: "Myarticles" */ "../views/Myarticles.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/favs",
    name: "Favarticles",
    component: () =>
      import(/* webpackChunkName: "Favarticles" */ "../views/Favarticles.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/post",
    name: "Post",
    component: () => import(/* webpackChunkName: "Post" */ "../views/Post.vue"),
    meta: {
      requiresAuth: true,
    },
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
    store.state.authModalShow = true;
    next({ name: "Home" });
  }
});

export default router;
