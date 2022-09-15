import { useTransitionStore } from '@/stores/transition';

export default defineNuxtPlugin(() => {
  return {
    provide: {
      navigate: (direction: string, to: Object) => {
        const { changeTransition } = useTransitionStore();
        changeTransition(direction);
        return navigateTo(to);
      }
    }
  }
})
