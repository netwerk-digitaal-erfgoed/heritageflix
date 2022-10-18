<template>
  <div class="min-h-screen">
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { useCategoryStore } from "@/stores/categories";

onServerPrefetch(async () => {
  await useCategoryStore().listOrFetchCategories();
});
</script>

<style lang="scss">
body {
  background-image: url("~/assets/images/index-bg.png");
  background-size: cover;
}
</style>
