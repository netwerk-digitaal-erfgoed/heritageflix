import { defineStore } from 'pinia'
import { useCategoryStore } from "@/stores/categories";
import { useQueriesStore } from '@/stores/queries';

const defaultPageSize = 16;

export const useArtworkStore = defineStore('artworks', () => {
  const artworks = ref<Artwork[]>([]);
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

  function generateProperties (input: ArtworkResponse): ArtProperties {
    const nameSpaces = ['creator', 'image', 'contentLocation', 'province', 'temporalCoverage'];
    const topLevelProps = ['heritageObject', 'name', 'identifier', 'description', 'imageContentUrl'];
    return Object.keys(input).reduce((collection: ArtProperties, currentValue: string) => {
      if (!nameSpaces.includes(currentValue) && !topLevelProps.includes(currentValue)) {
        collection[currentValue] = input[currentValue as keyof ArtworkResponse];
      }
      return collection;
    }, {});
  }

  function countById (): Record<string, number> {
    return artworks.value.reduce((collection: Record<string, number>, currentValue: Artwork) => {
      const id = currentValue.id.replace(/(.*)-\d*/i, "$1");
      collection[id] = (id in collection) ? collection[id] + 1 : 1;
      return collection;
    }, {});
  }

  async function fetchByCategory (categoryId: string, limit: number = defaultPageSize, page: number = 0): Promise<void> {
    console.warn('Artworks.ts#fetchByCategory');
    const { updateCategory, findCategoryById } = useCategoryStore();
    const category = findCategoryById(categoryId);

    // Only fetch if we have the category
    if (category) {
      const { getItemsQuery } = useQueriesStore();
      const response = await getItemsQuery(limit, page, category.originalId) || [];
      const counts = countById();
      artworks.value.push(...response.map((input: ArtworkResponse): Artwork => {
        const id = input.identifier || useSlugify(input.name || '');
        const suffix = counts[id] ? `-${counts[id]}` : '';
        counts[id] = (id in counts) ? counts[id] + 1 : 1;
        return {
          id: `${id}${suffix}`,
          title: input.name || `${input.locationName}, ${input.provinceName}`,
          description: input.description,
          originalId: input.heritageObject,
          image: input.imageContentUrl,
          categoryId,
          properties: generateProperties(input)
        };
      }));

      // Update the category if needed
      if (response.length && !category.image) {
        updateCategory({...category, image: response[0].imageContentUrl});
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
