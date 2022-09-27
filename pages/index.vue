<template>
  <main>
    <section>
      <MoleculesSlider
        class="categories-slider"
        :slider-props="categoriesSliderProps"
      >
        <SplideSlide
          v-for="category in categories"
          :key="category.id"
          class="category-slide"
        >
          <AtomsCategoryTeaser :category="category" />
        </SplideSlide>
      </MoleculesSlider>
    </section>

    <section class="py-24">
      <div class="overflow-hidden px-3 -mt-16">
        <div
          v-for="category in categories"
          :key="category.id"
          class="flex justify-center mt-16"
        >
          <div class="w-10/12">
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
              class="artworks-slider"
              :slider-props="artworksSliderProps"
            >
              <SplideSlide v-for="artwork in slicedArtworks" :key="artwork.id">
                <AtomsArtworkTeaser
                  :artwork="artwork"
                  :path="{
                    name: 'category-art',
                    params: { category: category.slug, art: artwork.id },
                  }"
                />
              </SplideSlide>
            </MoleculesSlider>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { SplideSlide } from "@splidejs/vue-splide";
import { useArtworkStore } from "~/stores/artworks";
import { useCategoriesStore } from "~/stores/categories";

const { categories } = useCategoriesStore();
const { artworks } = useArtworkStore();

const categoriesSliderProps = {
  gap: "1.25rem",
  padding: { right: "5%" }
};
const artworksSliderProps = {
  gap: "4.5rem"
};

const slicedArtworks = computed(() => artworks.slice(0, 10));
</script>

<style scoped lang="scss">
.categories-slider {
  :deep(.slider-track) {
    background-color: #000000;
  }

  .category-slide {
    transition: 0.15s ease-in-out;

    &:hover {
      width: calc(((100% + 1.25rem) / 3) - 1.25rem) !important;
    }
  }

  :deep(.splide__arrow--prev) {
    left: 2rem;
  }

  :deep(.splide__arrow--next) {
    right: 2rem;
  }
}

.artworks-slider {
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
