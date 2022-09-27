<template>
  <div class="grid grid-cols-12 gap-x-2 w-full">
    <MoleculesIconNavigation
      v-if="showHome"
      class="col-span-1 col-start-1 flex justify-end"
      name="logo"
      :to=homePath
      :direction="transition"
    />
    <slot class="col-span-8 col-start-2 flex justify-center" />
    <MoleculesIconNavigation
      v-if="showCategory"
      class="col-span-1 col-start-10"
      name="close"
      :to="categoryPath"
      :direction="transition"
    />
  </div>
</template>

<script setup lang="ts">
  const activeRoute = useActiveRoute();

  const props = defineProps({
    showHome: {
      type: Boolean,
      default: true
    },
    showCategory: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    transition: {
      type: String,
      default: ''
    }
  });

  const homePath = {name: 'index'};
  const categoryPath = {name: 'category', params: { category: activeRoute.params.category }};
</script>
