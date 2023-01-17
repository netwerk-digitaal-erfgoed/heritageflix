<template>
  <span v-if="isLink" class="text-sm hover:underline"><NuxtLink :to="value">{{ label }}</NuxtLink></span>
  <span v-else class="text-sm">{{ value }}</span>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  label?: string,
  value?: string
}>(), {
  value: ''
});

const isLink = computed(() => {
  return useCheckLink(props.value);
});
</script>

<style scoped lang="scss">
  .property {
    display: flex;
    flex-direction: column;
  }
</style>
