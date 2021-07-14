<template>
  <div>
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
            <div>{{ state.article.content }}</div>
          </div>
          <!-- likes && comments number -->
          <div class="my-6 flex items-center">
            <span
              @click="likeArticle"
              class="material-icons ml-2 cursor-pointer"
              :class="{ 'text-red-400': state.articlelikesStatus }"
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
  </div>
</template>

<script>
export default {
  name: "Articlemain",
  props: {
    state: {
      type: Object,
      required: true,
    },
    borderColor: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const likeArticle = () => {
      if (props.state.articlelikesStatus) {
        state.article.likes += -1;
        state.articlelikesStatus = false;
        return;
      }
      state.article.likes += 1;
      state.articlelikesStatus = true;
    };
    return {
      likeArticle,
    };
  },
};
</script>

<style></style>
