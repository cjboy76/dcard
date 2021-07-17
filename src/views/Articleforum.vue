<template>
  <div
    class="home container mx-auto mt-8 lg:grid lg:grid-cols-5 lg:gap-4 lg:mt-4"
  >
    <app-mainsidebar />
    <div
      class="col-span-3 bg-gray-100 mt-10 lg:mt-0 sm:rounded-t lg:rounded-xl"
    >
      <div class="w-10/12 mx-auto mt-5 pt-5 lg:pt-0 border-b-2 border-gray-400">
        <div class="font-bold text-3xl my-2">
          {{ title.name }}
        </div>
      </div>
      <!-- default with no articles -->
      <div class="sticky top-16 bg-gray-100" v-if="defaultDisplay">
        <div class="container">
          <div class="flex justify-center items-center py-10">
            <span class="text-2xl"> 目前看板還沒有貼文哦~ </span>
          </div>
        </div>
      </div>
      <!-- if articles exits -->
      <div class="container">
        <article
          @click="routerPush(item.boardKey, item.docID)"
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
              <div class="span ml-1">{{ item.comments }}</div>
              <span class="material-icons ml-1 text-gray-700 cursor-pointer">
                favorite
              </span>
              <span>{{ item.likes }}</span>
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
            <img :src="item.imagesURL" class="max-w-sm w-40" />
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
import {
  computed,
  reactive,
  ref,
  onBeforeMount,
  onBeforeUnmount,
} from "@vue/runtime-core";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { articlesCollection } from "@/includes/firebase";

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
    // 計算捲軸觸底觸發 getComment()
    const scrollHandler = () => {
      const { scrollTop, offsetHeight } = document.documentElement;
      const { innerHeight } = window;
      const bottomOfWindow =
        Math.round(scrollTop) + innerHeight === offsetHeight;
      if (bottomOfWindow) {
        getArticles();
      }
    };
    onBeforeMount(() => {
      window.addEventListener("scroll", scrollHandler);
    });
    onBeforeUnmount(() => {
      window.removeEventListener("scroll", scrollHandler);
    });
    // 避免重複 request
    const pendingRequest = ref(false);
    const getArticles = async () => {
      if (pendingRequest.value) {
        return;
      }
      pendingRequest.value = true;
      let snapshots;
      if (state.articleList.length) {
        const lastOne = await articlesCollection
          .doc(state.articleList[state.articleList.length - 1].docID)
          .get();
        snapshots = await articlesCollection
          .where("boardKey", "==", route.params.boardKey)
          .startAfter(lastOne)
          .limit(30)
          .get();
      } else {
        snapshots = await articlesCollection
          .where("boardKey", "==", route.params.boardKey)
          .limit(30)
          .get();
      }
      if (!snapshots.empty) defaultDisplay.value = false;
      snapshots.forEach((item) => {
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
