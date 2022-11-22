<template>
  <div ref="root" class="observer">
    <slot />
  </div>
</template>

<script setup lang="ts">
const root = ref();
const observer = ref();
const emit = defineEmits(['intersect']);
const props = defineProps({
  threshold: {
    type: String,
    required: false,
    default: '1.0'
  },
  marginRoot: {
    type: String,
    required: false,
    default: '0px'
  }
});

onMounted(() => {
  observer.value = new IntersectionObserver(([entry]) => {
    if (entry && entry.isIntersecting) {
      emit('intersect');
    }
  }, {
    threshold: parseFloat(props.threshold),
    rootMargin: props.marginRoot
  });

  observer.value.observe(root.value);
})

onUnmounted(() => {
  observer.value.disconnect();
});
</script>
