<template>
  <header class="bg-green-100 fixed top-0 w-full z-20">
    <div
      class="
        container
        mx-auto
        flex
        justify-between
        lg:grid lg:grid-cols-6 lg:justify-center lg:items-center
      "
    >
      <nav class="flex justify-center items-center lg:col-span-4">
        <!-- logo -->
        <router-link
          :to="{ name: 'Home' }"
          @click.prevent="toggleBurger = false"
          class="logo"
        >
          <img
            src="@/assets/fish.svg"
            alt="fish"
            width="70"
            height="50"
            class="ml-4 sm:ml-1"
          />
        </router-link>
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
        class="col-start-6 cursor-pointer hover:text-gray-500"
        @click="toggleAuthModal"
        v-if="!userLoggedIn"
      >
        <span class="hidden font-bold lg:block">註冊/登入</span>
      </div>
      <div v-else class="flex justify-center lg:col-span-2">
        <router-link
          class="cursor-pointer hover:text-gray-500 flex toPost"
          :to="{ name: 'Post' }"
        >
          <span class="material-icons hidden font-bold lg:block">
            drive_file_rename_outline
          </span>
          <span class="hidden font-bold lg:block">建立貼文</span>
        </router-link>
        <div class="ml-8 cursor-pointer hover:text-gray-500" @click="logout">
          <span class="hidden font-bold lg:block">登出 </span>
        </div>
      </div>
      <!-- hamburger button -->
      <button
        class="hamburger hamburger--elastic lg:hidden"
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
    <div
      class="w-full h-full bg-gray-100 fixed z-10 lg:hidden"
      v-show="toggleBurger"
    >
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
        <div
          class="
            py-4
            justify-around
            items-center
            flex flex-col
            text-2xl
            md:text-3xl
            lg:block
          "
          @click="toggleBurger = !toggleBurger"
        >
          <router-link
            :to="{ name: 'Allboard' }"
            class="burgerLink cursor-pointer md:py-4 py-4"
          >
            <span>所有看板</span>
          </router-link>
          <router-link
            class="burgerLink cursor-pointer py-4 md:py-4"
            :to="{ name: 'Rankboard' }"
          >
            <span>即時熱門看板</span>
          </router-link>
          <router-link
            class="burgerLink cursor-pointer md:py-4 py-4"
            :to="{ name: 'Profile' }"
          >
            <span>個人設定</span>
          </router-link>
          <router-link
            class="burgerLink cursor-pointer md:py-4 py-4"
            :to="{ name: 'Articles' }"
          >
            <span>發表文章</span>
          </router-link>
          <router-link
            class="burgerLink cursor-pointer md:py-4 py-4"
            :to="{ name: 'Favs' }"
          >
            <span>喜愛文章</span>
          </router-link>
          <div
            class="burgerLink cursor-pointer md:py-4 py-4"
            v-if="!userLoggedIn"
            @click="toggleAuthModal"
          >
            <span>登入 / 註冊</span>
          </div>
          <template v-else>
            <router-link
              class="burgerLink cursor-pointer md:py-4 py-4"
              :to="{ name: 'Post' }"
            >
              <span>建立貼文</span>
            </router-link>
            <div class="cursor-pointer md:py-4 py-4" @click="logout">
              <span>登出</span>
            </div>
          </template>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";

export default {
  name: "AppHeader",
  setup() {
    const store = useStore();
    const toggleBurger = ref(false);
    return {
      toggleBurger,
      userLoggedIn: computed(() => store.state.userLoggedIn),
      logout: () => store.dispatch("logout"),
      toggleAuthModal: () => store.commit("toggleAuthModal"),
    };
  },
};
</script>

<style lang="scss" scoped>
.logo {
  background: transparent;
}
.toPost {
  background: transparent;
}
.burgerLink {
  background: transparent;
}
.slide-fade-enter-active {
  transition: all 0.3s linear;
}
.slide-fade-leave-active {
  transition: all 0.3s linear;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-70%);
  opacity: 0.5;
}
</style>
