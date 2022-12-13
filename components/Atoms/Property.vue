<template>
  <div class="property">
    <label class="font-bold text-sm">{{ $t(label) }}</label>
    <span v-if="isLink" class="text-sm text-underline"><NuxtLink :to="value">{{ value }}</NuxtLink></span>
    <span v-else class="text-sm">{{ value }}</span>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  label: string,
  value?: string
}>(), {
  value: ''
});

const isLink = computed(() => {
  try {
    return Boolean(new URL(props.value));
  }
  catch(e){
    return false;
  }
})
</script>

<style scoped lang="scss">
  .property {
    display: flex;
    flex-direction: column;
  }
</style>
