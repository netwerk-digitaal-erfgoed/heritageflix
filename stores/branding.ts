import { defineStore } from 'pinia';

export const useBrandingStore = defineStore('branding', () => {
  const intro = ref();
  const logo = ref();

  async function loadBranding (): Promise<void> {
    console.warn('Branding.ts#load');
    const devPrefix = process.dev ? '/assets' : '';
    const jsonLocation = `${devPrefix}/config/branding.json`;
    const branding:Branding = await $fetch(jsonLocation);
    intro.value = branding.intro;
    logo.value = `${devPrefix}${branding.logo}`;
  }

  return { intro, logo, loadBranding };
});
