<template>
  <div
    class="mx-auto lg:grid lg:grid-cols-10 lg:gap-4"
    style="margin-top: -70px"
  >
    <!-- editing -->
    <div
      v-show="CurrentStatus == 'editing'"
      class="col-start-2 col-end-10 h-screen bg-gray-100"
    >
      <div class="bg-gray-100">
        <div
          style="margin-top: 70px"
          class="
            w-10/12
            mx-auto
            border-b-2 border-gray-400
            text-2xl
            font-bold
            pt-10
            bg-gray-100
          "
        >
          <h1>建立貼文</h1>
        </div>
        <form @submit.prevent="nextStep" class="w-10/12 mx-auto bg-gray-100">
          <div class="flex justify0center items-center py-4">
            <select
              required
              v-model="postForm.board"
              class="
                outline-none
                bg-gray-200
                py-2
                px-4
                rounded-md
                hover:bg-gray-400 hover:text-gray-100
              "
            >
              選擇發文看板
              <option value="" disabled selected>選擇發文看板</option>
              <option v-for="item of boardList" :key="item.key" :value="item">
                {{ item.name }}
              </option>
            </select>
            <div class="ml-2 text-gray-500">{{ currentTime }}</div>
          </div>
          <textarea
            v-model="postForm.title"
            placeholder="標題"
            class="
              w-full
              text-4xl
              flex
              items-center
              h-12
              bg-gray-100
              outline-none
            "
          ></textarea>
          <div
            ref="editArea"
            contenteditable="true"
            class="outline-none editable pb-20"
            data-placeholder="內容..."
            style="white-space: pre-wrap leading-6"
          ></div>
          <div
            class="
              fixed
              bottom-0
              left-0
              w-full
              grid grid-cols-10
              bg-gray-100
              lg:bg-transparent
            "
          >
            <div
              class="
                col-start-2 col-end-10
                flex
                justify-around
                items-center
                py-5
                lg:bg-gray-100 lg:mx-2
              "
            >
              <label class="cursor-pointer flex justify-center items-center">
                <span class="material-icons text-gray-500">
                  add_photo_alternate
                </span>
                <span class="text-gray-500"> * 限制一張</span>
                <input
                  :disabled="photoAllow"
                  type="file"
                  accept="image/jpeg"
                  class="w-0"
                  @change="addPhoto"
                />
              </label>
              <div>
                <router-link
                  :to="{ name: 'Home' }"
                  class="rounded-md py-2 px-4 mr-4 font-bold"
                >
                  取消
                </router-link>
                <button
                  class="
                    bg-gray-200
                    text-gray-600
                    hover:bg-gray-600 hover:text-gray-100
                    rounded-md
                    py-2
                    px-4
                    font-bold
                  "
                  type="submit"
                >
                  下一步
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
    <!-- review -->
    <div
      v-show="CurrentStatus == 'review'"
      class="col-start-2 col-end-10 h-screen bg-gray-100"
    >
      <div class="bg-gray-100">
        <div
          style="margin-top: 70px"
          class="
            w-10/12
            mx-auto
            border-b-2 border-gray-400
            text-2xl
            font-bold
            pt-10
            bg-gray-100
          "
        >
          <h1>預覽貼文</h1>
        </div>
        <form @submit.prevent="submit" class="w-10/12 mx-auto bg-gray-100">
          <div class="flex justify0center items-center py-4">
            <div class="outline-none bg-gray-200 py-2 px-4 rounded-md">
              {{ postForm.board.name }}
            </div>
            <div class="ml-2 text-gray-500">{{ currentTime }}</div>
          </div>
          <div
            placeholder="標題"
            class="
              w-full
              text-4xl
              flex
              items-center
              h-12
              bg-gray-100
              outline-none
            "
          >
            {{ postForm.title }}
          </div>
          <div
            ref="reviewArea"
            class="outline-none editable pb-20"
            data-placeholder="內容..."
            style="white-space: pre-wrap leading-6"
          ></div>
          <div
            class="
              fixed
              bottom-0
              left-0
              w-full
              grid grid-cols-10
              bg-gray-100
              lg:bg-transparent
            "
          >
            <div
              class="
                col-start-2 col-end-10
                flex
                justify-end
                items-center
                py-5
                lg:bg-gray-100 lg:mx-2
              "
            >
              <div class="lg:mr-20">
                <router-link
                  :to="{ name: 'Home' }"
                  class="rounded-md py-2 px-4 mr-4 font-bold"
                >
                  取消
                </router-link>
                <button
                  :disabled="submissionAllow"
                  class="
                    bg-gray-200
                    text-gray-600
                    hover:bg-gray-600 hover:text-gray-100
                    rounded-md
                    py-2
                    px-4
                    font-bold
                  "
                  type="submit"
                >
                  發布貼文
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  <app-warning
    :showingWarning="showingWarning"
    @close="showingWarning = false"
  ></app-warning>
</template>

<script>
import AppWarning from "@/components/Warning.vue";
import { computed, reactive } from "@vue/runtime-core";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { storage, auth, timeStamp } from "../includes/firebase";
import { articlesCollection, db } from "@/includes/firebase";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const storageRef = storage.ref();
export default {
  components: {
    AppWarning,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const state = reactive({ user: {} });
    const boardList = computed(() => store.state.boardList);
    const CurrentStatus = ref("editing");
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
    // editing
    const submissionAllow = ref(false);
    const editArea = ref(null);
    const postForm = reactive({
      board: "",
      title: "",
      content: "",
      text: "",
      images: null,
    });
    const photoAllow = computed(() => {
      postForm.images ? true : false;
    });
    const addPhoto = (event) => {
      const file = event.target.files[0];
      const img = document.createElement("img");

      const reader = new FileReader();
      reader.onload = (event) => {
        img.setAttribute("src", event.target.result);
      };
      reader.readAsDataURL(file);
      postForm.images = file;
      img.classList.add("max-w-xs", "lg:max-w-md");
      editArea.value.appendChild(img);
    };
    const showingWarning = ref(false);
    const boardNumber = ref(null);
    const nextStep = async () => {
      // 取得看板貼文數
      let snapshot = await db
        .collection("boardList")
        .doc(postForm.board.key)
        .get();
      boardNumber.value = snapshot.data().count;
      // 判斷貼文有沒有完成
      if (!editArea.value.innerHTML || !postForm.title || !postForm.board) {
        showingWarning.value = true;
        return;
      }
      postForm.content = editArea.value.innerHTML;
      postForm.text = editArea.value.innerText;
      reviewArea.value.innerHTML = postForm.content;
      CurrentStatus.value = "review";
    };
    //review
    const reviewArea = ref(null);
    let url = "";
    const submit = async () => {
      NProgress.start();
      submissionAllow.value = true;
      boardNumber.value = boardNumber.value += 1;
      if (postForm.images) {
        const userImagesRef = storageRef.child(
          `userArticlesImage/${auth.currentUser.uid}/${
            postForm.images.name ? postForm.images.name : ""
          }`
        );
        const { task } = await userImagesRef.put(postForm.images);
        url = await task.snapshot.ref.getDownloadURL();
      }
      try {
        // 更新看板貼文數量
        await db
          .collection("boardList")
          .doc(postForm.board.key)
          .update({ count: boardNumber.value });
        // 取使用者資料
        state.user = await store.dispatch("getData");
        // 上傳貼文
        const task = await articlesCollection.add({
          boardName: postForm.board.name,
          boardKey: postForm.board.key,
          title: postForm.title,
          content: postForm.content,
          text: postForm.text,
          imagesURL: url,
          createdAt: timeStamp(),
          postingTime: currentTime.value,
          comments: 0,
          likes: 0,
          covid: "19",
          author: state.user,
          uID: auth.currentUser.uid,
        });
        // 資料庫加入貼文 id
        await articlesCollection.doc(task.id).update({
          docID: task.id,
        });
      } catch (error) {
        console.log(error);
        submissionAllow.value = false;
        NProgress.done();
        return;
      }
      submissionAllow.value = false;
      router.push({ name: "Myarticles" });
      NProgress.done();
    };
    return {
      currentTime,
      boardList,
      addPhoto,
      editArea,
      postForm,
      nextStep,
      showingWarning,
      CurrentStatus,
      reviewArea,
      submit,
      submissionAllow,
      photoAllow,
    };
  },
};
</script>
<style lang="scss" scoped>
.editable:empty:before {
  content: attr(data-placeholder);
  color: #bababa;
}
</style>
