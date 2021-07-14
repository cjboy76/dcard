<template>
  <div class="container mx-auto mt-8 lg:grid lg:grid-cols-5 lg:gap-x-4 lg:mt-4">
    <app-mainsidebar />
    <div
      class="col-start-2 col-end-5 bg-gray-100 sm:rounded-xl overflow-hidden"
    >
      <!-- header -->
      <div
        class="
          w-10/12
          mx-auto
          border-b-2 border-gray-400
          text-2xl
          font-bold
          pt-10
          top-16
          bg-gray-100
        "
      >
        <h1>文章</h1>
      </div>
      <!-- article -->
      <div class="w-10/12 mx-auto">
        <div class="bg-gray-100">
          <!-- header -->
          <div class="flex justify-start items-center my-2">
            <div
              :class="borderColor"
              class="
                w-12
                h-12
                rounded-full
                overflow-hidden
                flex
                justify-center
                items-center
                border-2
              "
            >
              <img
                v-if="state.article?.author?.profileImageURL"
                :src="state.article?.author?.profileImageURL"
                class="max-w-xs w-20"
              />
              <img v-else src="../assets/user.svg" class="object-cover" />
            </div>
            <span class="text-lg font-semibold ml-2">
              {{ state.article?.author?.name }}
            </span>
          </div>
          <!-- article -->
          <article>
            <div class="my-4">
              <h1 class="text-3xl font-semibold">{{ state.article.titie }}</h1>
              <span class="text-green-600">{{ state.article.boardName }}</span>
              <span class="text-gray-400 ml-2">
                {{ state.article.postingTime }}
              </span>
            </div>
            <div class="article overflow-y-scroll">
              <div v-html="state.article.content"></div>
            </div>
            <!-- likes && comments number -->
            <div class="my-6 flex items-center">
              <span
                @click="likeArticle"
                class="material-icons ml-2 cursor-pointer"
                :class="{ 'text-red-400': state.article.likesStatus }"
              >
                favorite_border
              </span>
              <span>{{ state.article.likes }}</span>
              <span class="material-icons ml-2"> insert_comment </span>
              <span>{{ state.commentList.length }}</span>
            </div>
          </article>
        </div>
      </div>
      <!-- leaving comments -->
      <app-articlecomment
        @addComment="addComment"
        @updateCommentLike="updateCommentLike"
        :state="state"
        :submisstion="submission"
      />
    </div>
    <app-mainprofile />
  </div>
</template>

<script>
import AppMainsidebar from "@/components/Mainsidebar.vue";
import AppMainprofile from "@/components/Mainprofile.vue";
import AppArticlecomment from "@/components/Articlecomment.vue";
import { articlesCollection, auth, timeStamp, db } from "@/includes/firebase";
import { useRoute, onBeforeRouteLeave } from "vue-router";
import { reactive, ref, computed } from "@vue/reactivity";

export default {
  components: {
    AppMainsidebar,
    AppMainprofile,
    AppArticlecomment,
  },
  setup() {
    // article part
    const route = useRoute();
    const state = reactive({
      article: {},
      commentList: [],
    });
    const borderColor = ref("border-gray-700");

    const initial = async () => {
      const list = [];
      const articleSnapshot = await db
        .collectionGroup("userArticles")
        .where("docID", "==", route.params.aID)
        .get();
      articleSnapshot.forEach((doc) => {
        list.push({ ...doc.data() });
      });
      state.article = list[0];
      if (state.article.author.gender) {
        state.article.author.gender == "男生"
          ? (borderColor.value = "border-blue-200")
          : (borderColor.value = "border-red-200");
      }
    };
    initial();
    const likeArticle = () => {
      if (state.article.likesStatus) {
        state.article.likes += -1;
        state.article.likesStatus = false;
        return;
      }
      state.article.likes += 1;
      state.article.likesStatus = true;
    };
    // comment part
    const submission = ref(false);
    const commentRef = articlesCollection
      .doc(auth.currentUser.uid)
      .collection("userArticles")
      .doc(route.params.aID)
      .collection("articleComments");
    const getComment = async () => {
      const list = [];
      const snapshots = await commentRef
        .orderBy("createdAt", "desc")
        .limit(10)
        .get();
      snapshots.forEach((doc) => {
        list.push({
          ...doc.data(),
          docID: doc.id,
        });
      });
      state.commentList = list;
    };
    getComment();
    const currentTime = computed(() => {
      let time = new Date();
      let month = time.getMonth() + 1;
      let date = time.getDate();
      let hour = time.getHours();
      let minute = time.getMinutes();
      time = `${month}月${date}日  ${hour}:${
        minute < 10 ? "0" + minute : minute
      }`;
      return time;
    });
    const addComment = async (value) => {
      submission.value = true;
      if (!value) return;
      try {
        await commentRef.add({
          postingtime: currentTime.value,
          content: value,
          name: auth.currentUser.displayName,
          createdAt: timeStamp(),
          likesNum: 0,
          likesStatus: false,
        });
      } catch (error) {
        submission.value = false;
        alert("留言失敗，請稍後再嘗試");
        return;
      }
      submission.value = false;
      getComment();
    };
    const likeList = ref([]);
    const updateCommentLike = (index, docID) => {
      const target = state.commentList[index];
      if (target.likesStatus) {
        target.likesNum += -1;
        target.likesStatus = false;
        likeList.value = likeList.value.filter((item) => {
          return item != docID;
        });
        return;
      }
      target.likesNum += 1;
      target.likesStatus = true;
      likeList.value.push({ id: docID, i: index });
    };
    // before leaving && upload data
    onBeforeRouteLeave(async (to, from, next) => {
      const articleSnapshot = await db
        .collectionGroup("userArticles")
        .where("docID", "==", route.params.aID)
        .get();
      // await db
      //   .collectionGroup("userArticles")
      //   .where("docID", "==", route.params.aID)
      await Promise.all(
        articleSnapshot.docs.map(async (snapshot) => {
          await snapshot.ref.update({
            comments: state.commentList.length,
            likes: state.article.likes,
            likesStatus: state.article.likesStatus,
          });
        })
      );

      await Promise.all(
        likeList.value.map(async (item) => {
          await commentRef.doc(item.id).update({
            likesStatus: state.commentList[item.i].likesStatus,
            likesNum: state.commentList[item.i].likesNum,
          });
        })
      );
      next();
    });

    return {
      state,
      likeArticle,
      borderColor,
      updateCommentLike,
      submission,
      addComment,
    };
  },
};
</script>
