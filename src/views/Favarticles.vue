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
        <h1>收藏文章</h1>
      </div>
      <!-- article -->
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
    <app-mainprofile />
  </div>
</template>

<script>
import AppMainsidebar from "@/components/Mainsidebar.vue";
import AppMainprofile from "@/components/Mainprofile.vue";
import ArticleDefault from "@/components/Articledefault.vue";
import ArticleComponent from "@/components/Articlecomponent.vue";
import { db, auth, articlesCollection } from "@/includes/firebase";
import { ref } from "@vue/reactivity";

export default {
  name: "Favcomment",
  components: {
    AppMainsidebar,
    AppMainprofile,
    ArticleDefault,
    ArticleComponent,
  },
  setup() {
    const defaultDisplay = ref(true);
    const favoriteList = ref([]);
    const primitive = ref([]);
    const initial = async () => {
      // 拿使用者收藏文章陣列
      const snapshots = await db
        .collection("favoriteCol")
        .doc(auth.currentUser.uid)
        .get();
      favoriteList.value = [...snapshots.data().favoriteList];
      if (snapshots.data().favoriteList[0]) defaultDisplay.value = false;
      // 用陣列資料 遍歷找出文章
      await Promise.all(
        favoriteList.value.map(async (item) => {
          const target = await articlesCollection.doc(item).get();
          primitive.value.push(target.data());
        })
      );
    };
    initial();
    return {
      primitive,
      defaultDisplay,
    };
  },
};
</script>
