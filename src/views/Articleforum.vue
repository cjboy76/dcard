<template>
  <div
    class="home container mx-auto mt-8 lg:grid lg:grid-cols-5 lg:gap-4 lg:mt-4"
  >
    <app-mainsidebar />
    <div class="col-span-3 bg-gray-100 mt-10 sm:rounded-t lg:rounded-xl">
      <div class="w-10/12 mx-auto mt-5 pt-5 lg:pt-0">
        <span class="font-bold text-3xl">
          {{ title.name }}
        </span>
      </div>
      <!-- default with no articles -->
      <div class="sticky top-16 bg-gray-100" v-if="defaultDisplay">
        <div class="container">
          <div class="flex border-b-2 pt-5 lg:pt-5 px-10"></div>
          <div class="flex justify-center items-center py-10">
            <span class="text-2xl"> 目前看板還沒有貼文哦~ </span>
          </div>
        </div>
      </div>
      <!-- if articles exits -->
      <div class="sticky top-16 bg-gray-100 rounded-t-xl" v-else>
        <div class="container main-tab">
          <div class="flex border-b-2 pt-5 lg:pt-3 px-10">
            <button class="tab-1 px-6 leading-10 relative cursor-pointer group">
              熱門
            </button>
            <button
              class="
                tab-2
                px-6
                leading-10
                relative
                cursor-pointer
                group
                text-gray-400
              "
            >
              最新
            </button>
          </div>
        </div>
      </div>
      <div class="container">
        <article
          @click="routerPush(item.key, item.docID)"
          v-for="item of state.articleList"
          :key="item.docID"
          class="
            w-10/12
            mx-auto
            grid grid-cols-3
            justify-center
            items-center
            py-2
            border-b-2
            cursor-pointer
          "
        >
          <div class="article-text col-span-2 w-11/12 mx-auto">
            <div class="boardtype text-gray-400 py-1">
              <span>{{ item.boardName }}</span>
            </div>
            <h2 class="font-bold text-lg">{{ item.title }}</h2>
            <p>
              {{ item.text }}
            </p>
            <div class="flex py-2">
              <span class="material-icons"> insert_comment </span>
              <div class="span">{{ item.comments }}</div>
              <span class="material-icons ml-2"> favorite_border </span>
              <div class="span">{{ item.likes }}</div>
            </div>
          </div>
          <div
            class="
              h-24
              w-24
              rounded-xl
              overflow-hidden
              col-span-1
              flex
              justify-center
              items-center
              mx-auto
            "
          >
            <img :src="item.imagesURL" class="max-w-sm" />
          </div>
        </article>
      </div>
    </div>
    <app-mainprofile />
  </div>
</template>

<script>
import AppMainsidebar from "@/components/Mainsidebar.vue";
import AppMainprofile from "@/components/Mainprofile.vue";
import { computed, reactive, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { db } from "@/includes/firebase";

export default {
  components: {
    AppMainsidebar,
    AppMainprofile,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const state = reactive({
      boardList: computed(() => store.state.boardList),
      articleList: [],
    });
    const title = computed(() =>
      state.boardList.find((item) => {
        return item.key === route.params.boardKey;
      })
    );
    const defaultDisplay = ref(true);
    // initializing get data
    const getArticles = async () => {
      const snapshots = await db
        .collectionGroup("userArticles")
        .where("boardKey", "==", route.params.boardKey)
        .get();
      if (!snapshots.empty) defaultDisplay.value = false;
      await snapshots.forEach((item) => {
        state.articleList.push({
          ...item.data(),
        });
      });
    };
    getArticles();
    const routerPush = (key, id) => {
      router.push({ name: "Article", params: { boardKey: key, aID: id } });
    };
    return {
      title,
      state,
      defaultDisplay,
      routerPush,
    };
  },
};
</script>
