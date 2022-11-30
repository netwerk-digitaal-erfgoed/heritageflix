<template>
  <div class="header">
    <img :src="logo" class="flex"/>
  </div>
</template>

<script setup lang="ts">
import { useBrandingStore } from "~~/stores/branding";
const { logo } = useBrandingStore();
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
