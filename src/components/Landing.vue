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
    v-if="authModalShow"
    @click.self="toggleAuthModal"
  >
    <!-- landing page -->
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
      <!-- toggletab -->
      <div class="modaltab grid grid-cols-2 border-b border-green-700">
        <div
          class="row-span-1 text-center leading-8 py-2 cursor-pointer"
          :class="{
            'hover:text-white bg-green-700': currentTab === 'register',
            'hover:text-green-700': currentTab === 'login',
          }"
          @click.prevent="currentTab = 'register'"
        >
          註冊
        </div>
        <div
          class="row-span-1 text-center leading-8 py-2 cursor-pointer"
          :class="{
            'hover:text-white bg-green-700': currentTab === 'login',
            'hover:text-green-700': currentTab === 'register',
          }"
          @click.prevent="currentTab = 'login'"
        >
          登入
        </div>
      </div>
      <!-- registerform -->
      <div class="py-2" v-show="currentTab == 'register'">
        <vee-form
          class="flex flex-col text-center w-4/5 mx-auto text-gray-900"
          :validation-schema="schemaRegister"
          @submit="register"
        >
          <label class="my-2"
            >姓名<vee-field
              type="text"
              name="name"
              class="
                bg-gray-100
                text-gray-600
                focus:outline-none
                ml-1
                border-b-2 border-gray-300
              "
          /></label>
          <ErrorMessage class="text-red-600" name="name" />

          <label class="my-2"
            >email<vee-field
              type="text"
              name="email"
              class="
                bg-gray-100
                text-gray-600
                focus:outline-none
                ml-1
                border-b-2 border-gray-300
              "
          /></label>
          <ErrorMessage class="text-red-600" name="email" />

          <label class="my-2"
            >密碼<vee-field
              type="password"
              name="password"
              class="
                bg-gray-100
                text-gray-600
                focus:outline-none
                ml-1
                border-b-2 border-gray-300
              "
          /></label>
          <ErrorMessage class="text-red-600" name="password" />

          <label class="my-2"
            >確認密碼<vee-field
              type="password"
              name="confirmation"
              class="
                bg-gray-100
                text-gray-600
                focus:outline-none
                ml-1
                border-b-2 border-gray-300
              "
          /></label>
          <ErrorMessage class="text-red-600" name="confirmation" />

          <button
            type="submit"
            class="
              border border-gray-400
              w-2/5
              mx-auto
              py-2
              rounded
              my-2
              bg-green-700
              text-gray-100
              lg:bg-gray-100 lg:text-gray-900
              hover:bg-green-700 hover:text-gray-100 hover:border-green-700
            "
          >
            註冊
          </button>
        </vee-form>
        <!-- spinner -->
        <div
          class="w-4/5 mx-auto flex justify-center p-2 spin"
          v-if="showingSpinner"
        >
          <div class="w-12 h-12 rounded-full border-t-2 border-green-700"></div>
        </div>
        <!-- warning -->
        <div class="w-4/5 mx-auto text-center py-4" v-if="showingWarning">
          <span class="font-bold" :class="showingStyle">
            {{ showingMessage }}
          </span>
        </div>
      </div>
      <!-- loginform -->
      <div class="py-2" v-show="currentTab == 'login'">
        <vee-form
          class="flex flex-col text-center w-4/5 mx-auto text-gray-900"
          :validation-schema="schemaLogin"
          @submit="login"
        >
          <label class="my-2"
            >email<vee-field
              type="text"
              name="email"
              class="
                bg-gray-100
                text-gray-600
                focus:outline-none
                ml-1
                border-b-2 border-gray-300
              "
          /></label>
          <ErrorMessage class="text-red-600" name="email" />
          <label class="my-2"
            >密碼<vee-field
              type="password"
              name="password"
              class="
                bg-gray-100
                text-gray-600
                focus:outline-none
                ml-1
                border-b-2 border-gray-300
              "
          /></label>
          <ErrorMessage class="text-red-600" name="password" />
          <button
            type="submit"
            class="
              border border-gray-400
              w-2/5
              mx-auto
              py-2
              rounded
              my-2
              bg-green-700
              text-gray-100
              lg:bg-gray-100 lg:text-gray-900
              hover:bg-green-700 hover:text-gray-100 hover:border-green-700
            "
          >
            登入
          </button>
        </vee-form>
        <!-- spinner -->
        <div
          class="w-4/5 mx-auto flex justify-center p-2 spin"
          v-if="showingSpinner"
        >
          <div class="w-12 h-12 rounded-full border-t-2 border-green-700"></div>
        </div>
        <!-- warning -->
        <div class="w-4/5 mx-auto text-center py-4" v-if="showingWarning">
          <span class="font-bold" :class="showingStyle">Ｘ 登入失敗</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  name: "Landing",
  data() {
    return {
      showingSpinner: false,
      showingWarning: false,
      showimgMessage: "",
      showingStyle: "",
      currentTab: "register",
      schemaRegister: {
        name: "required",
        email: "required|email",
        password: "required|min:8",
        confirmation: "password_mismatch:@password",
      },
      schemaLogin: {
        email: "required|email",
        password: "required|min:8",
      },
    };
  },
  computed: {
    ...mapState(["authModalShow"]),
  },
  methods: {
    ...mapMutations(["toggleAuthModal"]),
    // register
    async register(values) {
      this.showingWarning = false;
      this.showingSpinner = true;
      try {
        await this.$store.dispatch("register", values);
      } catch (error) {
        this.showingSpinner = false;
        this.showingWarning = true;
        this.showimgMessage = "X 註冊帳號失敗";
        this.showingStyle = "text-red-600";
        return;
      }
      this.showimgMessage = "註冊成功 已經登入";
      this.showingStyle = "text-green-600";
      window.location.reload();
    },
    // login
    async login(values) {
      this.showingSpinner = false;
      this.showingWarning = false;
      try {
        this.showingSpinner = true;
        await this.$store.dispatch("login", values);
      } catch (error) {
        this.showingSpinner = false;
        this.showingWarning = true;
        this.showingStyle = "text-red-600";
        return;
      }
      this.showingStyle = "text-green-600";
      window.location.reload();
    },
  },
};
</script>

<style>
.spin {
  animation: spin 1s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
