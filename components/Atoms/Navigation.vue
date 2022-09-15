
<template>
  <NuxtLink :to="to" @click.native.prevent="$navigate(props.direction, props.to)">
    <AtomsIcon :name="name" class="h-10 w-10 bg-blue text-black rounded-full" />
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
  const props = defineProps({
    name: String,
    direction: String,
    to: Object
  });
</script>
