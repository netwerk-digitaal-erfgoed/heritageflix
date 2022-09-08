<template>
  <div class="container mx-auto overflow-hidden">
    <ArrowRightIcon class="h-6 w-6 bg-slate-300 text-black rounded-full p-1 hover:bg-slate-400"/>
    <Overview :categories="categories" />
  </div>
</template>

<script setup lang="ts">
  import ArrowRightIcon from '@heroicons/vue/24/outline/ArrowRightIcon.js';

  // TODO: Replace this with real data, currently hard coded to json file and port of the server
  const { categories } = await fetch(`http://localhost:3051/categories.json`).then((r) => r.json());
</script>
