<template>
  <header class="bg-green-100 fixed top-0 w-full z-10">
    <div class="container mx-auto flex justify-center items-center">
      <nav class="flex justify-start items-center container w-4/5">
        <img
          src="@/assets/fish.svg"
          alt="fish"
          width="70"
          height="50"
          class="ml-1"
        />
        <form class="flex justify-start items-center ml-4 w-5/6">
          <input
            type="search"
            placeholder="搜尋"
            class="bg-green-200 outline-none text-gray-900 p-1 w-3/4"
          />
          <button class="rounded-sm p-1">
            <span class="material-icons"> search </span>
          </button>
        </form>
      </nav>
      <div class="float-right w-1/5 flex justify-end mr-1">
        <span>註冊/登入</span>
      </div>
    </div>
  </header>
  <div class="w-full" style="height: 70px"></div>
</template>

<script>
export default {
  name: "AppHeader",
};
</script>
