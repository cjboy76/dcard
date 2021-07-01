<template>
  <!-- 主畫面右邊個人資料 -->
  <div class="commercial col-span-1 hidden lg:block" v-if="userLoggedIn">
    <div class="py-4 flex mx-auto w-4/5">
      <div class="rounded-full h-16 w-16 overflow-hidden">
        <img src="https://picsum.photos/100/100?random=1" alt="" />
      </div>
      <div class="flex justify-center items-center ml-4 text-gray-100">
        <span>你的名字</span>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  name: "AppMainprofile",
  setup() {
    const store = useStore();
    return {
      userLoggedIn: computed(() => store.state.userLoggedIn),
    };
  },
};
</script>

<style></style>
