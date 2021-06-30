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
        <div class="grid justify-center items-center pt-4">
          <img
            src="https://picsum.photos/100/100?random=1"
            alt=""
            class="rounded-full"
          />
          <button
            class="
              border border-gray-400
              my-4
              p-2
              rounded-md
              hover:text-gray-100 hover:bg-green-700 hover:border-green-700
            "
          >
            更改
          </button>
        </div>
        <div class="border-b border-gray-400 grid grid-cols-3">
          <div class="flex col-span-2 w-5/6 mx-auto py-6">
            <label class="mr-2 text-gray-400">姓名</label>
            <span>你的名字</span>
          </div>
          <div class="col-span-1 grid justify-center">
            <button
              class="
                border border-gray-400
                my-4
                px-2
                rounded-md
                hover:text-gray-100 hover:bg-green-700 hover:border-green-700
              "
            >
              更改
            </button>
          </div>
        </div>
        <div class="border-b border-gray-400 grid grid-cols-3">
          <div class="flex col-span-2 w-5/6 mx-auto py-6">
            <label class="mr-2 text-gray-400">性別</label>
            <span>男</span>
          </div>
          <div class="col-span-1 grid justify-center">
            <button
              class="
                border border-gray-400
                my-4
                px-2
                rounded-md
                hover:text-gray-100 hover:bg-green-700 hover:border-green-700
              "
            >
              更改
            </button>
          </div>
        </div>
        <div class="border-b border-gray-400 grid grid-cols-3">
          <div class="flex col-span-2 w-5/6 mx-auto py-6">
            <label class="mr-2 text-gray-400">信箱</label>
            <span>hello@gmail.com</span>
          </div>
          <div class="col-span-1 grid justify-center">
            <button
              class="
                border border-gray-400
                my-4
                px-2
                rounded-md
                hover:text-gray-100 hover:bg-green-700 hover:border-green-700
              "
            >
              更改
            </button>
          </div>
        </div>
        <div class="border-b border-gray-400 grid grid-cols-3">
          <div class="flex col-span-2 w-5/6 mx-auto py-6">
            <label class="mr-2 text-gray-400">出生日期</label>
            <span>2021 / 06 / 01</span>
          </div>
          <div class="col-span-1 grid justify-center">
            <button
              class="
                border border-gray-400
                my-4
                px-2
                rounded-md
                hover:text-gray-100 hover:bg-green-700 hover:border-green-700
              "
            >
              更改
            </button>
          </div>
        </div>
        <div class="border-b grid justify-center items-center">
          <button
            class="
              border border-gray-400
              my-4
              py-2
              px-2
              rounded-md
              hover:text-gray-100 hover:bg-green-700 hover:border-green-700
            "
          >
            更改密碼
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AppMainsidebar from "@/components/Mainsidebar.vue";
export default {
  name: "AppProfile",
  components: {
    AppMainsidebar,
  },
};
</script>
