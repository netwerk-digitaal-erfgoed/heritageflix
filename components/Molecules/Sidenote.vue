<template>
  <div class="bg-black text-white flex justify-center items-center fixed left-0 bottom-20 rounded-b-3xl origin-top-left h-8 w-40 cursor-pointer select-none z-10 rotate-270" @click="openAbout">
    HeritageFlix
  </div>
  <div v-if="isOpen" class="backdrop absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center z-10 bg-black/40" @click.self="closeAbout" :style="backdropStyles">
    <div class="bg-black text-white p-8 max-h-96 max-w-5xl flex flex-col justify-center relative items-center">
      <button @click="closeAbout" class="w-4 h-4 text-white absolute right-0 top-0 m-8">
        <AtomsIcon name="close" />
      </button>
      <ContentDoc path="/about" />
      <AtomsIcon name="ndeLogo" />
    </div>
  </div>
</template>

<script setup lang="ts">
const isOpen = ref(false);
const scrollTop = ref();

const openAbout = () => {
  isOpen.value = true;
  scrollTop.value = window.scrollY;
  document.body.style.overflow = 'hidden';
  document.body.style.paddingRight = '1rem';
};
const closeAbout = () => {
  isOpen.value = false;
  scrollTop.value = null;
  document.body.style.overflow = '';
  document.body.style.paddingRight = '';
}

const backdropStyles = computed(() => {
  return {
    'top': `${scrollTop.value}px`
  };
});
</script>

<style lang="scss" scoped>
:deep(h1) {
  @apply text-2xl text-white mb-5;
}
:deep(h2) {
  @apply font-semibold;
}

:deep(p),
:deep(ul) {
  @apply font-light mb-4;
}

</style>
