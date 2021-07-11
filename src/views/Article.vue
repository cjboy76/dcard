<template>
  <div
    class="home container mx-auto mt-8 lg:grid lg:grid-cols-5 lg:gap-4 lg:mt-4"
  >
    <app-mainsidebar />
    <div class="col-start-2 col-end-5 bg-gray-100 sm:rounded-xl">
      <!-- header -->
      <div
        class="
          w-10/12
          mx-auto
          border-b-2 border-gray-400
          text-2xl
          font-bold
          pt-10
          sticky
          top-16
          bg-gray-100
        "
      >
        <h1>文章</h1>
      </div>
      <!-- article -->
      <div class="w-10/12 mx-auto pb-8">
        <div class="bg-gray-100">
          <div class="flex justify-start items-center my-2">
            <div class="w-12 h-12 rounded-full bg-red-300">
              <img src="" alt="" />
            </div>
            <span class="text-lg font-semibold ml-2">userName</span>
          </div>
          <article>
            <div class="my-4">
              <h1 class="text-3xl font-semibold">title</h1>
              <span class="text-green-600">boardtype</span>
              <span class="text-gray-400 ml-2">time</span>
            </div>
            <div class="article"></div>
          </article>
        </div>
      </div>
    </div>
    <app-mainprofile />
  </div>
</template>

<script>
import AppMainsidebar from "@/components/Mainsidebar.vue";
import AppMainprofile from "@/components/Mainprofile.vue";

export default {
  components: {
    AppMainsidebar,
    AppMainprofile,
  },
};
</script>

<style></style>
