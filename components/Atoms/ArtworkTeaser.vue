<template>
  <!-- Temporary disabled navigating up -->
  <!-- <AtomsNavigation :to="to" direction="up"> -->
  <AtomsNavigation :to="to">
    <div class="teaser">
      <div v-if="artwork.image" class="teaser-img-wrapper">
        <img class="teaser-img" :src="artwork.image" />
      </div>

      <div class="teaser-body">
        <div v-if="artwork.title" class="teaser-title">
          {{ artwork.title }}
        </div>

        <div v-if="artwork.artist || artwork.period" class="teaser-subtitle">
          <template v-if="artwork.artist">
            {{ artwork.artist }}
          </template>

          <template v-if="artwork.artist && artwork.period">,</template>

          <template v-if="artwork.period">
            {{ artwork.period }}
          </template>
        </div>
      </div>
    </div>
  </AtomsNavigation>
</template>

<script setup lang="ts">
import { PropType } from "vue";

const props = defineProps({
  artwork: {
    type: Object as PropType<Artwork>,
    required: true
  },
  to: {
    type: Object,
    required: true
  },
});
</script>

<style lang="scss" scoped>
.teaser {
  position: relative;
  width: 100%;
  word-wrap: break-word;
  overflow: hidden;

  &:hover {
    .teaser-img {
      transform: scale(1.1);
    }
  }

  &:before {
    content: "";
    display: block;
    padding-top: 100%;
  }
}

.teaser-img-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.teaser-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: 0.15s ease-in-out;
}

.teaser-body {
  position: absolute;
  left: 0;
  bottom: 1.5rem;
  width: 100%;
  padding: 0.5rem 1.25rem;
  background-color: rgba(0, 0, 0, 0.3);
  color: #ffffff;
  backdrop-filter: blur(0.25rem);
}

.teaser-title {
  font-size: 1.5rem;
  line-height: 1.25;
  font-weight: 600;
}

.teaser-subtitle {
  font-size: 1rem;
  line-height: 1.43;
  font-weight: 300;
}
</style>
