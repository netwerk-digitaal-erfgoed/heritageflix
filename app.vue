<template>
  <div class="min-h-screen">
    <NuxtPage />
  </div>
</template>

<script setup>
import { useCategoriesStore } from "~/stores/categories";

const store = useCategoriesStore();

const { categories } = await fetch(
  `http://localhost:3051/categories.json`
).then((r) => r.json());

store.$patch(categories);
</script>

<style lang="scss">
body {
  background-image: url("~/assets/images/index-background.png");
  background-size: cover;
}
</style>
