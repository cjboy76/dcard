import { createStore } from "vuex";
import { auth, usersCollection } from "@/includes/firebase";

export default createStore({
  state: {
    authModalShow: false,
    userLoggedIn: false,
    boardList: [
      { name: "心情", emoji: "emoji_emotions", key: "emotion" },
      { name: "感情", emoji: "volunteer_activism", key: "relationship" },
      { name: "閒聊", emoji: "forum", key: "gossip" },
      { name: "穿搭", emoji: "checkroom", key: "outfit" },
      { name: "星座", emoji: "insights", key: "starsign" },
      { name: "音樂", emoji: "headphones", key: "music" },
      { name: "電影", emoji: "movie", key: "movie" },
      { name: "戲劇", emoji: "live_tv", key: "drama" },
      { name: "美食", emoji: "restaurant", key: "food" },
      { name: "旅遊", emoji: "flight", key: "travel" },
      { name: "遊戲", emoji: "sports_esports", key: "game" },
      { name: "運動", emoji: "sports_basketball", key: "sport" },
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
      const user = auth.currentUser;
      if (user) {
        // 切換 false 變 true
        commit("toggleAuth");
      }
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
});
