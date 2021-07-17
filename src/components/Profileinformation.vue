<template>
  <div class="w-10/12 mx-auto">
    <!-- 頭貼部分 -->
    <app-profileimage
      @updateData="updateInformation"
      :user="state.user"
    ></app-profileimage>
    <!-- 資料表單部分 -->
    <app-profileform
      :user="state.user"
      @getData="getInformation"
      @updateData="updateInformation"
    ></app-profileform>
  </div>
</template>

<script>
import AppProfileform from "@/components/Profileform.vue";
import AppProfileimage from "@/components/Profileimage.vue";
import { reactive } from "@vue/reactivity";
import { useStore } from "vuex";

export default {
  name: "AppProfileinformation",
  components: {
    AppProfileform,
    AppProfileimage,
  },
  setup() {
    const store = useStore();
    const state = reactive({ user: {} });
    const getInformation = async () => {
      state.user = await store.dispatch("getData");
    };
    getInformation();
    const updateInformation = async (values) => {
      await store.dispatch("updateData", values);
    };
    return {
      getInformation,
      updateInformation,
      state,
    };
  },
};
</script>

<style></style>
