<template>
  <div class="absolute z-10 bg-white h-screen w-screen border-blue" :class="transition">
    <MoleculesHeader :showCategory="true">
      <span class="text-3xl uppercase">{{ currentCategory?.title }} {{ currentCategory?.period }}</span>
    </MoleculesHeader>
    <div class="grid grid-cols-12">
      <div class="col-span-1 flex justify-center items-center">
        <MoleculesIconNavigation name="arrowLeft" :to="navPath(true)" direction="right" v-if="state.prev"/>
      </div>
      <div class="col-span-10 flex flex-col justify-center items-center">
        <div class="placeholder w-full bg-blue flex justify-center items-center">
          <img :src="currentArtwork?.image" v-if="currentArtwork?.image" class="h-full object-cover" />
        </div>
        <div class="description">
          <h2 class="text-4xl my-4">{{ currentArtwork?.title }}</h2>
          <div class="text-sm my-4 w-1/2">{{ currentArtwork?.description }}</div>
          <div class="properties grid grid-flow-col grid-rows-3 gap-4">
            <!-- TODO: Make this dynamic -->
            <AtomsProperty label="Maker" :value="currentArtwork?.artist" />
            <AtomsProperty label="Jaar" :value="currentArtwork?.period" />
            <AtomsProperty label="Museum" :value="currentArtwork?.museum" :href="currentArtwork?.museumURL" />
            <AtomsProperty label="Digital Object" value="Bekijk hier" :href="currentArtwork?.digitalObjectURL" />
          </div>
        </div>
      </div>
      <div class="col-span-1 flex justify-center items-center">
        <MoleculesIconNavigation name="arrowRight" :to="navPath()" direction="left" v-if="state.next" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTransitionStore } from '@/stores/transition';
import { useCategoryStore } from "@/stores/categories";
import { useArtworkStore } from "@/stores/artworks";
import { storeToRefs } from 'pinia';

// Transition settings
definePageMeta({
  middleware: ['redirect-without-artwork'],
  pageTransition: {
    name: "slide",
    mode: "in-out",
    duration: 1000,
    onBeforeEnter() { useNoScroll() },
    onAfterEnter() { useScroll() },
    onBeforeLeave() { useNoScroll() },
    onAfterLeave() { useScroll() }
  }
});

const { $navigate } = useNuxtApp()
const state = reactive({
  next: undefined,
  prev: undefined
})

// Get the transition needed for the animations
const store = useTransitionStore();
const { transition } = storeToRefs(store);

// Find the category and artwork
const { findCategoryById } = useCategoryStore();
const artworkStore = useArtworkStore();
const { findById, loadNext, findNext, findPrev } = artworkStore;
const { totalArtworks } = storeToRefs(artworkStore);

// Find the current category
const route = useRoute();
const { category, artwork } = route.params as unknown as Params
const currentCategory = findCategoryById(category);

// Find the current artwork
const currentArtwork = findById(artwork, category);

// Nav paths for the navigation buttons
const navPath = (prev: Boolean = false) => {
  const propName = prev ? 'prev' : 'next'
  return { name: route.name, params: { category: category, artwork: state[propName]?.id } };
};

/**
 * Based on the direction of the component and the key pressed, trigger navigation
 */
const eventHandler = (evt: KeyboardEvent) => {
  if (['ArrowLeft', 'ArrowRight'].includes(evt.key)) {
    const path = navPath(evt.key === 'ArrowLeft');
    const direction = (evt.key === 'ArrowLeft') ? 'right' : 'left';
    $navigate(path, direction);
  }
};

onMounted(() => {
  document.addEventListener('keyup', eventHandler);
});

onUnmounted(() => {
  document.removeEventListener('keyup', eventHandler);
});

// Check if the total artworks changed to update the next/prev buttons
watch(totalArtworks, x => {
  state.next = findNext(artwork, category);
  state.prev = findPrev(artwork, category);
}, { immediate: true });

// Check if we need to load more artworks
loadNext(artwork, category);
</script>

<style scoped lang="scss">
.placeholder {
  height: 54rem;
}
</style>
