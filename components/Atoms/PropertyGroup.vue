<template>
  <div class="property">
    <label class="font-bold text-sm">{{ t(label) }}</label>
    <AtomsProperty v-for="property in properties" :key="property" :label="property.label" :value="property.value" :allow-link="allowLink" />
  </div>
</template>

<script setup lang="ts">
import { useQueriesStore } from "@/stores/queries";

const { t } = useI18n({});
const props = defineProps<{
  label: string,
  groupName: string
  prop?: ArtProperties
}>();

const allowLink = computed(() => {
  const store = useQueriesStore() as any;
  const fnName = `getLink${useCapitalize(props.groupName)}`;

  if ((typeof store[fnName]) === "function") {
    return store[fnName]();
  }
  return true;
})

const properties = computed(() => {
  if (!Array.isArray(props.prop)) {
    return [props.prop];
  }
  return props.prop;
});
</script>

<style scoped lang="scss">
  .property {
    display: flex;
    flex-direction: column;
  }
</style>
