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
// initial firebase before initialize the Vue app
// 如果 app 不存在的話再建立一個 vue instance
auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);
    app.use(store);
    app.use(router);
    app.use(VeeValidatePlugin);
    app.mount("#app");
  }
});
