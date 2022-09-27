<template>
  <Story
    title="Overview"
    :layout="{
      type: 'single',
      iframe: false,
    }"
  >
    <Variant>
      <Overview :categories="categories"></Overview>
    </Variant>
  </Story>
</template>

<script setup>
  const categories = [{title: 'a', periodStart: 1920, periodEnd: 2020}];
</script>
