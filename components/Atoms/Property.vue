<template>
  <div class="property">
    <label class="font-bold text-sm">{{ $t(label) }}</label>
    <span v-if="isLink" class="text-sm hover:underline"><NuxtLink :to="value">{{ linkValue }}</NuxtLink></span>
    <span v-else class="text-sm">{{ value }}</span>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n({});
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
});

const linkValue = computed(() => {
  const key = `${props.label}LinkText`;
  const translation = t(key);
  return (key === translation) ? props.value : translation;
})
</script>

<style scoped lang="scss">
  .property {
    display: flex;
    flex-direction: column;
  }
</style>
