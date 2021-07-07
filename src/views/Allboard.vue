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
          v-for="item of boardList"
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
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";

export default {
  name: "Favcomment",
  components: {
    AppMainsidebar,
  },
  setup() {
    const store = useStore();
    return {
      boardList: computed(() => store.state.boardList),
    };
  },
};
</script>
