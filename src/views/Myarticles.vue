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
          <!-- default with no articles-->
          <article
            class="w-10/12 mx-auto py-2 border-b-2"
            v-if="defaultDisplay"
          >
            <div class="article-text w-11/12 mx-auto text-center text-2xl py-8">
              還沒建立過文章噢 ～
            </div>
          </article>
          <!-- if articles exits -->
          <article
            @click="routerPush(item.boardKey, item.docID)"
            v-else
            v-for="item in state.artList"
            :key="item.docID"
            class="
              w-10/12
              mx-auto
              grid grid-cols-3
              py-2
              border-b-2
              cursor-pointer
            "
          >
            <div class="article-text col-span-2 w-11/12 mx-auto">
              <div class="boardtype text-gray-400 py-1">
                <span>{{ item.boardName }}</span>
              </div>
              <h2 class="font-bold text-lg" style="text-overflow: ellipsis">
                {{ item.title }}
              </h2>
              <p style="text-overflow: ellipsis">
                {{ item.text }}
              </p>
              <div class="comments flex py-2">
                <span class="material-icons"> insert_comment </span>
                <div class="span">{{ item.comments }}</div>
              </div>
            </div>
            <div
              class="article-image col-span-1 grid justify-center items-center"
            >
              <div
                class="
                  w-24
                  h-24
                  rounded-lg
                  overflow-hidden
                  flex
                  justify-center
                  items-center
                "
              >
                <img :src="item.imagesURL" class="max-w-xs" />
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
    <app-mainprofile />
  </div>
</template>

<script>
import { articlesCollection, auth } from "../includes/firebase";
import AppMainsidebar from "@/components/Mainsidebar.vue";
import AppMainprofile from "@/components/Mainprofile.vue";
import { reactive, ref } from "@vue/reactivity";
import { useRouter } from "vue-router";

export default {
  name: "Myarticles",
  components: {
    AppMainsidebar,
    AppMainprofile,
  },
  setup() {
    const router = useRouter();
    const state = reactive({ artList: [] });
    const defaultDisplay = ref(true);
    const getOwnArticles = async () => {
      const snapshot = await articlesCollection
        .where("uID", "==", auth.currentUser.uid)
        .get();
      if (!snapshot.empty) defaultDisplay.value = false;
      let targetList = [];
      await snapshot.docs.map((doc) =>
        targetList.push({
          ...doc.data(),
          docID: doc.id,
        })
      );
      state.artList = targetList;
    };
    getOwnArticles();
    const routerPush = (key, id) => {
      router.push({ name: "Article", params: { boardKey: key, aID: id } });
    };
    return {
      state,
      defaultDisplay,
      routerPush,
    };
  },
};
</script>
