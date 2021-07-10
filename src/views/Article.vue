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
        <h1>hehehe</h1>
      </div>
      <!-- article -->
      <div class="container pb-8">
        <div class="bg-gray-100">
          <!-- default -->
          <article class="w-10/12 mx-auto py-2 border-b-2">
            <div class="article-text w-11/12 mx-auto text-center text-2xl py-8">
              for testing
            </div>
          </article>
        </div>
      </div>
    </div>
    <app-mainprofile />
  </div>
</template>

<script>
export default {};
</script>

<style></style>
