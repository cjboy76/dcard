<template>
  <div
    class="
      col-span-3
      bg-gray-100
      mt-10
      lg:mt-0
      sm:rounded-t
      rounded-xl
      overflow-hidden
    "
  >
    <!-- switch-tab -->
    <div class="sticky bg-gray-100 rounded-xl">
      <div class="container main-tab">
        <div class="flex border-b-2 pt-5 lg:pt-7 px-10">
          <button
            @click="switchHandler(true)"
            class="tab-1 px-6 leading-10 relative cursor-pointer"
            :class="{ 'text-gray-400': tab == 'createdAt' }"
          >
            熱門
          </button>
          <button
            @click="switchHandler(false)"
            class="tab-2 px-6 leading-10 relative cursor-pointer"
            :class="{ 'text-gray-400': tab == 'likes' }"
          >
            最新
          </button>
        </div>
      </div>
    </div>
    <!-- articles -->
    <div class="container pb-8">
      <!-- default with no data -->
      <article-default v-if="defaultDisplay" />
      <!-- if data exists -->
      <article-component
        v-else
        v-for="item of state.primitive"
        :key="item.docID"
        :article="item"
      />
    </div>
  </div>
</template>

<script>
import ArticleDefault from "@/components/Articledefault.vue";
import ArticleComponent from "@/components/Articlecomponent.vue";
import { articlesCollection } from "@/includes/firebase";
import { reactive, ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";

export default {
  name: "AppMaincontent",
  components: {
    ArticleDefault,
    ArticleComponent,
  },
  setup() {
    const state = reactive({
      primitive: [],
    });
    const tab = ref("likes");
    const defaultDisplay = ref(true);
    const initial = async () => {
      const list = [];
      let snapshots = await articlesCollection
        .orderBy(tab.value, "desc")
        .limit(30)
        .get();
      if (!snapshots.empty) defaultDisplay.value = false;
      await snapshots.forEach((document) => {
        let snippet =
          document.data().text.length > 30
            ? document.data().text.substring(0, 30) + "..."
            : document.data().text;
        list.push({ ...document.data(), snippet });
      });
      state.primitive = list;
    };
    const switchHandler = (value) => {
      if (value) {
        tab.value = "likes";
      } else {
        tab.value = "createdAt";
      }
    };
    watch(tab, () => {
      initial();
    });
    initial();
    return {
      state,
      switchHandler,
      tab,
      defaultDisplay,
    };
  },
};
</script>
