<template>
  <div>
    <section>
      <OrganismsCategorySlider :categories="categories" />
    </section>
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
const { categories } = useCategoryStore();
</script>
