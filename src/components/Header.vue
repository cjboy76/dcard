<template>
  <header class="bg-green-100 fixed top-0 w-full z-10">
    <div class="container mx-auto flex justify-center items-center">
      <nav class="flex justify-start items-center container w-4/5">
        <!-- logo -->
        <img
          src="@/assets/fish.svg"
          alt="fish"
          width="70"
          height="50"
          class="ml-4 sm:ml-1"
        />
        <!-- search-bar -->
        <div class="ml-4 w-5/6 hidden lg:block">
          <form class="flex justify-start items-center">
            <input
              type="search"
              placeholder="搜尋"
              class="bg-green-200 outline-none text-gray-900 p-1 w-3/4"
            />
            <button class="rounded-sm p-1">
              <span class="material-icons"> search </span>
            </button>
          </form>
        </div>
      </nav>
      <!-- login/register -->
      <div
        class="
          float-right
          w-1/5
          flex
          justify-end
          mr-1
          cursor-pointer
          hover:text-gray-500
        "
      >
        <span class="hidden lg:block">註冊/登入</span>
      </div>
      <!-- hamburger button -->
      <button
        class="hamburger hamburger--elastic block lg:hidden"
        type="button"
      >
        <span class="hamburger-box">
          <span class="hamburger-inner"></span>
        </span>
      </button>
    </div>
  </header>
  <div class="w-full" style="height: 70px"></div>
</template>

<script>
export default {
  name: "AppHeader",
};
</script>
