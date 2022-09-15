import { defineStore } from 'pinia'

export const useTransitionStore = defineStore('transition', () => {
  const transition = ref('');
  function changeTransition (direction: string) {
    this.transition = direction;
  }

  return { transition, changeTransition }
});
