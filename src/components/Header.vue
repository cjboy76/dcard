<template>
  <header class="bg-green-100 fixed top-0 w-full z-20">
    <div class="container mx-auto flex justify-center items-center">
      <nav class="flex justify-start items-center container w-4/5">
        <!-- logo -->
        <img
          src="@/assets/fish.svg"
          alt="fish"
          width="70"
          height="50"
          class="ml-4 sm:ml-1"
        />
        <!-- search-bar -->
        <div class="ml-4 w-5/6 hidden lg:block">
          <form class="flex justify-start items-center">
            <input
              type="search"
              placeholder="搜尋"
              class="bg-green-200 outline-none text-gray-900 p-1 w-3/4"
            />
            <button class="rounded-sm p-1">
              <span class="material-icons"> search </span>
            </button>
          </form>
        </div>
      </nav>
      <!-- login/register -->
      <div
        class="
          float-right
          w-1/5
          flex
          justify-end
          mr-1
          cursor-pointer
          hover:text-gray-500
        "
        @click="toggleAuthModal"
      >
        <span class="hidden lg:block">註冊/登入</span>
      </div>
      <!-- hamburger button -->
      <button
        class="hamburger hamburger--elastic block lg:hidden"
        :class="{ 'is-active': toggleBurger }"
        type="button"
        @click="toggleBurger = !toggleBurger"
      >
        <span class="hamburger-box">
          <span class="hamburger-inner"></span>
        </span>
      </button>
    </div>
  </header>
  <div class="w-full" style="height: 70px"></div>
  <!-- hamburger-list -->
  <transition name="slide-fade">
    <div class="w-full h-full bg-gray-100 fixed z-10" v-show="toggleBurger">
      <div class="w-4/5 mx-auto text-center">
        <form class="flex justify-center items-center py-4">
          <input
            type="text"
            class="
              bg-gray-100
              text-gray-600
              focus:outline-none
              ml-1
              border-b-2 border-gray-300
            "
          />
          <button class="rounded-sm p-1">
            <span class="material-icons"> search </span>
          </button>
        </form>
        <div class="sm:py-4 sm:flex sm:justify-around sm:items-center">
          <div class="cursor-pointer py-4 sm:py-0">
            <span>所有看板</span>
          </div>
          <div class="cursor-pointer py-4 sm:py-0">
            <span>即時熱門看板</span>
          </div>
          <div class="cursor-pointer py-4 sm:py-0">
            <span>個人設定</span>
          </div>
          <div class="cursor-pointer py-4 sm:py-0">
            <span>發表文章</span>
          </div>
          <div class="cursor-pointer py-4 sm:py-0">
            <span>喜愛文章</span>
          </div>
          <div class="cursor-pointer py-4 sm:py-0" @click="toggleAuthModal">
            <span>登入 / 註冊</span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { ref } from "@vue/reactivity";
import { mapMutations } from "vuex";

export default {
  name: "AppHeader",
  setup() {
    const toggleBurger = ref(false);
    return {
      toggleBurger,
    };
  },
  methods: {
    ...mapMutations(["toggleAuthModal"]),
  },
};
</script>

<style lang="scss" scoped>
.slide-fade-enter-active {
  transition: all 0.3s linear;
}
.slide-fade-leave-active {
  transition: all 0.3s linear;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-50%);
  opacity: 0;
}
</style>
