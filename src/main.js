import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/tailwind.css";
import VeeValidatePlugin from "./includes/validation";
import ProgressBar from "./includes/progressBar";
import { auth } from "./includes/firebase";
import "nprogress/nprogress.css";

ProgressBar(router);
let app;
// initial firebase after initializing Vue app and check the user state

// reload browser => Vue instance destroyed => so build a new Vue app => App.vue dispatch init_login
// => toggle user state

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);
    app.use(store);
    app.use(router);
    app.use(VeeValidatePlugin);
    app.mount("#app");
  }
});
