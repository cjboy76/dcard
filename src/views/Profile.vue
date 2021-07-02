<template>
  <!-- profile page -->
  <div class="container mx-auto mt-8 lg:grid lg:grid-cols-5 lg:gap-4 lg:mt-4">
    <app-mainsidebar></app-mainsidebar>
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
        "
      >
        <h1>設定</h1>
      </div>
      <!-- information -->
      <div class="w-10/12 mx-auto">
        <!-- 頭貼 -->
        <div class="grid justify-center items-center pt-4">
          <div
            class="
              rounded-full
              border-2 border-gray-500
              overflow-hidden
              flex
              justify-center
              items-center
            "
          >
            <!-- <img :src="user.userImage" v-if="user.userImage" /> -->
            <img src="@/assets/user.svg" />
          </div>
          <button
            class="
              border border-gray-400
              my-4
              p-2
              rounded-md
              hover:text-gray-100 hover:bg-green-700 hover:border-green-700
            "
          >
            更改照片
          </button>
        </div>
        <app-profileform></app-profileform>
      </div>
    </div>
  </div>
</template>
<script>
import AppMainsidebar from "@/components/Mainsidebar.vue";
import AppProfileform from "@/components/Profileform";

export default {
  name: "AppProfile",
  components: {
    AppMainsidebar,
    AppProfileform,
  },
};
</script>
