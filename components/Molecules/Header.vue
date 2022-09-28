<template>
  <div class="grid grid-cols-12 my-7">
    <MoleculesIconNavigation
      v-if="showHome"
      class="col-span-1 col-start-1 flex justify-center"
      name="logo"
      :to=homePath
    />
    <div class="col-span-10 col-start-2 flex justify-center">
      <slot  />
    </div>
    <MoleculesIconNavigation
      v-if="showCategory"
      class="col-span-1 flex justify-center"
      name="close"
      :to="categoryPath"
      direction="down"
    />
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const props = defineProps({
  showHome: {
    type: Boolean,
    default: true
  },
  showCategory: {
    type: Boolean,
    default: false
  }
});

const homePath = { name: 'index' };
const categoryPath = { name: 'category', params: { category: route.params.category } };
</script>
