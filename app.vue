<template>
  <div class="min-h-screen">
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { useCategoryStore } from "@/stores/categories";
import { useArtworkStore } from "@/stores/artworks";

const { $ndeRepository } = useNuxtApp();

const { upsertCategory, findCategoryBySlug } = useCategoryStore();
const { upsertArtwork } = useArtworkStore();

const periods = await $ndeRepository.getArtPeriodsWithArt();
periods.forEach((period: any) => {
  // Load the artworks for this period
  $ndeRepository.getArtworksForPeriod(period.artPeriod)
  .then((artworks: any) => {
    // Insert artworks into the store
    artworks.forEach((artwork: any) => {
      upsertArtwork({
        id: artwork.heritageObject,
        categoryId: period.artPeriod,
        artist: artwork.creatorName,
        description: artwork?.description,
        digitalObjectURL: artwork?.URL,
        image: artwork?.imageContentUrl,
        museum: artwork?.publisher,
        museumURL: artwork?.publisher,
        period: artwork?.dateCreated,
        slug: useSlugify(artwork?.name),
        title: artwork?.name
      });
    });
    return {period: period, artworks: artworks}
  })
  .then((result: any) => {
    const { period, artworks } = result;

    // Create the category
    upsertCategory({
      id: period.artPeriod,
      title: useCapitalize(period.name),
      slug: useSlugify(period.name),
      period: usePeriodName(period?.startDate, period?.endDate),
      numberOfArtworks: parseInt(period.numberOfHeritageObjects, 10),
      image: artworks[0].imageContentUrl
    });
  })
});
</script>

<style lang="scss">
body {
  background-image: url("~/assets/images/index-bg.png");
  background-size: cover;
}
</style>
