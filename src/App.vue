<template>
  <app-header />
  <Landing />
  <router-view />
</template>

<script>
import AppHeader from "@/components/Header.vue";
import Landing from "@/components/Landing.vue";

export default {
  components: {
    AppHeader,
    Landing,
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
