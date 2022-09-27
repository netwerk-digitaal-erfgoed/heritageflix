<template>
  <div>
    <MoleculesHeader />
    <div class="cover-image" :style="cssVars">
      <div class="flex flex-col justify-center items-center glass">
        <h1 class="text-white title">{{ category.title }}</h1>
        <h2 class="text-white title">{{ category.period }}</h2>
      </div>
    </div>
    <div class="grid grid-cols-12 w-full pt-6">
      <div class="col-span-10 col-start-2 flex flex-wrap justify-start">
        <AtomsArtworkTeaser v-for="item in artworks" :key="item.slug" :item="item" v-if="artworks.length" />
        <!-- <MoleculesOverview :items="artworks" v-if="artworks.length" /> -->
        <div v-else>No artworks</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useCategoriesStore } from "@/stores/categories";
import { useArtworkStore } from "@/stores/artworks";

const { findCategoryBySlug } = useCategoriesStore();
const { upsertArtwork, artworks } = useArtworkStore();

// Load the category
const currentCategory = useRoute().params.category as string;
const category = findCategoryBySlug(currentCategory);

// Load the artworks into the store
// TODO: Replace with real data
if (category) {
  const data = await fetch(`http://localhost:3051/categories/${category.id}.json`).then(r => r.json());
  data?.artworks?.forEach((art: Artwork) => upsertArtwork(art, category.id))
}

// css vars needed for the header image
const cssVars = computed(() => {
  return {
    backgroundImage: `url(${category.image}})`
  }
});

// Needed for transition to art page
definePageMeta({
  pageTransition: {
    name: "page",
    mode: "in-out",
    duration: 1000,
  }
});
</script>

<style scoped lang="scss">
  .cover-image {
    background-repeat: no-repeat;
	  background-size: cover;
    height: 595px;
    width: 100%;
    position: relative;
  }

  // @TODO: Move typography to a generic setup
  .title {
    font-size: 4.375rem;
  }
</style>
