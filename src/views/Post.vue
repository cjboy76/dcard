<template>
  <div
    class="mx-auto lg:grid lg:grid-cols-10 lg:gap-4"
    style="margin-top: -70px"
  >
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
              v-model="postForm.boardType"
              class="
                outline-none
                bg-gray-200
                py-2
                px-4
                rounded-md
                hover:bg-gray-600 hover:text-gray-100
              "
            >
              選擇發文看板
              <option value="" disabled selected>選擇發文看板</option>
              <option v-for="item of boardList" :key="item.name">
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
                <span class="text-gray-500">添加照片</span>
                <input
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
        <form @submit.prevent="nextStep" class="w-10/12 mx-auto bg-gray-100">
          <div class="flex justify0center items-center py-4">
            <div class="outline-none bg-gray-200 py-2 px-4 rounded-md">
              {{ postForm.boardType }}
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
                grid grid-cols-10
                py-5
                lg:bg-gray-100 lg:mx-2
              "
            >
              <div class="col-start-7 col-end-10">
                <router-link
                  :to="{ name: 'Home' }"
                  class="rounded-md py-2 px-4 mr-4 font-bold"
                >
                  取消
                </router-link>
                <button
                  class="
                    bg-gray-500
                    text-gray-100
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
import { ref } from "vue";

let currentTime = new Date();
let month = currentTime.getMonth() + 1;
let date = currentTime.getDate();
let hour = currentTime.getHours();
let minute = currentTime.getMinutes();
currentTime = `${month}月${date}日  ${hour}:${
  minute < 10 ? "0" + minute : minute
}`;
export default {
  components: {
    AppWarning,
  },
  setup() {
    const store = useStore();
    const editArea = ref(null);
    // const submissionAllow = computed(() =>
    //   postForm.title == "" || postForm.boardType == "" ? true : false
    // );
    // 添加照片
    const addPhoto = (event) => {
      const file = event.target.files[0];
      const img = document.createElement("img");

      const reader = new FileReader();
      reader.onload = (event) => {
        img.setAttribute("src", event.target.result);
      };
      reader.readAsDataURL(file);
      img.classList.add("max-w-xs", "lg:max-w-md");
      editArea.value.appendChild(img);
    };
    const postForm = reactive({
      boardType: "",
      title: "",
      content: "",
    });
    const CurrentStatus = ref("editing");
    const reviewArea = ref(null);
    const showingWarning = ref(false);
    const nextStep = () => {
      if (!editArea.value.innerHTML || !postForm.title || !postForm.boardType) {
        showingWarning.value = true;
        return;
      }
      console.log(postForm);
      postForm.content = editArea.value.innerHTML;
      reviewArea.value.innerHTML = postForm.content;
      CurrentStatus.value = "review";
    };
    return {
      currentTime,
      boardList: computed(() => store.state.boardList),
      addPhoto,
      editArea,
      postForm,
      //   submissionAllow,
      nextStep,
      showingWarning,
      CurrentStatus,
      reviewArea,
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
