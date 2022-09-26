<template>
  <div class="min-h-screen">
    <NuxtPage />
  </div>
</template>

<script setup>
import { useCategoriesStore } from "~/stores/categories";
import { useArtworksStore } from "~/stores/artworks";

const categoriesStore = useCategoriesStore();
const artworksStore = useArtworksStore();

const { categories } = await fetch(
  `http://localhost:3051/categories.json`
).then((r) => r.json());
const { artworks } = await fetch(`http://localhost:3051/artworks.json`).then(
  (r) => r.json()
);

categoriesStore.$patch(categories);
artworksStore.$patch(artworks);
</script>

<style lang="scss">
body {
  background-image: url("~/assets/images/index-bg.png");
  background-size: cover;
}
</style>
