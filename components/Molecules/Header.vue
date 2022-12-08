<template>
  <div :class="{ 'base': true, 'dark-mode': darkMode }">
    <MoleculesButtonsHome />
    <span v-if="title" class="title">
      {{ title }}
    </span>
    <MoleculesButtonsCategory v-if="showCategory" />
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  darkMode?: boolean,
  title?: string,
  showCategory?: boolean
}>(), {
  darkMode: false,
  title: '',
  showCategory: false
});
</script>

<style scoped lang="scss">
.base {
  @apply grid grid-cols-12 py-7 items-center bg-white text-black w-full z-10;

  &.dark-mode {
    @apply bg-black text-white;
  }
}

.title {
  @apply col-span-10 col-start-2 flex justify-center;
  font-weight: 600;
  font-size: 2rem;
  line-height: 125%;
  text-transform: uppercase;
}
</style>
