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
