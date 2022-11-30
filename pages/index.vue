<template>
  <div>
    <MoleculesBrandingHeader :logoUrl="logo" />
    <section>
      <OrganismsCategorySlider :categories="categories" />
    </section>
    <MoleculesBrandingIntro :intro="intro" />
    <section class="py-8">
      <div class="overflow-hidden px-3">
        <div v-for="category in categories" :key="category.id" class="flex justify-center mt-16">
          <OrganismsArtworkSlider class="w-10/12" :category="category" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useCategoryStore } from "@/stores/categories";
import { useArtworkStore } from "@/stores/artworks";
import { storeToRefs } from 'pinia';

const { categories } = storeToRefs(useCategoryStore());
const { listOrFetchByCategory } = useArtworkStore();
const intro = ref();
const logo = ref();

onMounted(async () => {
  categories.value.forEach((category: Category) => listOrFetchByCategory(category.id));

  // Load in the branding info
  const devPrefix = process.dev ? '/assets' : '';
  const jsonLocation = `${devPrefix}/config/branding.json`;
  const branding:Branding = await $fetch(jsonLocation);
  intro.value = branding.intro;
  logo.value = `${devPrefix}${branding.logo}`;
});
</script>
