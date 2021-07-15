import { createStore } from "vuex";
import { auth, usersCollection } from "@/includes/firebase";

export default createStore({
  state: {
    authModalShow: false,
    userLoggedIn: false,
    userPhoto: "",
    boardList: [
      {
        name: "心情",
        emoji: "emoji_emotions",
        key: "emotion",
        image: "emotions.png",
      },
      {
        name: "感情",
        emoji: "volunteer_activism",
        key: "relationship",
        image: "relationship.jpeg",
      },
      {
        name: "閒聊",
        emoji: "forum",
        key: "gossip",
        image: "gossip.jpeg",
      },
      {
        name: "穿搭",
        emoji: "checkroom",
        key: "outfit",
        image: "outfits.png",
      },
      {
        name: "星座",
        emoji: "insights",
        key: "starsign",
        image: "starsign.jpeg",
      },
      {
        name: "音樂",
        emoji: "headphones",
        key: "music",
        image: "music.jpeg",
      },
      {
        name: "電影",
        emoji: "movie",
        key: "movie",
        image: "movie.jpeg",
      },
      {
        name: "戲劇",
        emoji: "live_tv",
        key: "drama",
        image: "drama.jpeg",
      },
      {
        name: "美食",
        emoji: "restaurant",
        key: "food",
        image: "food.jpeg",
      },
      {
        name: "旅遊",
        emoji: "flight",
        key: "travel",
        image: "travel.jpeg",
      },
      {
        name: "遊戲",
        emoji: "sports_esports",
        key: "game",
        image: "game.png",
      },
      {
        name: "運動",
        emoji: "sports_basketball",
        key: "sport",
        image: "sport.png",
      },
    ],
  },
  mutations: {
    toggleAuthModal(state) {
      state.authModalShow = !state.authModalShow;
    },
    toggleAuth(state) {
      state.userLoggedIn = !state.userLoggedIn;
    },
    setPhoto(state, payload) {
      state.userPhoto = payload;
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
    async getData({ commit }) {
      const userRef = await usersCollection.doc(auth.currentUser.uid).get();
      commit("setPhoto", userRef.data().profileImageURL);
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
