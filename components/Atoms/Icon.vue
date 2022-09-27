<template>
  <i class="flex justify-center items-center">
    <component :is="icon" />
  </i>
</template>

<script setup lang="ts">
  const props = defineProps({
    name: String
  });

  const icon = computed(() => defineAsyncComponent(() => import(`../../assets/icons/${props.name}.svg?component`))).value
</script>
