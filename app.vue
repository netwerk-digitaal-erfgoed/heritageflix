<template>
  <div class="min-h-screen">
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { useCategoryStore } from "@/stores/categories";
import { useArtworkStore } from "@/stores/artworks";

const { upsertCategory } = useCategoryStore();
const { upsertArtwork } = useArtworkStore();


const { categories } = await fetch(
  `http://localhost:3051/categories.json`
).then((r) => r.json());
categories.forEach((cat: Category) => upsertCategory(cat))

// Load in the art per category
const loadArt = async (id: number) => {
  const { artworks } = await fetch(`http://localhost:3051/categories/${id}.json`).then(
    (r) => r.json()
  );
  artworks.forEach((art: Artwork) => upsertArtwork(art, id))
};

// For test purposes only category 1 is filled
await loadArt(1);
</script>

<style lang="scss">
body {
  background-image: url("~/assets/images/index-bg.png");
  background-size: cover;
}
</style>
