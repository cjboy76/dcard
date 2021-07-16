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
            :class="{ 'text-gray-400': tab == 'comments' }"
          >
            最新
          </button>
        </div>
      </div>
    </div>
    <!-- articles -->
    <div class="container pb-8">
      <router-link
        :to="{
          name: 'Article',
          params: { boardKey: item.boardKey, aID: item.docID },
        }"
        v-for="item of state.primitive"
        :key="item.docID"
        class="w-10/12 mx-auto grid grid-cols-3 py-2 border-b-2"
      >
        <div class="article-text col-span-2 w-11/12 mx-auto">
          <div class="boardtype text-gray-400 py-1">
            <span>{{ item.boardName }}</span>
          </div>
          <h2 class="font-bold text-lg">{{ item.title }}</h2>
          <p style="text-overflow: ellipsis">
            {{ item.text }}
          </p>
          <div class="comments flex py-2">
            <span class="material-icons"> insert_comment </span>
            <div class="span">{{ item.comments }}</div>
          </div>
        </div>
        <div class="article-image col-span-1 grid justify-center items-center">
          <div
            class="
              h-24
              w-24
              rounded-xl
              overflow-hidden
              flex
              justify-center
              items-center
            "
          >
            <img
              :src="item.imagesURL"
              :alt="item.imageURL"
              class="max-w-sm w-36"
            />
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { articlesCollection } from "@/includes/firebase";
import { reactive, ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";

export default {
  name: "AppMaincontent",
  setup() {
    const state = reactive({
      primitive: [],
    });
    const tab = ref("comments");
    const initial = async () => {
      const list = [];
      let snapshots = await articlesCollection
        .orderBy(tab.value, "desc")
        .limit(30)
        .get();
      await snapshots.forEach((document) => {
        list.push(document.data());
      });
      state.primitive = list;
    };
    const switchHandler = (value) => {
      if (value) {
        tab.value = "comments";
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
    };
  },
};
</script>
