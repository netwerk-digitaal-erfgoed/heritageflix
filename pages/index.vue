<template>
  <section>
    <MoleculesSlider
      class="categories-slider"
      :slider-props="categoriesSliderProps"
    >
      <SplideSlide
        v-for="category in categoriesStore.$state"
        :key="category.id"
        class="category-slide"
      >
        <NuxtLink
          :to="{
            name: 'category',
            params: { category: category.slug },
          }"
        >
          <Teaser
            :title="category.title"
            :subtitle="category.period"
            :imgSrc="category.image"
            type="category"
          />
        </NuxtLink>
      </SplideSlide>
    </MoleculesSlider>
  </section>

  <section class="py-24">
    <div class="overflow-hidden px-3 -mt-16">
      <div
        v-for="category in categoriesStore.$state"
        :key="category.id"
        class="flex justify-center mt-16"
      >
        <div class="w-10/12">
          <div class="flex justify-between items-center mb-9">
            <div class="text-5xl uppercase">
              {{ category.title }} {{ category.period }}
            </div>

            <NuxtLink
              class="text-xl font-medium uppercase"
              :to="{
                name: 'category',
                params: { category: category.slug },
              }"
            >
              Toon alle
            </NuxtLink>
          </div>

          <MoleculesSlider
            class="artworks-slider"
            :slider-props="artworksSliderProps"
          >
            <SplideSlide
              v-for="artwork in artworksStore.$state"
              :key="artwork.id"
            >
              <NuxtLink
                :to="{
                  name: 'category-art',
                  params: { category: category.slug, art: artwork.slug },
                }"
              >
                <Teaser
                  :title="artwork.title"
                  :subtitle="`${artwork.artist}, ${artwork.period}`"
                  :imgSrc="artwork.image"
                  type="artwork"
                />
              </NuxtLink>
            </SplideSlide>
          </MoleculesSlider>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { SplideSlide } from "@splidejs/vue-splide";
import { useArtworksStore } from "~/stores/artworks";
import { useCategoriesStore } from "~/stores/categories";

const categoriesStore = useCategoriesStore();
const artworksStore = useArtworksStore();

const categoriesSliderProps = {
  gap: "1.25rem",
  padding: { right: "5%" },
};
const artworksSliderProps = {
  gap: "4.5rem",
};
</script>

<style scoped lang="scss">
.categories-slider {
  :deep .slider-track {
    background-color: #000000;
  }

  .category-slide {
    transition: 0.15s ease-in-out;

    &:hover {
      width: calc(((100% + 1.25rem) / 3) - 1.25rem) !important;
    }
  }

  :deep .splide__arrow {
    &--prev {
      left: 2rem;
    }

    &--next {
      right: 2rem;
    }
  }
}

.artworks-slider {
  :deep &.is-initialized .splide__track,
  :deep &.is-rendered .splide__track {
    overflow: visible;
  }

  :deep .splide__arrow {
    &--prev {
      left: -4.75rem;
    }

    &--next {
      right: -4.75rem;
    }
  }
}
</style>
