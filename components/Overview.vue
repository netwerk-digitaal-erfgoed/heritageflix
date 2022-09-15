<template>
  <div :class="`grid grid-cols-${cols} gap-x-3 gap-y-8`">
    <!-- <NuxtLink
      v-for="(item, index) in items"
      :to="
        teaserType === 'category'
          ? `categories/${item.slug}`
          : `categories/${$route.params.category}/${item.slug}`
      "
    > -->
    <NuxtLink
      v-for="(item, index) in items"
      :to="
        teaserType === 'category'
          ? { name: 'categories-category', params: { category: item.slug } }
          : item.slug
      "
    >
      <Teaser
        :img-src="item.image"
        :key="index"
        :subtitle="item.period"
        :title="item.title"
        :type="teaserType"
      />
    </NuxtLink>
  </div>
</template>

<script setup>
const props = defineProps({
  cols: {
    type: Number,
    default: 3,
  },
  items: Array,
  teaserType: {
    type: String,
    validator(value) {
      return ["category", "artwork"].includes(value);
    },
  },
});
</script>
