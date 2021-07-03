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
      <app-profileinformation></app-profileinformation>
    </div>
  </div>
</template>
<script>
import AppMainsidebar from "@/components/Mainsidebar.vue";
import AppProfileinformation from "@/components/Profileinformation";

export default {
  name: "AppProfile",
  components: {
    AppMainsidebar,
    AppProfileinformation,
  },
};
</script>
