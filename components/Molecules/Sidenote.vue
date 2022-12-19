<template>
  <div class="bg-black text-white flex justify-center items-center fixed left-0 bottom-20 rounded-b-3xl origin-top-left h-8 w-40 cursor-pointer select-none z-10 rotate-270" @click="openAbout">
    HeritageFlix
  </div>
  <div v-if="isOpen" class="backdrop absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center z-10 bg-black/40" @click.self="closeAbout" :style="backdropStyles">
    <div class="bg-black text-white p-8 max-w-md">
      <div class="header flex justify-center relative items-center mb-5">
        <span class="text-2xl text-white ">HeritageFlix</span>
        <button @click="closeAbout" class="w-4 h-4 text-white absolute right-0">
          <AtomsIcon name="close" />
        </button>
      </div>
      <div class="content flex flex-col justify-center mb-5">
        <span class="font-semibold mb-5">[Nog nooit heb je zoveel schilderijen van Johannes Vermeer bij elkaar kunnen zien.]</span>
        <span class="font-light">
          [We brengen de meeste van Vermeers schilderijen van over de hele wereld voor jou samen. Grijp je kans om de schilder goed te leren kennen en dichterbij Vermeer te komen.Grijp je kans om de schilder goed te leren kennen en dichterbij Vermeer te komen].
        </span>
      </div>
      <div class="footer flex flex-nowrap justify-between">
        <div>[Contact info]</div>
        <AtomsIcon name="ndeLogo" />
      </div>
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
