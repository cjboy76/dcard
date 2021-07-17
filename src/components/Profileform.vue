<template>
  <!-- 資訊欄 -->
  <div v-if="!toggleProfile">
    <div class="border-b border-gray-400 mx-8 grid grid-cols-8">
      <div class="py-6 col-start-2 col-end-8">
        <label class="text-gray-400">
          名稱
          <span class="ml-2 text-gray-800">
            {{ user.name }}
          </span>
        </label>
      </div>
    </div>
    <div class="border-b border-gray-400 mx-8 grid grid-cols-8">
      <div class="py-6 col-start-2 col-end-8">
        <label class="text-gray-400"
          >性別 <span class="ml-2 text-gray-800">{{ user.gender }}</span></label
        >
      </div>
    </div>
    <div class="border-b border-gray-400 mx-8 grid grid-cols-8">
      <div class="py-6 col-start-2 col-end-8">
        <label class="text-gray-400"
          >出生日期<span class="ml-2 text-gray-800">
            {{ user.birth }}
          </span></label
        >
      </div>
    </div>
    <div class="border-b grid justify-center items-center">
      <button
        @click="toggleProfile = true"
        class="
          border border-gray-400
          my-4
          py-2
          px-2
          rounded-md
          hover:text-gray-100 hover:bg-green-700 hover:border-green-700
        "
      >
        設定檔案
      </button>
    </div>
  </div>
  <!-- 切換的更改表單 -->
  <div v-else>
    <vee-form
      class="mx-8"
      :valadation-schema="schema_profile"
      :initial-values="user"
      @submit="update"
    >
      <div class="py-6 border-b border-gray-400 grid grid-cols-8">
        <label
          class="text-gray-400 col-start-2 col-end-8 text-center md:text-left"
          >名稱
          <span class="ml-2 text-gray-800">
            {{ user.name }}
          </span>
        </label>
      </div>
      <div class="py-6 border-b border-gray-400 grid grid-cols-8">
        <label
          class="
            text-gray-400
            col-start-2 col-end-8
            text-center
            flex flex-col
            md:text-left md:block
          "
          >性別
          <vee-field
            as="select"
            name="gender"
            class="ml-2 text-gray-700 focus:outline-none"
          >
            <option>男生</option>
            <option>女生</option>
          </vee-field>
        </label>
      </div>
      <div class="py-6 border-b border-gray-400 grid grid-cols-8">
        <label
          class="text-gray-400 col-start-2 col-end-8 text-center md:text-left"
          >出生日期
          <vee-field
            type="date"
            :max="setMax"
            name="birth"
            class="
              ml-2
              text-gray-700
              focus:outline-none
              text-center
              md:text-left
            "
          />
        </label>
      </div>
      <!-- spinner -->
      <app-spinner :showingSpinner="showingSpinner"></app-spinner>
      <div class="border-b grid justify-center items-center">
        <button
          type="submit"
          class="
            border border-gray-400
            my-4
            py-2
            px-2
            rounded-md
            hover:text-gray-100 hover:bg-green-700 hover:border-green-700
          "
        >
          確定修改
        </button>
      </div>
    </vee-form>
  </div>
</template>

<script>
import AppSpinner from "@/components/Spinner.vue";
import { ref } from "@vue/reactivity";

let today = new Date();
let dd = today.getDate();
let mm = today.getMonth() + 1;
let yyyy = today.getFullYear();
if (dd < 10) {
  dd = "0" + dd;
}
if (mm < 10) {
  mm = "0" + mm;
}
today = yyyy + "-" + mm + "-" + dd;
export default {
  name: "ProfileForm",
  components: {
    AppSpinner,
  },
  props: {
    user: Object,
  },
  emits: ["getData", "updateData"],
  setup(props, { emit }) {
    const setMax = ref(today);
    const toggleProfile = ref(false);
    const showingSpinner = ref(false);
    const schema_profile = {
      gender: "required",
      birth: "required",
    };
    const update = async (values) => {
      showingSpinner.value = true;
      await emit("updateData", values);
      showingSpinner.value = false;
      toggleProfile.value = false;
      window.location.reload();
    };
    return {
      setMax,
      toggleProfile,
      showingSpinner,
      schema_profile,
      update,
    };
  },
};
</script>
