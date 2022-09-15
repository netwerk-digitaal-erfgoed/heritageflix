<template>
  <div class="px-3">
    <div class="flex items-center justify-between">
      [LOGO]

      <h1>{{ filteredCategory.title }} {{ filteredCategory.period }}</h1>
    </div>

    <div class="flex items-center">
      <div class="grid grid-cols-12 w-full">
        <div class="col-span-4"></div>

        <div class="col-span-6 col-start-6">
          <Overview :items="artworks" cols="4" teaser-type="artwork" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";

definePageMeta({
  pageTransition: {
    name: "page",
    mode: "in-out",
    duration: 1000,
  },
});

const { categories } = await fetch(
  `http://localhost:3051/categories.json`
).then((r) => r.json());

const filteredCategory = categories.find(
  (category) => category.slug === useRoute().params.category
);

const { artworks } = await fetch(`http://localhost:3051/artworks.json`).then(
  (r) => r.json()
);
</script>
