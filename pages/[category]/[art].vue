<template>
  <main class="absolute z-10 bg-white w-full overflow-hidden border-blue" :class="transition">
    <div class="header w-full flex justify-between p-4">
      <MoleculesIconNavigation name="logo" :to=homePath />
      [CATEGORY]
      <MoleculesIconNavigation name="close" :to="categoryPath" direction="down"/>
    </div>
    <div class="grid grid-cols-12">
      <div class="col-span-1 flex justify-center items-center">
        <MoleculesIconNavigation name="arrowLeft" :to="prevArtwork" direction="right" v-if="currentArt > 1"/>
      </div>
      <div class="col-span-10 flex flex-col justify-center items-center">
        <div class="placeholder w-full bg-blue flex justify-center items-center">
          [image]
        </div>
        <div class="description pt-4">
          <h2>Seine Fishing in Kazusa Province</h2>
          <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
          <div class="properties">
            <div>
              <label>Maker</label>
              <span>Jean-Honoré Fragonard</span>
            </div>
            <div>
              <label>Jaar</label>
              <span>1877 - 1900</span>
            </div>
            <div>[MUSEUM]</div>
            <div>[DIGITAL OBJECT]</div>
          </div>
        </div>
      </div>
      <div class="col-span-1 flex justify-center items-center">
        <MoleculesIconNavigation name="arrowRight" :to="nextArtwork" direction="left" v-if="currentArt < 4" />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
  import { useTransitionStore } from '@/stores/transition';
  import { useCategoriesStore } from "@/stores/categories";
  import { useArtworkStore } from "@/stores/artworks";
  import {storeToRefs} from 'pinia';

  // Get the transition needed for the animations
  const store = useTransitionStore();
  const route = useRoute();
  const { transition } = storeToRefs(store);

  // Find the category and artwork
  const { findCategoryBySlug } = useCategoriesStore();
  const { findArtworkById } = useArtworkStore();

  // TODO: We should let the store handle the looking up of category
  const { category: currentCategory, art: currentArt } = route.params as unknown as Params
  const category = findCategoryBySlug(currentCategory);
  const artwork = findArtworkById(currentArt, category?.id);
  console.warn(artwork)

  definePageMeta({
    pageTransition: {
      name: "slide",
      mode: "in-out",
      duration: 1000
    }
  });
  const newParams = { category: category.slug };

  // new Paths
  const homePath = {name: 'index'};
  const categoryPath = {name: 'category', params: { category: category.slug }};
  const prevArtwork = {name: route.name, params: { ...newParams , art: artwork?.id - 1 }};
  const nextArtwork = {name: route.name, params: { ...newParams, art: artwork?.id + 1 }};
</script>

<style scoped lang="scss">
  .header {
    height: 3rem;
  }

  .placeholder {
    height: 54rem;
  }

</style>
