import { createStore } from "vuex";
import { auth, usersCollection } from "@/includes/firebase";

export default createStore({
  state: {
    authModalShow: false,
    userLoggedIn: false,
  },
  mutations: {
    toggleAuthModal(state) {
      state.authModalShow = !state.authModalShow;
    },
    toggleAuth(state) {
      state.userLoggedIn = !state.userLoggedIn;
    },
  },
  actions: {
    async register({ commit }, payload) {
      //auth create an Account
      const userCredential = await auth.createUserWithEmailAndPassword(
        payload.email,
        payload.password
      );
      //firebase set document data
      await usersCollection.doc(userCredential.user.uid).set({
        name: payload.name,
        email: payload.email,
        password: payload.password,
      });
      // firebase set document data's property
      await userCredential.user.updateProfile({
        displayName: payload.name,
      });
      commit("toggleAuth");
    },
    async login({ commit }, payload) {
      await auth.signInWithEmailAndPassword(payload.email, payload.password);
      commit("toggleAuth");
    },
    async logout({ commit }) {
      await auth.signOut();
      commit("toggleAuth");
      window.location.reload();
    },
    // app.vue載入時呼叫
    init_login({ commit }) {
      // 判斷有無使用者登入
      auth.onAuthStateChanged(function (user) {
        if (user || auth.currentUser) {
          // 切換 false 變 true
          commit("toggleAuth");
        }
      });
    },
    async getData() {
      const userRef = await usersCollection.doc(auth.currentUser.uid).get();
      return {
        ...userRef.data(),
      };
    },
    async updateData({ dispatch }, payload) {
      await usersCollection.doc(auth.currentUser.uid).update(payload);
      await dispatch("getData");
    },
  },
  modules: {},
});
