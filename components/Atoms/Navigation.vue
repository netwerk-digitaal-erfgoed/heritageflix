
<template>
  <NuxtLink :to="to" @click.native.prevent="animateNavigation">
    <AtomsIcon :name="name" class="h-10 w-10 bg-blue text-black rounded-full" />
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
  const { $navigate } = useNuxtApp()
  const props = defineProps({
    name: String,
    direction: {
      type: String,
      default: ''
    },
    to: Object
  });

  const animateNavigation = function () {
    if (props.direction.length) {
      return $navigate(props.direction, props.to);
    }
    return navigateTo(props.to);
  }
</script>
