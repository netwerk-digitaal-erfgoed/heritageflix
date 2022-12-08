<template>
  <div v-if="intro" class="bg-black text-white grid grid-cols-12 gap-x-6 gap-y-6 justify-items-center items-center w-full">
    <div class="col-start-0 col-span-2">
      <AtomsIcon name="ndeLogo" />
    </div>
    <span class="col-start-6 col-span-2">HeritageFlix</span>
    <span class="col-start-11 col-span-2">[SOCIALIZE ICONS]</span>
  </div>
</template>

<script setup lang="ts">
import { useBrandingStore } from "@/stores/branding";
const { intro } = useBrandingStore();
</script>
