<template>
  <div class="artwork-slider" v-if="artworks.length">
    <div class="flex justify-between items-center mb-9">
      <div class="text-5xl uppercase">
        {{ category.title }} {{ category.period }}
      </div>

      <AtomsNavigation
        class="text-xl font-medium uppercase"
        :to="{ name: 'category', params: { category: category.slug } }"
      >
        Toon alle
      </AtomsNavigation>
    </div>

    <MoleculesSlider
      class="artworks"
      :slider-props="artworksSliderProps"
    >
      <SplideSlide v-for="artwork in artworks" :key="artwork.id">
        <AtomsArtworkTeaser
          :artwork="artwork"
          :to="{
            name: 'category-art',
            params: { category: category.slug, art: artwork.id },
          }"
        />
      </SplideSlide>
    </MoleculesSlider>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { SplideSlide } from "@splidejs/vue-splide";
import { useArtworkStore } from "@/stores/artworks";

const props = defineProps({
  category: {
    type: Object as PropType<Category>,
    required: true
  }
});

const { findArtworksByCategory } = useArtworkStore();
const artworks = findArtworksByCategory(props.category.id, 0, 10);
const artworksSliderProps = {
  gap: "4.5rem"
};
</script>

<style scoped lang="scss">
.artworks {

  &.is-initialized,
  &.is-rendered {
    :deep(.splide__track) {
      overflow: visible;
    }
  }

  :deep(.splide__arrow--prev) {
    left: -4.75rem;
  }

  :deep(.splide__arrow--next) {
    right: -4.75rem;
  }
}
</style>
