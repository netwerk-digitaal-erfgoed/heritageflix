<template>
  <div v-if="intro" class="bg-black text-white grid grid-cols-12 gap-x-6 grid-rows-3 gap-y-6 justify-items-center items-center py-8">
    <span class="title row-start-1 col-span-8 col-start-3">
      {{ intro.title }}
    </span>
    <span class="description row-start-2 col-span-8 col-start-3">
      {{ intro.description }}
    </span>
    <span class="outro row-start-3 col-span-8 col-start-3">
      {{ intro.footer }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { useBrandingStore } from "~~/stores/branding";
const { intro } = useBrandingStore();
</script>

<style lang="scss" scoped>
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
