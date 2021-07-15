<template>
  <div
    class="home container mx-auto mt-8 lg:grid lg:grid-cols-5 lg:gap-4 lg:mt-4"
  >
    <app-mainsidebar />
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
        <h1>即時熱門看板</h1>
      </div>
      <!-- article -->
      <div class="container mb-8">
        <article
          @click="routerPush(item.key)"
          v-for="(item, index) of boardList"
          :key="item.key"
          class="
            w-10/12
            mx-auto
            py-2
            border-b-2
            cursor-pointer
            flex
            justify-start
            items-center
          "
        >
          <span class="ml-2">{{ index + 1 }}</span>
          <div
            class="
              w-12
              h-12
              rounded-full
              overflow-hidden
              ml-3
              flex
              justify-center
              items-center
              bg-gray-100
            "
          >
            <img :src="item.image" class="max-w-xs w-16" alt="看板圖片" />
          </div>
          <h2 class="ml-3">{{ item.name }}</h2>
        </article>
      </div>
    </div>
    <app-mainprofile />
  </div>
</template>

<script>
import AppMainsidebar from "@/components/Mainsidebar.vue";
import AppMainprofile from "@/components/Mainprofile.vue";
import { useRouter } from "vue-router";
import { db } from "../includes/firebase";
import { ref } from "@vue/reactivity";

export default {
  name: "Favcomment",
  components: {
    AppMainsidebar,
    AppMainprofile,
  },
  setup() {
    const router = useRouter();
    const routerPush = (value) => {
      router.push({ name: "Articleforum", params: { boardKey: value } });
    };
    const boardList = ref([]);
    const initial = async () => {
      const list = [];
      const snapshots = await db
        .collection("boardList")
        .orderBy("count", "desc")
        .get();
      snapshots.forEach((document) => {
        list.push(document.data());
      });
      boardList.value = list;
    };
    initial();
    return {
      routerPush,
      boardList,
    };
  },
};
</script>
