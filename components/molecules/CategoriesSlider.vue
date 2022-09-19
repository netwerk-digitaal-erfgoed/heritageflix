<template>
  <Splide :has-track="false" :options="splideProps" aria-label="Categories">
    <SplideTrack class="categories-slider-track">
      <SplideSlide
        v-for="category in store.$state"
        :key="category.id"
        class="category-slide"
      >
        <NuxtLink
          :to="{
            name: 'category',
            params: { category: category.slug },
          }"
        >
          <div class="category-slide-inner">
            <div class="category-slide-img-wrapper">
              <img
                v-if="category.image"
                class="category-slide-img"
                :src="category.image"
                :alt="category.title"
              />
            </div>

            <div class="category-slide-body">
              <div v-if="category.title" class="category-slide-title">
                {{ category.title }}
              </div>

              <div v-if="category.period" class="category-slide-subtitle">
                {{ category.period }}
              </div>
            </div>
          </div>
        </NuxtLink>
      </SplideSlide>
    </SplideTrack>

    <div class="splide__arrows">
      <button class="splide__arrow splide__arrow--prev">
        <AtomsIcon name="arrowLeft" />
      </button>

      <button class="splide__arrow splide__arrow--next">
        <AtomsIcon name="arrowRight" />
      </button>
    </div>
  </Splide>
</template>

<script setup lang="ts">
import { Splide, SplideTrack, SplideSlide } from "@splidejs/vue-splide";
import { useCategoriesStore } from "~/stores/categories";

const store = useCategoriesStore();

const splideProps = {
  gap: "1.25rem",
  padding: { right: "5%" },
  pagination: false,
  perMove: 1,
  perPage: 4,
  speed: 300,
};
</script>

<style scoped lang="scss">
.categories-slider-track {
  background-color: #000000;
}

.category-slide {
  transition: 0.15s ease-in-out;
  cursor: pointer;

  &:hover {
    width: calc(((100% + 1.25rem) / 3) - 1.25rem) !important;

    .category-slide-img {
      filter: blur(0);
    }
  }
}

:deep .splide__arrow {
  width: 2.75rem;
  height: 2.75rem;
  background: #f2f5ff;
  opacity: 1 !important;

  &:disabled {
    display: none;
  }

  &--prev {
    left: 1.625rem;

    svg {
      transform: none;
    }
  }

  &--next {
    right: 1.625rem;
  }

  svg {
    width: 20px;
    height: 14px;
  }
}

.category-slide-inner {
  position: relative;
  height: 100vh;
}

.category-slide-img-wrapper {
  position: relative;
  height: 100%;
  overflow: hidden;

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.02);
  }
}

.category-slide-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(0.625rem);
  transition: 0.15s ease-in-out;
}

.category-slide-body {
  position: absolute;
  width: 100%;
  bottom: 10%;
  padding: 0.75rem;
  background: rgba(0, 0, 0, 0.3);
  color: #ffffff;
  text-align: center;
  font-size: 2.5rem;
  line-height: 1.5;
  z-index: 1;
}

.category-slide-title {
  margin-bottom: 1.25rem;

  &:last-child {
    margin-bottom: 0;
  }
}
</style>
