import { defineStore } from 'pinia'
import { useCategoryStore } from "@/stores/categories";

const defaultPageSize = 16;

export const useArtworkStore = defineStore('artworks', () => {
  const artworks = ref([]);
  const totalArtworks = computed(() => artworks.value.length);

  function findById (id: string, categoryId: string): Artwork | undefined {
    return artworks.value.find((art: Artwork) => art.id === id && art.categoryId === categoryId);
  }

  function findPrev (artworkId: string, categoryId: string): Artwork | undefined {
    const idx = findIndex(artworkId, categoryId);
    return artworks.value.find((art: Artwork, index: number) => {
      return art.categoryId === categoryId && index === (idx - 1);
    });
  }

  function findNext (artworkId: string, categoryId: string): Artwork | undefined {
    const idx = findIndex(artworkId, categoryId);
    return artworks.value.find((art: Artwork, index: number) => {
      return art.categoryId === categoryId && index > idx;
    });
  }

  function findByCategory (categoryId: string, limit: number = defaultPageSize, page: number = 0): Artwork[] {
    const start = page * limit;
    const end = (page + 1) * limit;
    return artworks
      .value
      .filter((art: Artwork) => art.categoryId === categoryId)
      .slice(start, end);
  }

  async function listOrFetchByCategory (categoryId: string, limit: number = defaultPageSize, page: number = 0): Promise<Artwork[]> {
    let artworks = findByCategory(categoryId, limit, page);

    if (!artworks.length) {
      await fetchByCategory(categoryId, limit, page);
      artworks = findByCategory(categoryId, limit, page);
    }

    return artworks;
  }

  async function loadNext (artworkId: string, categoryId: string): Promise<void> {
    const idx = findIndex(artworkId, categoryId);
    const total = totalByCategory(categoryId);
    if (idx > (total - 3)) {
      await fetchByCategory(categoryId, defaultPageSize, (total / defaultPageSize));
    }
  }

  /**
   * Private Functions
   */
  function findIndex (artworkId: string, categoryId: string): number {
    return artworks.value.findIndex((art: Artwork) => art.id === artworkId && art.categoryId === categoryId);
  }

  function totalByCategory (categoryId: string): number {
    return artworks.value.filter((art: Artwork) => art.categoryId === categoryId).length;
  }

  async function fetchByCategory (categoryId: string, limit: number = defaultPageSize, page: number = 0): Promise<void> {
    console.warn('Artworks.ts#fetchByCategory', categoryId, limit, page);
    const { $ndeRepository } = useNuxtApp();
    const { updateCategory, findCategoryById } = useCategoryStore();
    const category = findCategoryById(categoryId);

    // Only fetch if we have the category
    if (category) {
      const artworksForPeriod:any = await $ndeRepository.getArtworksForPeriod(category.originalId, limit, page) || [];
      artworks.value.push(...artworksForPeriod.map((artwork: any) => {
        const slug = useSlugify(artwork?.name) + "-" + artwork.heritageObject.slice(-4);
        return {
          id: slug,
          originalId: artwork.heritageObject,
          artist: artwork.creatorName,
          categoryId: categoryId,
          description: artwork?.description,
          digitalObjectURL: artwork?.URL,
          image: artwork?.imageContentUrl,
          museum: artwork?.publisher,
          museumURL: artwork?.publisher,
          period: artwork?.dateCreated,
          title: artwork?.name
        };
      }));

      // Update the category if needed
      if (artworksForPeriod.length && !category.image) {
        updateCategory({...category, image: artworksForPeriod[0].imageContentUrl});
      }
    }
  }

  return {
    totalArtworks,
    artworks,
    findById,
    findByCategory,
    listOrFetchByCategory,
    loadNext,
    findNext,
    findPrev
  };
});
