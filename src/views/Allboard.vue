<template>
  <div
    class="home container mx-auto mt-8 lg:grid lg:grid-cols-5 lg:gap-4 lg:mt-4"
  >
    <app-mainsidebar></app-mainsidebar>
    <div class="col-start-2 col-end-5 bg-gray-100 lg:rounded-xl">
      <!-- header -->
      <div
        class="
          w-10/12
          mx-auto
          border-b-2 border-gray-400
          text-2xl
          font-bold
          pt-10
          sticky
          top-16
          bg-gray-100
        "
      >
        <h1>所有看板</h1>
      </div>
      <!-- article -->
      <div class="container pb-8">
        <article
          v-for="item of state.articleList"
          :key="item.name"
          class="w-10/12 mx-auto py-4 border-b-2 cursor-pointer flex"
        >
          <span class="material-icons ml-2"> {{ item.emoji }} </span>
          <h2 class="ml-2 text-lg">{{ item.name }}</h2>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import AppMainsidebar from "@/components/Mainsidebar.vue";
import { reactive } from "@vue/reactivity";
export default {
  name: "Favcomment",
  components: {
    AppMainsidebar,
  },
  setup() {
    const state = reactive({
      articleList: [
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
    });
    return {
      state,
    };
  },
};
</script>
