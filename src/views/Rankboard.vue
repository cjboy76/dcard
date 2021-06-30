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
        <h1>即時熱門看板</h1>
      </div>
      <!-- article -->
      <div class="container mb-8">
        <article
          class="
            w-10/12
            mx-auto
            py-2
            border-b-2
            cursor-pointer
            flex
            justify-start
            items-center
          "
        >
          <span class="ml-2">1</span>
          <div class="rounded-full overflow-hidden ml-3">
            <img src="https://picsum.photos/60/60?random=1" alt="" />
          </div>
          <h2 class="ml-3">心情</h2>
        </article>
        <article
          class="
            w-10/12
            mx-auto
            py-2
            border-b-2
            cursor-pointer
            flex
            justify-start
            items-center
          "
        >
          <span class="ml-2">2</span>
          <div class="rounded-full overflow-hidden ml-3">
            <img src="https://picsum.photos/60/60?random=1" alt="" />
          </div>
          <h2 class="ml-3">感情</h2>
        </article>
        <article
          class="
            w-10/12
            mx-auto
            py-2
            border-b-2
            cursor-pointer
            flex
            justify-start
            items-center
          "
        >
          <span class="ml-2">3</span>
          <div class="rounded-full overflow-hidden ml-3">
            <img src="https://picsum.photos/60/60?random=1" alt="" />
          </div>
          <h2 class="ml-3">閒聊</h2>
        </article>
        <article
          class="
            w-10/12
            mx-auto
            py-2
            border-b-2
            cursor-pointer
            flex
            justify-start
            items-center
          "
        >
          <span class="ml-2">4</span>
          <div class="rounded-full overflow-hidden ml-3">
            <img src="https://picsum.photos/60/60?random=1" alt="" />
          </div>
          <h2 class="ml-3">穿搭</h2>
        </article>
        <article
          class="
            w-10/12
            mx-auto
            py-2
            border-b-2
            cursor-pointer
            flex
            justify-start
            items-center
          "
        >
          <span class="ml-2">5</span>
          <div class="rounded-full overflow-hidden ml-3">
            <img src="https://picsum.photos/60/60?random=1" alt="" />
          </div>
          <h2 class="ml-3">星座</h2>
        </article>
        <article
          class="
            w-10/12
            mx-auto
            py-2
            border-b-2
            cursor-pointer
            flex
            justify-start
            items-center
          "
        >
          <span class="ml-2">5</span>
          <div class="rounded-full overflow-hidden ml-3">
            <img src="https://picsum.photos/60/60?random=1" alt="" />
          </div>
          <h2 class="ml-3">星座</h2>
        </article>
        <article
          class="
            w-10/12
            mx-auto
            py-2
            border-b-2
            cursor-pointer
            flex
            justify-start
            items-center
          "
        >
          <span class="ml-2">5</span>
          <div class="rounded-full overflow-hidden ml-3">
            <img src="https://picsum.photos/60/60?random=1" alt="" />
          </div>
          <h2 class="ml-3">星座</h2>
        </article>
        <article
          class="
            w-10/12
            mx-auto
            py-2
            border-b-2
            cursor-pointer
            flex
            justify-start
            items-center
          "
        >
          <span class="ml-2">5</span>
          <div class="rounded-full overflow-hidden ml-3">
            <img src="https://picsum.photos/60/60?random=1" alt="" />
          </div>
          <h2 class="ml-3">星座</h2>
        </article>
        <article
          class="
            w-10/12
            mx-auto
            py-2
            border-b-2
            cursor-pointer
            flex
            justify-start
            items-center
          "
        >
          <span class="ml-2">5</span>
          <div class="rounded-full overflow-hidden ml-3">
            <img src="https://picsum.photos/60/60?random=1" alt="" />
          </div>
          <h2 class="ml-3">星座</h2>
        </article>
        <article
          class="
            w-10/12
            mx-auto
            py-2
            border-b-2
            cursor-pointer
            flex
            justify-start
            items-center
          "
        >
          <span class="ml-2">5</span>
          <div class="rounded-full overflow-hidden ml-3">
            <img src="https://picsum.photos/60/60?random=1" alt="" />
          </div>
          <h2 class="ml-3">星座</h2>
        </article>
        <article
          class="
            w-10/12
            mx-auto
            py-2
            border-b-2
            cursor-pointer
            flex
            justify-start
            items-center
          "
        >
          <span class="ml-2">5</span>
          <div class="rounded-full overflow-hidden ml-3">
            <img src="https://picsum.photos/60/60?random=1" alt="" />
          </div>
          <h2 class="ml-3">星座</h2>
        </article>
        <article
          class="
            w-10/12
            mx-auto
            py-2
            border-b-2
            cursor-pointer
            flex
            justify-start
            items-center
          "
        >
          <span class="ml-2">5</span>
          <div class="rounded-full overflow-hidden ml-3">
            <img src="https://picsum.photos/60/60?random=1" alt="" />
          </div>
          <h2 class="ml-3">星座</h2>
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
