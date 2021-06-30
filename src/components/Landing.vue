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
  >
    <!-- landing page -->
    <div
      class="
        z-30
        fixed
        w-4/5
        md:w-3/4
        lg:w-1/2
        bg-gray-100
        rounded-md
        overflow-hidden
      "
    >
      <!-- toggletab -->
      <div class="modaltab grid grid-cols-2">
        <div class="row-span-1 text-center leading-8 py-2 border">註冊</div>
        <div class="row-span-1 text-center leading-8 py-2">登入</div>
      </div>
      <!-- registerform -->
      <div class="py-2">
        <form class="flex flex-col text-center w-3/5 mx-auto text-gray-900">
          <label class="my-2"
            >姓名<input
              type="text"
              class="
                bg-gray-100
                text-gray-600
                focus:outline-none
                ml-1
                border-b-2 border-gray-300
              "
          /></label>
          <label class="my-2"
            >email<input
              type="text"
              class="
                bg-gray-100
                text-gray-600
                focus:outline-none
                ml-1
                border-b-2 border-gray-300
              "
          /></label>
          <label class="my-2"
            >密碼<input
              type="text"
              class="
                bg-gray-100
                text-gray-600
                focus:outline-none
                ml-1
                border-b-2 border-gray-300
              "
          /></label>
          <label class="my-2"
            >確認密碼<input
              type="text"
              class="
                bg-gray-100
                text-gray-600
                focus:outline-none
                ml-1
                border-b-2 border-gray-300
              "
          /></label>
          <button
            type="submit"
            class="border border-gray-400 w-2/5 mx-auto py-2 rounded my-2"
          >
            註冊
          </button>
        </form>
      </div>
      <!-- loginform -->
      <div class="py-2">
        <form class="flex flex-col text-center w-3/5 mx-auto text-gray-900">
          <label class="my-2"
            >email<input
              type="text"
              class="
                bg-gray-100
                text-gray-600
                focus:outline-none
                ml-1
                border-b-2 border-gray-300
              "
          /></label>
          <label class="my-2"
            >密碼<input
              type="text"
              class="
                bg-gray-100
                text-gray-600
                focus:outline-none
                ml-1
                border-b-2 border-gray-300
              "
          /></label>
          <button
            type="submit"
            class="border border-gray-400 w-2/5 mx-auto py-2 rounded my-2"
          >
            登入
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
