<template>
  <div>
    <MoleculesHeader />
    <section class="cover-image" :style="cssVars">
      <div class="flex flex-col justify-center items-center glass">
        <h1 class="text-white title">{{ state.category?.title }}</h1>
        <h2 class="text-white title">{{ state.category?.period }}</h2>
      </div>
    </section>

    <section class="py-24">
      <div class="px-3">
        <div class="flex justify-center">
          <div class="w-10/12">

            <template v-if="state.category?.numberOfArtworks">
              <div
                class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-12 gap-y-14"
              >
                <AtomsArtworkTeaser
                  v-for="artwork in state.artworks"
                  :key="artwork.id"
                  :artwork="artwork"
                  :to="{
                    name: 'category-artwork',
                    params: {
                      category: route.params.category,
                      artwork: artwork.id,
                    },
                  }"
                />
              </div>

              <AtomsObserver v-show="hasMore" class="flex justify-center items-center h-10 mt-3" threshold="0.75" @intersect="loadMore">
                <AtomsLoader class="w-1/10 h-4" />
              </AtomsObserver>
            </template>
            <div v-else>No artworks</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useCategoryStore } from "@/stores/categories";
import { useArtworkStore } from "@/stores/artworks";

const { findCategoryById } = useCategoryStore();
const { listOrFetchByCategory } = useArtworkStore();

// Needed for transition to art page
definePageMeta({
  pageTransition: {
    name: "page",
    mode: "in-out",
    duration: 1000
  }
});

// Load the category
const route = useRoute();
const category = route.params.category as string;
// const currentCategory = ;
const state = reactive({
  pageSize: 16,
  page: 0,
  artworks: [],
  category: {} as Category
});

state.artworks = await listOrFetchByCategory(category, state.pageSize, state.page);
state.category = findCategoryById(category);

// css vars needed for the header image
const cssVars = computed(() => {
  const url = state.category?.image ? `url(${state.category.image})` : '';
  return {
    backgroundImage: url,
  };
});

const hasMore = computed(() => {
  return state.category.numberOfArtworks > state.artworks.length;
});

const loadMore = async () => {
  state.page += 1;
  state.artworks.push(...await listOrFetchByCategory(category, state.pageSize, state.page));
};
</script>

<style scoped lang="scss">
.cover-image {
  background-repeat: no-repeat;
  background-size: cover;
  height: 595px;
  width: 100%;
  position: relative;
}

// @TODO: Move typography to a generic setup
.title {
  font-size: 4.375rem;
}

.pagination-container {
  display: flex;
  column-gap: 2.75rem;
}

:deep(.paginate-buttons) {
  height: 2.75rem;
  width: 2.75rem;
  cursor: pointer;

  &.active-page {
    background-color: #f2f5ff;
  }
}
</style>
