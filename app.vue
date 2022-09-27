<template>
  <div class="min-h-screen">
    <NuxtPage />
  </div>
</template>

<script setup>
import { useCategoriesStore } from "@/stores/categories";
import { useArtworkStore } from "~/stores/artworks";

const { upsertCategory } = useCategoriesStore();
const { upsertArtwork } = useArtworkStore();


const { categories } = await fetch(
  `http://localhost:3051/categories.json`
).then((r) => r.json());
const { artworks } = await fetch(`http://localhost:3051/categories/1.json`).then(
  (r) => r.json()
);

categories.forEach(cat => upsertCategory(cat))
artworks.forEach(art => upsertArtwork(art))
</script>

<style lang="scss">
body {
  background-image: url("~/assets/images/index-bg.png");
  background-size: cover;
}
</style>
