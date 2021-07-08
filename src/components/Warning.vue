<template>
  <!-- modal-shadow -->
  <div
    class="
      fixed
      top-0
      left-0
      w-full
      h-full
      bg-gray-900 bg-opacity-75
      z-20
      flex
      justify-center
      items-center
    "
    v-if="showingWarning"
  >
    <!-- warning page -->
    <div
      class="
        z-30
        fixed
        w-4/5
        md:w-2/4
        lg:w-4/12
        bg-gray-100
        rounded-md
        overflow-hidden
      "
    >
      <section class="flex flex-col p-6">
        <h1 class="text-2xl font-bold">部分內容還沒完成喔</h1>
        <p>看板選擇、貼文標題以及貼文內容都需要完成，才可繼續下一步驟 ~</p>
        <div class="flex justify-end pt-4">
          <button
            @click="close"
            class="
              border
              py-2
              px-4
              rounded-md
              text-gray-100
              bg-green-700
              hover:bg-green-900
            "
          >
            確定
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "Warning",
  props: {
    showingWarning: {
      required: true,
      type: Boolean,
    },
  },
  emits: ["close"],
  setup(props, { emit }) {
    const close = () => {
      emit("close");
    };
    return {
      close,
    };
  },
};
</script>
