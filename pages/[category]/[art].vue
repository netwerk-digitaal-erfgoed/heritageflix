<template>
  <main class="absolute z-10 bg-white w-full overflow-hidden border-blue" :class="transition">
    <div class="header w-full flex justify-between p-4">
      <AtomsNavigation name="logo" :to=homePath direction="down" />
      [CATEGORY]
      <AtomsNavigation name="close" :to="categoryPath" direction="down"/>
    </div>
    <div class="grid grid-cols-12">
      <div class="col-span-1 flex justify-center items-center">
        <AtomsNavigation name="arrowLeft" :to="prevArtwork" direction="right" v-if="currentArt > 1"/>
      </div>
      <div class="col-span-10 flex flex-col justify-center items-center">
        <div class="placeholder w-full bg-blue flex justify-center items-center">
          [image]
        </div>
        <div class="description pt-4">
          <h2>Seine Fishing in Kazusa Province</h2>
          <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
          <div class="properties">
            <div>
              <label>Maker</label>
              <span>Jean-Honoré Fragonard</span>
            </div>
            <div>
              <label>Jaar</label>
              <span>1877 - 1900</span>
            </div>
            <div>[MUSEUM]</div>
            <div>[DIGITAL OBJECT]</div>
          </div>
        </div>
      </div>
      <div class="col-span-1 flex justify-center items-center">
        <AtomsNavigation name="arrowRight" :to="nextArtwork" direction="left" v-if="currentArt < 4" />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
  import { useTransitionStore } from '@/stores/transition';
  import {storeToRefs} from 'pinia';

  const store = useTransitionStore();
  const { transition } = storeToRefs(store);
  const activeRoute = useActiveRoute();
  const currentArt = parseInt(activeRoute.params.art as string);

  definePageMeta({
    pageTransition: {
      name: "slide",
      mode: "in-out",
      duration: 1000
    }
  });

  const homePath = {name: 'index'};
  const categoryPath = {name: 'category', params: { category: activeRoute.params.category }};
  const prevArtwork = {name: activeRoute.name, params: { ...activeRoute.params, art: currentArt - 1 }};
  const nextArtwork = {name: activeRoute.name, params: { ...activeRoute.params, art: currentArt + 1 }};
</script>

<style scoped lang="scss">
.header {
  margin-top: 2rem;
  height: 3rem;
}

.placeholder {
  height: 54rem;
}

</style>
