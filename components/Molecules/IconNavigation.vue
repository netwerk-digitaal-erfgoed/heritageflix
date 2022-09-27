<template>
  <AtomsNavigation :to="to" :direction="direction">
    <AtomsIcon :name="name" class="h-10 w-10 bg-blue text-black rounded-full" />
  </AtomsNavigation>
</template>

<script setup lang="ts">
  const props = defineProps({
    name: String,
    direction: {
      type: String,
      default: ''
    },
    to: Object
  });
</script>
