<template>
  <div v-if="intro" class="intro bg-black text-white">
    <img :src="banner" class="banner" v-if="banner" />
    <div class="grid grid-cols-12 gap-x-6 gap-y-6 justify-items-center items-center py-20 glass-noblur">
      <span class="title row-start-1 col-span-8 col-start-3 overflow-hidden whitespace-nowrap max-w-full" v-if="intro.title">
        {{ intro.title }}
      </span>
      <span class="description row-start-2 col-span-8 col-start-3" v-if="intro.description">
        {{ description }}
      </span>
      <span class="outro row-start-3 col-span-8 col-start-3" v-if="intro.footer">
        {{ intro.footer }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBrandingStore } from "@/stores/branding";
const { intro, banner } = useBrandingStore();
const description = computed(() => intro.description.substring(0, 300));
</script>

<style lang="scss" scoped>
.intro {
  position: relative;
  max-height: 32rem;
  overflow: hidden;
}

.banner {
  width: 100%;
  position: absolute;
  filter: grayscale(100%);
}

// Typography
.title {
  font-weight: 600;
  font-size: 2.75rem;
  line-height: 125%;
  text-transform: uppercase;
}

.description {
  font-weight: 400;
  font-size: 1.5rem;
  line-height: 125%;
  text-transform: uppercase;
}

.outro {
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 125%;
  text-transform: uppercase;
}

</style>
