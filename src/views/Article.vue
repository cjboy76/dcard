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
            <div class="text-3xl font-bold">{{ state.article.title }}</div>
            <div class="mb-3">
              <span class="text-green-600">{{ state.article.boardName }}</span>
              <span class="text-gray-400 ml-2">
                {{ state.article.postingTime }}
              </span>
            </div>
            <div class="article overflow-y-scroll py-2">
              <div v-html="state.article.content"></div>
            </div>
            <!-- comments number -->
            <div class="my-6 flex items-center">
              <span class="material-icons ml-2 text-gray-700">
                insert_comment
              </span>
              <span class="ml-1">{{ state.commentList.length }}</span>
              <span
                @click="addLike"
                class="material-icons ml-1 text-gray-700 cursor-pointer"
                :class="{ 'text-pink-500': likeStatus }"
              >
                favorite
              </span>
              <span>{{ likeCount }}</span>
              <span
                @click="addFavorite"
                :class="{ 'text-green-600': favoriteStatus }"
                class="material-icons ml-2 cursor-pointer text-gray-700"
              >
                bookmark
              </span>
              <div
                class="flex justify-center items-center"
                v-if="pendingSuccess"
              >
                <div
                  class="flex justify-center items-center"
                  v-show="pendingStatus == 'good'"
                >
                  <span class="material-icons text-green-600"> done </span>
                  <span class="text-green-600">已加入收藏文章</span>
                </div>
                <div
                  class="flex justify-center items-center"
                  v-show="pendingStatus == 'bad'"
                >
                  <span class="material-icons text-green-600"> delete </span>
                  <span class="text-green-600">已移除收藏文章</span>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
      <!-- leaving comments -->
      <app-articlecomment
        @addComment="addComment"
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
import { auth, timeStamp, db, articlesCollection } from "@/includes/firebase";
import { useRoute, onBeforeRouteLeave } from "vue-router";
import { reactive, ref, computed } from "@vue/reactivity";
import { onBeforeUnmount, onBeforeMount } from "@vue/runtime-core";

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
    const favoriteList = ref([]);
    const likeList = ref([]);
    const likeCount = ref(0);
    const borderColor = ref("border-gray-700");
    const initial = async () => {
      // 拿取本文章資料
      const articleSnapshot = await articlesCollection
        .doc(route.params.aID)
        .get();
      // 收藏文章陣列
      const favoriteSnapshot = await db
        .collection("favoriteCol")
        .doc(auth.currentUser.uid)
        .get();
      // 文章按讚數資料
      const likeSnapshot = await db
        .collection("likeCol")
        .doc(route.params.aID)
        .get();
      // 存取文章資料
      state.article = articleSnapshot.data();
      // 如果存在收藏文章陣列 就 catch
      if (favoriteSnapshot.exists) {
        favoriteList.value = [...favoriteSnapshot.data().favoriteList];
      }
      // 如果存在按讚文章陣列 就 catch
      if (likeSnapshot.exists) {
        likeList.value = [...likeSnapshot.data().likeList];
      }
      // 用文章資料計算頭照邊框男女樣式
      if (state.article.author.gender) {
        state.article.author.gender == "男生"
          ? (borderColor.value = "border-blue-200")
          : (borderColor.value = "border-red-200");
      }
      // 用文章資料計算文章按讚數
      if (state.article.likes) {
        likeCount.value = state.article.likes;
      }
    };
    initial();
    // 按讚文章部分
    const likeStatus = computed(() => {
      const rule = (element) => element == auth.currentUser.uid;
      if (likeList.value.some(rule)) {
        return true;
      } else {
        return false;
      }
    });
    const addLike = async () => {
      if (likeStatus.value) {
        likeCount.value += -1;
        let index = likeList.value.indexOf(auth.currentUser.uid);
        likeList.value.splice(index, 1);
      } else {
        likeCount.value += 1;
        likeList.value.push(auth.currentUser.uid);
      }
      // 更新按讚數
      await articlesCollection.doc(route.params.aID).update({
        likes: likeCount.value,
      });
      // 更新按讚文章陣列
      await db.collection("likeCol").doc(route.params.aID).set(
        {
          likeList: likeList.value,
        },
        { merge: true }
      );
    };
    // 新增刪除收藏貼文
    const pendingSuccess = ref(false);
    const pendingStatus = ref("good");
    const favoriteStatus = computed(() => {
      const rule = (element) => element == route.params.aID;
      return favoriteList.value.some(rule);
    });
    const addFavorite = () => {
      pendingSuccess.value = true;
      const rule = (element) => element == route.params.aID;
      if (favoriteList.value.some(rule)) {
        let index = favoriteList.value.indexOf(route.params.aID);
        favoriteList.value.splice(index, 1);
        pendingStatus.value = "bad";
        setTimeout(() => {
          pendingSuccess.value = false;
        }, 1000);
        return;
      }
      favoriteList.value.push(route.params.aID);
      pendingStatus.value = "good";
      setTimeout(() => {
        pendingSuccess.value = false;
      }, 1000);
    };
    // 留言部份
    const commentRef = db
      .collection("comments")
      .doc(route.params.aID)
      .collection("commentList");
    const submission = ref(false);
    // 計算捲軸觸底觸發 getComment()
    const scrollHandler = () => {
      const { scrollTop, offsetHeight } = document.documentElement;
      const { innerHeight } = window;
      const bottomOfWindow =
        Math.round(scrollTop) + innerHeight === offsetHeight;
      if (bottomOfWindow) {
        getComment();
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
    const getComment = async () => {
      if (pendingRequest.value) {
        return;
      }
      pendingRequest.value = true;
      let snapshots;
      if (state.commentList.length) {
        const lastOne = await commentRef
          .doc(state.commentList[state.commentList.length - 1].docID)
          .get();
        snapshots = await commentRef
          .orderBy("createdAt", "desc")
          .startAfter(lastOne)
          .limit(10)
          .get();
      } else {
        snapshots = await commentRef
          .orderBy("createdAt", "desc")
          .limit(10)
          .get();
      }
      snapshots.forEach((doc) => {
        state.commentList.push({
          ...doc.data(),
          docID: doc.id,
        });
      });
      pendingRequest.value = false;
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
          articleID: route.params.aID,
        });
      } catch (error) {
        submission.value = false;
        alert("留言失敗，請稍後再嘗試");
        return;
      }
      submission.value = false;
      getComment();
    };
    // before leaving && upload data
    onBeforeRouteLeave(async (to, from, next) => {
      // 更新文章 comments 數量
      await articlesCollection.doc(route.params.aID).update({
        comments: state.commentList.length,
      });
      // 更新收藏文章
      await db.collection("favoriteCol").doc(auth.currentUser.uid).set({
        favoriteList: favoriteList.value,
      });
      next();
    });

    return {
      state,
      borderColor,
      submission,
      addComment,
      addFavorite,
      pendingSuccess,
      pendingStatus,
      favoriteStatus,
      likeStatus,
      addLike,
      likeCount,
    };
  },
};
</script>
