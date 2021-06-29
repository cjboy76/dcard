<template>
  <app-header />
  <router-view />
</template>

<script>
import AppHeader from "@/components/Header.vue";

export default {
  components: {
    AppHeader,
  },
};
</script>
