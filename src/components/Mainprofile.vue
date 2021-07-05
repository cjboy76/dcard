<template>
  <div class="commercial col-span-1 hidden lg:block" v-if="userLoggedIn">
    <div class="py-4 flex mx-auto w-4/5 sticky top-24">
      <!-- image -->
      <div
        class="
          rounded-full
          h-16
          w-16
          overflow-hidden
          bg-gray-100
          flex
          justify-center
          items-center
        "
      >
        <img
          v-if="state.user.profileImageURL"
          :src="state.user.profileImageURL"
          class="max-w-xs w-24"
        />
        <img v-else src="../assets/user.svg" class="object-cover" />
      </div>
      <!-- name -->
      <div class="flex justify-center items-center ml-4 text-gray-100">
        <span>{{ state.user.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, reactive } from "vue";

export default {
  name: "AppMainprofile",
  setup() {
    const state = reactive({ user: {} });
    const store = useStore();
    const getData = async () => {
      state.user = await store.dispatch("getData");
      console.log(state.user);
    };
    getData();
    return {
      state,
      userLoggedIn: computed(() => store.state.userLoggedIn),
    };
  },
};
</script>
