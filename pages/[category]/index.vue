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

              <div class="flex justify-center mt-12">
                <vue-awesome-paginate
                  :total-items="state.category?.numberOfArtworks"
                  :current-page="1"
                  :items-per-page="state.pageSize"
                  :max-pages-shown="3"
                  :on-click="goToPage"
                  :hide-prev-next-when-ends="true"
                >
                  <template #prev-button>
                    <AtomsIcon
                      class="h-11 w-11 bg-blue text-black rounded-full"
                      name="arrowLeft"
                    />
                  </template>

                  <template #next-button>
                    <AtomsIcon
                      class="h-11 w-11 bg-blue text-black rounded-full"
                      name="arrowRight"
                    />
                  </template>
                </vue-awesome-paginate>
              </div>
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

// css vars needed for the header image
const cssVars = computed(() => {
  const url = state.category?.image ? `url(${state.category.image})` : '';
  return {
    backgroundImage: url,
  };
});

const goToPage = async (page: number) => {
  state.page = (page - 1);
  state.artworks = await listOrFetchByCategory(category, state.pageSize, state.page);
};

onMounted(async () => {
  state.page = 0;
  state.artworks = await listOrFetchByCategory(category, state.pageSize, state.page);
  state.category = findCategoryById(category);
});

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
