<template>
  <div
    class="mx-auto lg:grid lg:grid-cols-10 lg:gap-4"
    style="margin-top: -70px"
  >
    <div class="col-start-3 col-end-9 h-screen bg-gray-100">
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
      <form class="w-10/12 mx-auto bg-gray-100">
        <div class="flex justify0center items-center py-4">
          <select class="outline-none bg-gray-200 py-2 px-4 rounded-md">
            選擇發文看板
            <option value="" disabled selected>選擇發文看板</option>
            <option v-for="item of boardList" :key="item.name">
              {{ item.name }}
            </option>
          </select>
          <div class="ml-2">{{ currentTime }}</div>
        </div>
        <textarea
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
          contenteditable="true"
          class="outline-none editable"
          data-placeholder="內容..."
          style="white-space: pre-wrap leading-6"
        ></div>
        <div class="fixed bottom-0 left-0 w-full mb-4">
          <div
            class="flex justify-between items-center max-w-screen-sm mx-auto"
          >
            <label class="cursor-pointer flex justify-center items-center">
              <span class="material-icons text-gray-500">
                add_photo_alternate
              </span>
              <input type="file" accept="image/jpeg" class="w-0" />
            </label>
            <div>
              <button class="rounded-md py-2 px-4 mr-4">取消</button>
              <button
                class="bg-gray-500 text-gray-100 rounded-md py-2 px-4"
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
</template>

<script>
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";

let currentTime = new Date();
let month = currentTime.getMonth() + 1;
let date = currentTime.getDate();
let hour = currentTime.getHours();
let minute = currentTime.getMinutes();
currentTime = `${month}月${date}日  ${hour}:${
  minute < 10 ? "0" + minute : minute
}`;
export default {
  setup() {
    const store = useStore();
    return {
      currentTime,
      boardList: computed(() => store.state.boardList),
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
