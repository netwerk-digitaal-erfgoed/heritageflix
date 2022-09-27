<template>
  <div class="grid gap-4" :class="`grid-cols-${cols}`">

  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  cols: {
    type: Number,
    default: 4,
  },
  items: {
    type: Array<Artwork>,
    default: []
  }
});
</script>
