import { defineStore } from 'pinia'

interface State {
  artworks: Artwork[]
}

export const useArtworkStore = defineStore('artworks', {
  state: (): State => ({
    artworks: []
  }),
  actions: {
    upsertArtwork (artwork: Artwork, categoryId?: number) {
      // If we passed a categoryId, add it to the artwork
      if (categoryId >= 0) {
        artwork.categoryId = categoryId;
      }

      // See if the artwork already is in the collection
      const idx = this.artworks.findIndex((art: Artwork) => {
        return art.categoryId === categoryId && art.id === artwork.id
      });

      // If the artwork isn't in there add it, else update it.
      if (idx === -1) {
        this.artworks.push(artwork);
      }
      else {
        this.artworks.splice(idx, 1, artwork);
      }
    },
    findArtworkById (id: number, categoryId: number) {
      return this.artworks.find((art: Artwork) => {
        return art.categoryId === categoryId && art.id === id;
      });
    }
  }
});
