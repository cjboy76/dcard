import { createStore } from "vuex";
import { auth, usersCollection } from "@/includes/firebase";

export default createStore({
  state: {
    authModalShow: false,
    userLoggedIn: false,
    boardList: [
      { name: "心情", emoji: "emoji_emotions" },
      { name: "感情", emoji: "volunteer_activism" },
      { name: "閒聊", emoji: "forum" },
      { name: "穿搭", emoji: "checkroom" },
      { name: "星座", emoji: "insights" },
      { name: "音樂", emoji: "headphones" },
      { name: "電影", emoji: "movie" },
      { name: "戲劇", emoji: "live_tv" },
      { name: "美食", emoji: "restaurant" },
      { name: "旅遊", emoji: "flight" },
      { name: "遊戲", emoji: "sports_esports" },
      { name: "運動", emoji: "sports_basketball" },
    ],
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
      commit("toggleAuthModal");
    },
    async logout({ commit }) {
      await auth.signOut();
      commit("toggleAuth");
      window.location.reload();
    },
    // app.vue載入時呼叫
    init_login({ commit }) {
      auth.onAuthStateChanged(function (user) {
        if (user) {
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
