<template>
  <div class="header">
    <img :src="logoUrl" class="flex"/>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  logoUrl?: string
}>()
</script>

<style lang="scss" scoped>
  .header {
    background-color: black;
    padding: 2rem 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: $header-height;
  }
</style>
