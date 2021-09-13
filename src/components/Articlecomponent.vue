<template>
  <!-- if data exists -->
  <router-link
    :to="{
      name: 'Article',
      params: { boardKey: article.boardKey, aID: article.docID },
    }"
    :key="article.docID"
    class="w-10/12 mx-auto grid grid-cols-3 py-2 border-b-2"
  >
    <div class="article-text col-span-2 w-11/12 mx-auto">
      <div class="boardtype text-gray-400 py-1">
        <span>{{ article.boardName }}</span>
      </div>
      <h2 class="font-bold text-lg">{{ article.title }}</h2>
      <p>
        {{ article.snippet }}
      </p>
      <div class="flex py-2">
        <span class="material-icons"> insert_comment </span>
        <div class="span ml-1">{{ article.comments }}</div>
        <span class="material-icons ml-1 text-gray-700 cursor-pointer">
          favorite
        </span>
        <span>{{ article.likes }}</span>
      </div>
    </div>
    <div class="article-image col-span-1 grid justify-center items-center">
      <div
        class="
          h-24
          w-24
          rounded-xl
          overflow-hidden
          flex
          justify-center
          items-center
        "
      >
        <img
          :src="article.imagesURL"
          :alt="article.imageURL"
          class="max-w-sm w-36"
        />
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style></style>
