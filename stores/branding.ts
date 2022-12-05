import { defineStore } from 'pinia';

export const useBrandingStore = defineStore('branding', () => {
  const name = ref();
  const intro = ref();
  const logo = ref();

  async function loadBranding (): Promise<void> {
    console.warn('Branding.ts#load');
    const devPrefix = process.dev ? '/assets' : '';
    const jsonLocation = `${devPrefix}/config/branding.json`;
    const branding:Branding = await $fetch(jsonLocation);
    name.value = branding.name;
    intro.value = branding.intro;
    if (branding.logo) {
      logo.value = `${devPrefix}${branding.logo}`;
    }
  }

  return { intro, logo, name, loadBranding };
});
