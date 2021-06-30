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
      <a href="" class="w-full">
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
      </a>
      <a href="" class="w-full">
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
      </a>
      <div class="w-full flex justify-center items-center pt-4">
        <span class="text-gray-100 text-opacity-50">設定</span>
      </div>
      <a href="" class="w-full">
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
          <span class="material-icons"> account_circle </span>

          <div class="ml-2">個人檔案</div>
        </div>
      </a>
      <a href="" class="w-full">
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
      </a>
      <a href="" class="w-full">
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

          <div class="ml-2">喜愛文章</div>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppMainSidebar",
};
</script>

<style></style>
