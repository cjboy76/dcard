<template>
  <div class="relative">
    <app-header />
    <Landing />
    <router-view />
    <app-footer />
  </div>
</template>

<script>
import AppHeader from "@/components/Header.vue";
import Landing from "@/components/Landing.vue";
import AppFooter from "@/components/Footer.vue";

export default {
  components: {
    AppHeader,
    Landing,
    AppFooter,
  },
  created() {
    this.$store.dispatch("init_login");
  },
};
</script>
<style lang="scss" scoped>
.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: all 0.2s linear;
}
.fade-leave-to {
  transition: all 0.2s linear;
  opacity: 0;
}
</style>
