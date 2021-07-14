<template>
  <!-- leaving comments -->
  <div class="bg-gray-200 py-6">
    <form
      @submit.prevent="addComment"
      class="
        w-10/12
        mx-auto
        border-b-2 border-gray-400
        text-gray-800
        py-4
        flex
        items-center
        sticky
        top-16
        bg-gray-200
      "
    >
      <div
        class="
          w-12
          h-12
          rounded-full
          bg-gray-100
          overflow-hidden
          flex
          justify-center
          items-center
        "
      >
        <img v-if="userPhoto" :src="userPhoto" class="max-w-xs w-20" />
        <img v-else src="../assets/user.svg" class="object-cover" />
      </div>
      <input
        v-model="commentInput"
        type="text"
        class="
          w-8/12
          lg:w-4/5
          focus:outline-none focus:border-gray-700
          bg-gray-200
          ml-4
          h-8
          border-b-2 border-gray-400
        "
      />
      <button type="submit" :disabled="submission">
        <span class="material-icons"> send </span>
      </button>
    </form>
    <!-- dufault content with no data -->
    <div
      v-if="!state.commentList[0]"
      class="w-10/12 mx-auto py-4 border-b-2 border-gray-400 text-gray-400"
    >
      目前還沒有留言
    </div>
    <!-- content if data exist -->
    <div
      v-else
      v-for="(item, index) of state.commentList"
      :key="item.createdAt.seconds"
      class="w-10/12 mx-auto py-4 border-b-2 border-gray-400 text-gray-400"
    >
      <div class="flex justify-between items-center">
        <div>
          <span class="text-gray-700 font-semibold">{{ item.name }}</span>
          <span class="ml-6">{{ item.postingtime }}</span>
        </div>
        <div class="flex justify-center items-center mr-8">
          <span
            class="material-icons cursor-pointer"
            :class="{ 'text-red-400': item.likesStatus }"
            @click="likeComment(index, item.docID)"
          >
            favorite_border
          </span>
          <span>
            {{ item.likesNum == 0 ? "" : item.likesNum }}
          </span>
        </div>
      </div>
      <div class="text-gray-700">{{ item.content }}</div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";

export default {
  name: "Articlecomment",
  props: {
    state: {
      type: Object,
      required: true,
    },
    submission: Boolean,
  },
  emits: ["updateCommentLike", "addComment"],
  setup(props, { emit }) {
    const commentInput = ref("");
    const addComment = async () => {
      await emit("addComment", commentInput.value);
      commentInput.value = "";
    };
    const likeComment = (index, docID) => {
      emit("updateCommentLike", index, docID);
    };
    const store = useStore();
    const userPhoto = computed(() => store.state.userPhoto);
    return {
      commentInput,
      addComment,
      likeComment,
      userPhoto,
    };
  },
};
</script>
