<template>
  <!-- home page -->
  <div class="container mx-auto lg:grid lg:grid-cols-5 lg:gap-4 lg:mt-4">
    <app-mainsidebar />
    <app-maincontent />
    <app-mainprofile />
  </div>
</template>

<script>
import AppMainsidebar from "@/components/Mainsidebar.vue";
import AppMaincontent from "@/components/Maincontent.vue";
import AppMainprofile from "@/components/Mainprofile.vue";

export default {
  name: "Home",
  components: {
    AppMainsidebar,
    AppMaincontent,
    AppMainprofile,
  },
};
</script>

<style lang="scss" scoped>
.tab-1::after,
.tab-2::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -1px;
  height: 2px;
  width: 100%;
  background-color: black;
}
</style>
