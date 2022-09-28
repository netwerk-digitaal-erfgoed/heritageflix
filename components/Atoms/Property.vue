<template>
  <div class="property">
    <label class="font-bold text-sm">{{ label }}</label>
    <span v-if="href" class="text-sm text-underline"><NuxtLink :to="href">{{ value }}</NuxtLink></span>
    <span v-else class="text-sm">{{ value }}</span>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    label: String,
    value: String,
    href: {
      type: String,
      default: ''
    }
  });
</script>

<style scoped lang="scss">
  .property {
    display: flex;
    flex-direction: column;
  }
</style>
