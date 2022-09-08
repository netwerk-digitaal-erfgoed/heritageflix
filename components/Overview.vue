<template>
  <div class="border mx-auto w-2/3 flex flex-wrap h-2/3">
      <article v-for="(category, index) in categories" :key="index" class="p-3 w-1/4 h-1/4 bg-slate-300 hover:bg-slate-400 m-2 rounded flex justify-center items-center hover:shadow-2xl">
        {{ category.title }}
        {{ category.periodStart }} - {{ category.periodEnd }}
      </article>
    </div>
</template>

<script setup>
  const props = defineProps({
    categories: Array
  })
</script>
