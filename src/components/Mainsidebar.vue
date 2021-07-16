<template>
  <div class="relative hidden lg:block">
    <div
      class="
        navlink
        col-span-1
        flex flex-col
        w-full
        text-gray-100
        sticky
        top-24
      "
    >
      <router-link :to="{ name: 'Allboard' }" class="w-full">
        <div
          class="
            flex
            jusity-center
            items-center
            h-10
            pl-4
            pr-4
            py-6
            hover:bg-green-800
          "
        >
          <span class="material-icons"> assignment </span>

          <div class="ml-2">所有看板</div>
        </div>
      </router-link>
      <router-link :to="{ name: 'Rankboard' }" class="w-full">
        <div
          class="
            flex
            jusity-center
            items-center
            h-10
            pl-4
            pr-4
            py-6
            hover:bg-green-800
          "
        >
          <span class="material-icons"> local_fire_department </span>

          <div class="ml-2">即時熱門看板</div>
        </div>
      </router-link>
      <div class="w-full flex justify-center items-center pt-4">
        <span class="text-gray-100 text-opacity-50">設定</span>
      </div>
      <router-link :to="{ name: 'Profile' }" class="w-full">
        <div
          class="
            flex
            jusity-center
            items-center
            h-10
            pl-4
            pr-4
            py-6
            hover:bg-green-800
          "
          v-if="userLoggedIn"
        >
          <span class="material-icons"> account_circle </span>

          <div class="ml-2">個人設定</div>
        </div>
      </router-link>
      <router-link :to="{ name: 'Myarticles' }" class="w-full">
        <div
          class="
            flex
            jusity-center
            items-center
            h-10
            pl-4
            pr-4
            py-6
            hover:bg-green-800
          "
        >
          <span class="material-icons"> rate_review </span>

          <div class="ml-2">發表文章</div>
        </div>
      </router-link>
      <router-link :to="{ name: 'Favarticles' }" class="w-full">
        <div
          class="
            flex
            jusity-center
            items-center
            h-10
            pl-4
            pr-4
            py-6
            hover:bg-green-800
          "
        >
          <span class="material-icons"> favorite </span>

          <div class="ml-2">收藏文章</div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "AppMainSidebar",
  computed: {
    ...mapState(["userLoggedIn"]),
  },
};
</script>

<style></style>
