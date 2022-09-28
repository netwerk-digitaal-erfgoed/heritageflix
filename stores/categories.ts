import { defineStore } from 'pinia'

interface State {
  categories: Category[]
}

export const useCategoryStore = defineStore('categories', {
  state: (): State => ({
    categories: []
  }),
  actions: {
    upsertCategory (category: Category) {
      const idx = this.categories.findIndex((cat: Category) => {
        return cat.id === category.id;
      })

      if (idx === -1) {
        this.categories.push(category);
      }
      else {
        this.categories.splice(idx, 1, category);
      }
    },
    findCategoryBySlug (slug: string) {
      return this.categories.find((cat: Category) => cat?.slug === slug);
    }
  }
});
