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
        <article
          v-if="defaultDisplay"
          class="
            w-10/12
            mx-auto
            grid
            justify-center
            items-center
            py-2
            border-b-2
          "
        >
          <span class="my-10 text-2xl">目前還沒有收藏文章喔～</span>
        </article>
        <router-link
          :to="{
            name: 'Article',
            params: { boardKey: item.boardKey, aID: item.docID },
          }"
          v-else
          v-for="item of primitive"
          :key="item.docID"
          class="w-10/12 mx-auto grid grid-cols-3 py-2 border-b-2"
        >
          <div class="article-text col-span-2 w-11/12 mx-auto">
            <div class="boardtype text-gray-400 py-1">
              <span>{{ item.boardName }}</span>
            </div>
            <h2 class="font-bold text-lg">{{ item.title }}</h2>
            <p style="text-overflow: ellipsis">{{ item.text }}</p>
            <div class="flex py-2">
              <span class="material-icons"> insert_comment </span>
              <div class="span">{{ item.comments }}</div>
              <span class="material-icons ml-1 text-gray-700 cursor-pointer">
                favorite
              </span>
              <span>{{ item.likes }}</span>
            </div>
          </div>
          <div
            class="article-image col-span-1 grid justify-center items-center"
          >
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
          </div>
        </router-link>
      </div>
    </div>
    <app-mainprofile />
  </div>
</template>

<script>
import AppMainsidebar from "@/components/Mainsidebar.vue";
import AppMainprofile from "@/components/Mainprofile.vue";
import { db, auth, articlesCollection } from "@/includes/firebase";
import { ref } from "@vue/reactivity";

export default {
  name: "Favcomment",
  components: {
    AppMainsidebar,
    AppMainprofile,
  },
  setup() {
    const defaultDisplay = ref(true);
    const favoriteList = ref([]);
    const primitive = ref([]);
    const initial = async () => {
      const snapshots = await db
        .collection("favoriteCol")
        .doc(auth.currentUser.uid)
        .get();
      if (snapshots.exists) defaultDisplay.value = false;
      favoriteList.value = [...snapshots.data().favoriteList];
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
