import { defineStore } from 'pinia';

export const useBrandingStore = defineStore('branding', () => {
  const name = ref();
  const intro = ref();
  const logo = ref();
  const banner = ref();

  async function loadBranding (): Promise<void> {
    console.warn('Branding.ts#load');
    const devPrefix = process.dev ? '/assets' : '';
    const jsonLocation = `${devPrefix}/config/branding.json`;
    const branding:Branding = await $fetch(jsonLocation);

    // Add the name
    name.value = branding.name || '';

    // Add the intro
    intro.value = branding.intro || '';

    // Check if there is a banner
    if (branding.banner) {
      banner.value = `${devPrefix}${branding.banner}`;
    }

    // Check if there is a logo
    if (branding.logo) {
      logo.value = `${devPrefix}${branding.logo}`;
    }
  }

  return { intro, logo, name, banner, loadBranding };
});
