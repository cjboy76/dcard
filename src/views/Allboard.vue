<template>
  <div
    class="home container mx-auto mt-8 lg:grid lg:grid-cols-5 lg:gap-4 lg:mt-4"
  >
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
          sticky
          top-16
          bg-gray-100
        "
      >
        <h1>所有看板</h1>
      </div>
      <!-- article -->
      <div class="container pb-8">
        <article class="w-10/12 mx-auto py-2 border-b-2 cursor-pointer flex">
          <span class="material-icons ml-2"> emoji_emotions </span>
          <h2 class="ml-2">心情</h2>
        </article>
        <article class="w-10/12 mx-auto py-2 border-b-2 cursor-pointer flex">
          <span class="material-icons ml-2"> volunteer_activism </span>
          <h2 class="ml-2">感情</h2>
        </article>
        <article class="w-10/12 mx-auto py-2 border-b-2 cursor-pointer flex">
          <span class="material-icons ml-2"> forum </span>
          <h2 class="ml-2">閒聊</h2>
        </article>
        <article class="w-10/12 mx-auto py-2 border-b-2 cursor-pointer flex">
          <span class="material-icons ml-2"> checkroom </span>
          <h2 class="ml-2">穿搭</h2>
        </article>
        <article class="w-10/12 mx-auto py-2 border-b-2 cursor-pointer flex">
          <span class="material-icons ml-2"> insights </span>
          <h2 class="ml-2">星座</h2>
        </article>
        <article class="w-10/12 mx-auto py-2 border-b-2 cursor-pointer flex">
          <span class="material-icons ml-2"> insights </span>
          <h2 class="ml-2">星座</h2>
        </article>
        <article class="w-10/12 mx-auto py-2 border-b-2 cursor-pointer flex">
          <span class="material-icons ml-2"> insights </span>
          <h2 class="ml-2">星座</h2>
        </article>
        <article class="w-10/12 mx-auto py-2 border-b-2 cursor-pointer flex">
          <span class="material-icons ml-2"> insights </span>
          <h2 class="ml-2">星座</h2>
        </article>
        <article class="w-10/12 mx-auto py-2 border-b-2 cursor-pointer flex">
          <span class="material-icons ml-2"> insights </span>
          <h2 class="ml-2">星座</h2>
        </article>
        <article class="w-10/12 mx-auto py-2 border-b-2 cursor-pointer flex">
          <span class="material-icons ml-2"> insights </span>
          <h2 class="ml-2">星座</h2>
        </article>
        <article class="w-10/12 mx-auto py-2 border-b-2 cursor-pointer flex">
          <span class="material-icons ml-2"> insights </span>
          <h2 class="ml-2">星座</h2>
        </article>
        <article class="w-10/12 mx-auto py-2 border-b-2 cursor-pointer flex">
          <span class="material-icons ml-2"> insights </span>
          <h2 class="ml-2">星座</h2>
        </article>
        <article class="w-10/12 mx-auto py-2 border-b-2 cursor-pointer flex">
          <span class="material-icons ml-2"> insights </span>
          <h2 class="ml-2">星座</h2>
        </article>
      </div>
    </div>
    <app-mainprofile></app-mainprofile>
  </div>
</template>

<script>
import AppMainsidebar from "@/components/Mainsidebar.vue";
import AppMainprofile from "@/components/Mainprofile.vue";
export default {
  name: "Favcomment",
  components: {
    AppMainsidebar,
    AppMainprofile,
  },
};
</script>
