
<template>
  <NuxtLink :to="to" @click.native.prevent="animateNavigation">
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
  const { $navigate } = useNuxtApp()
  const props = defineProps({
    direction: {
      type: String,
      default: ''
    },
    to: Object
  });

  const animateNavigation = function () {
    return $navigate(props.to, props.direction);
  }
</script>
