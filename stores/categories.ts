import { defineStore } from 'pinia';

export const useCategoryStore = defineStore('categories', () => {
  const categories = ref([]);

  function updateCategory(category: Category): void {
    const idx = categories.value.findIndex((cat: Category) => cat.id === category.id);
    categories.value.splice(idx, 1, category);
  }

  function findCategoryById (id: string): Category | undefined {
    return categories.value.find((cat: Category) => cat.id === id);
  }

  async function listOrFetchCategories (): Promise<Category[]> {
    if (!categories.value.length) {
      await fetchCategories();
    }
    return categories.value.slice();
  }

  /**
   * Private functions
   */
  async function fetchCategories (): Promise<void> {
    console.warn('Categories.ts#fetchCategories');
    const { $ndeRepository } = useNuxtApp();
    const periods = await $ndeRepository.getArtPeriodsWithArt() || [];
    categories.value = periods.map((period: any) => {
      return {
        id: useSlugify(period?.name),
        originalId: period.artPeriod,
        title: useCapitalize(period.name),
        period: usePeriodName(period?.startDate, period?.endDate),
        numberOfArtworks: parseInt(period.numberOfHeritageObjects, 10)
      };
    });
  }

  return { categories, updateCategory, findCategoryById, listOrFetchCategories };
});
