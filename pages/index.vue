<template>
  <Splide
    :options="{ rewind: true, perPage: 4 }"
    aria-label="My Favorite Images"
  >
    <SplideSlide v-for="category in store.$state">
      <div class="category-slide">
        <img
          class="category-slide-img"
          :src="category.image"
          :alt="category.title"
        />

        <div class="category-slide-body">
          <div class="category-slide-title">
            {{ category.title }}
          </div>

          <div class="category-slide-subtitle">
            {{ category.period }}
          </div>
        </div>
      </div>
    </SplideSlide>
  </Splide>
  <!-- <div class="px-3">
    <div class="grid grid-cols-12">
      <div class="col-span-4"></div>

      <div class="col-span-6 col-start-6">
        <Overview :items="categories" teaser-type="category" />
      </div>
    </div>
  </div> -->
</template>

<script setup>
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import { useCategoriesStore } from "~/stores/categories";

const store = useCategoriesStore();
</script>

<style scoped lang="scss">
.category-slide {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100vh;
}

.category-slide-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.category-slide-body {
  text-align: center;
  margin-bottom: 10%;
  z-index: 1;
}

.category-slide-title {
}

.category-slide-subtitle {
}
</style>
