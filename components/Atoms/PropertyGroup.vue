<template>
  <div class="property">
    <label class="font-bold text-sm">{{ $t(label) }}</label>
    <AtomsProperty v-for="property in properties" :key="property" :label="property.label" :value="property.value" />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n({});
const props = defineProps<{
  label: string,
  prop?: ArtProperties
}>();

const hasMultiple = computed(() => {
  return Array.isArray(props.prop);
})

const properties = computed(() => {
  if (!Array.isArray(props.prop)) {
    return [props.prop];
  }
  return props.prop;
});


const isLink = computed(() => {
  return useCheckLink(props.prop.value);
});

const linkValue = computed(() => {
  const key = `${props.label}LinkText`;
  const translation = t(key);
  return (key === translation) ? props.prop : translation;
})
</script>

<style scoped lang="scss">
  .property {
    display: flex;
    flex-direction: column;
  }
</style>
