<template>
  <div
    class="home container mx-auto mt-8 lg:grid lg:grid-cols-5 lg:gap-4 lg:mt-4"
  >
    <app-mainsidebar />
    <div class="col-start-2 col-end-5 bg-gray-100 sm:rounded-xl">
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
        <h1>發表文章</h1>
      </div>
      <!-- article -->
      <div class="container pb-8">
        <div class="bg-gray-100">
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
    </div>
    <app-mainprofile />
  </div>
</template>

<script>
import AppMainsidebar from "@/components/Mainsidebar.vue";
import AppMainprofile from "@/components/Mainprofile.vue";
import ArticleDefault from "@/components/Articledefault.vue";
import ArticleComponent from "@/components/Articlecomponent.vue";
import { articlesCollection, auth } from "../includes/firebase";
import { reactive, ref } from "@vue/reactivity";

export default {
  name: "Myarticles",
  components: {
    AppMainsidebar,
    AppMainprofile,
    ArticleDefault,
    ArticleComponent,
  },
  setup() {
    const state = reactive({ articleList: [] });
    const defaultDisplay = ref(true);
    const getOwnArticles = async () => {
      const snapshot = await articlesCollection
        .where("uID", "==", auth.currentUser.uid)
        .get();
      if (!snapshot.empty) defaultDisplay.value = false;
      let targetList = [];
      await snapshot.docs.map((doc) => {
        let snippet =
          doc.data().text.length > 30
            ? doc.data().text.substring(0, 30) + "..."
            : doc.data().text;
        targetList.push({
          ...doc.data(),
          docID: doc.id,
          snippet,
        });
      });
      state.articleList = targetList;
    };
    getOwnArticles();
    return {
      state,
      defaultDisplay,
    };
  },
};
</script>
