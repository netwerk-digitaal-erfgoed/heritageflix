<template>
  <div class="absolute z-10 bg-white h-screen w-screen overflow-hidden border-blue" :class="transition">
    <MoleculesHeader :showCategory="true">
      <span class="text-3xl uppercase">{{ category.title }} {{ category.period }}</span>
    </MoleculesHeader>
    <div class="grid grid-cols-12">
      <div class="col-span-1 flex justify-center items-center">
        <MoleculesIconNavigation name="arrowLeft" :to="prevArtwork" direction="right" v-if="currentArt > 1"/>
      </div>
      <div class="col-span-10 flex flex-col justify-center items-center">
        <div class="placeholder w-full bg-blue flex justify-center items-center">
          <img :src="artwork.image" v-if="artwork?.image" />
        </div>
        <div class="description">
          <h2 class="text-4xl my-4">{{ artwork.title }}</h2>
          <div class="text-sm my-4 w-1/2">{{ artwork.description }}</div>
          <div class="properties grid grid-flow-col grid-rows-3 gap-4">
            <!-- TODO: Make this dynamic -->
            <AtomsProperty label="Maker" :value="artwork.artist" />
            <AtomsProperty label="Jaar" :value="artwork.period" />
            <AtomsProperty label="Museum" :value="artwork.museum" :href="artwork.museumURL" />
            <AtomsProperty label="Digital Object" value="Bekijk hier" :href="artwork.digitalObjectURL" />
          </div>
        </div>
      </div>
      <div class="col-span-1 flex justify-center items-center">
        <MoleculesIconNavigation name="arrowRight" :to="nextArtwork" direction="left" v-if="currentArt < 4" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTransitionStore } from '@/stores/transition';
import { useCategoryStore } from "@/stores/categories";
import { useArtworkStore } from "@/stores/artworks";
import { storeToRefs } from 'pinia';

// Get the transition needed for the animations
const store = useTransitionStore();
const route = useRoute();
const { transition } = storeToRefs(store);

// Find the category and artwork
const { findCategoryBySlug } = useCategoryStore();
const { findArtworkById } = useArtworkStore();

// TODO: We should let the store handle the looking up of category
const { category: currentCategory, art } = route.params as unknown as Params
const currentArt = parseInt(art, 10);
const category = findCategoryBySlug(currentCategory);
const artwork = findArtworkById(currentArt, category?.id);

definePageMeta({
  pageTransition: {
    name: "slide",
    mode: "in-out",
    duration: 1000
  }
});
const newParams = { category: category.slug };

// new Paths
const homePath = { name: 'index' };
const categoryPath = { name: 'category', params: { category: category.slug } };
const prevArtwork = { name: route.name, params: { ...newParams, art: artwork?.id - 1 } };
const nextArtwork = { name: route.name, params: { ...newParams, art: artwork?.id + 1 } };
</script>

<style scoped lang="scss">
.placeholder {
  height: 54rem;
}
</style>
