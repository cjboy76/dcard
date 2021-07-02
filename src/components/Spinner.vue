<template>
  <!-- spinner -->
  <div class="w-4/5 mx-auto flex justify-center p-2 spin" v-if="showingSpinner">
    <div class="w-12 h-12 rounded-full border-t-2 border-green-700"></div>
  </div>
</template>

<script>
export default {
  name: "Spinner",
  props: {
    showingSpinner: Boolean,
  },
};
</script>
