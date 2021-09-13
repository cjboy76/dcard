<template>
  <div
    class="home container mx-auto mt-8 lg:grid lg:grid-cols-5 lg:gap-4 lg:mt-4"
  >
    <app-mainsidebar />
    <div
      class="col-span-3 bg-gray-100 mt-10 lg:mt-0 sm:rounded-t lg:rounded-xl"
    >
      <!-- board title -->
      <div class="w-10/12 mx-auto mt-5 pt-5 lg:pt-0 border-b-2 border-gray-400">
        <div class="font-bold text-3xl my-2">
          {{ title.name }}
        </div>
      </div>
      <div class="container pb-8">
        <!-- default with no data -->
        <article-default v-if="defaultDisplay" />
        <!-- if data exists -->
        <article-component
          v-else
          v-for="item of state.articleList"
          :key="item.docID"
          :article="item"
        />
      </div>
    </div>
    <app-mainprofile />
  </div>
</template>

<script>
import AppMainsidebar from "@/components/Mainsidebar.vue";
import AppMainprofile from "@/components/Mainprofile.vue";
import ArticleDefault from "@/components/Articledefault.vue";
import ArticleComponent from "@/components/Articlecomponent.vue";
import {
  computed,
  reactive,
  ref,
  onBeforeMount,
  onBeforeUnmount,
} from "@vue/runtime-core";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { articlesCollection } from "@/includes/firebase";

export default {
  components: {
    AppMainsidebar,
    AppMainprofile,
    ArticleDefault,
    ArticleComponent,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
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
        console.log("reach!!");
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
          .limit(20)
          .get();
      } else {
        snapshots = await articlesCollection
          .where("boardKey", "==", route.params.boardKey)
          .limit(20)
          .get();
      }
      if (!snapshots.empty) defaultDisplay.value = false;
      let list = [];
      snapshots.forEach((item) => {
        console.log(item.data());
        let snippet =
          item.data().text.length > 30
            ? item.data().text.substring(0, 30) + "..."
            : item.data().text;
        list.push({
          ...item.data(),
          snippet,
        });
      });
      state.articleList = list;
    };
    getArticles();
    return {
      title,
      state,
      defaultDisplay,
    };
  },
};
</script>
