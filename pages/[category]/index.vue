<template>
  <main>
    <MoleculesHeader />
    <section class="cover-image" :style="cssVars">
      <div class="flex flex-col justify-center items-center glass">
        <h1 class="text-white title">{{ category.title }}</h1>
        <h2 class="text-white title">{{ category.period }}</h2>
      </div>
    </section>

    <section class="py-24">
      <div class="px-3">
        <div class="flex justify-center">
          <div class="w-10/12">
            <div class="grid grid-cols-4 gap-x-12 gap-y-14">
              <AtomsArtworkTeaser v-for="item in paginatedArtworks" :key="item.slug" :item="item" v-if="artworks.length" />
              <div v-else>No artworks</div>
            </div>

            <div class="flex justify-center mt-12">
              <vue-awesome-paginate
                :total-items="artworks.length"
                :current-page="1"
                :items-per-page="artworksPerPage"
                :max-pages-shown="3"
                :on-click="goToPage"
                :hide-prev-next-when-ends="true"
              >
                <template #prev-button>
                  <AtomsIcon
                    class="bg-blue text-black rounded-full"
                    name="arrowLeft"
                  />
                </template>

                <template #next-button>
                  <AtomsIcon
                    class="bg-blue text-black rounded-full"
                    name="arrowRight"
                  />
                </template>
              </vue-awesome-paginate>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { useCategoriesStore } from "@/stores/categories";
import { useArtworkStore } from "@/stores/artworks";

const { findCategoryBySlug } = useCategoriesStore();
const { upsertArtwork, artworks } = useArtworkStore();

// Load the category
const currentCategory = useRoute().params.category as string;
const category = findCategoryBySlug(currentCategory);

// Load the artworks into the store
// TODO: Replace with real data
if (category) {
  const data = await fetch(`http://localhost:3051/categories/${category.id}.json`).then(r => r.json());
  data?.artworks?.forEach((art: Artwork) => upsertArtwork(art, category.id))
}

// css vars needed for the header image
const cssVars = computed(() => {
  return {
    backgroundImage: `url(${category.image}})`
  }
});

// Pagination
let currentPage = ref(1);
const artworksPerPage = 16;

const paginatedArtworks = computed(() =>
  artworks.slice(
    (currentPage.value - 1) * artworksPerPage,
    currentPage.value * artworksPerPage
  )
);

const goToPage = (page: number) => {
  currentPage.value = page;
};


// Needed for transition to art page
definePageMeta({
  pageTransition: {
    name: "page",
    mode: "in-out",
    duration: 1000,
  }
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
    column-gap: 44px;
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
