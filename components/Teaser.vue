<template>
  <div :class="['teaser', `teaser-${type}`]">
    <div v-if="imgSrc" class="teaser-img-wrapper">
      <img class="teaser-img" :src="imgSrc" />
    </div>

    <div class="teaser-body">
      <div v-if="title" class="teaser-title">
        {{ title }}
      </div>

      <div v-if="subtitle" class="teaser-subtitle">
        {{ subtitle }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: String,
  subtitle: String,
  imgSrc: String,
  type: String,
});
</script>

<style lang="scss" scoped>
.teaser {
  position: relative;
  width: 100%;
  word-wrap: break-word;
  overflow: hidden;
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
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  padding: 0.5rem 1.25rem;
  color: #ffffff;
}

.teaser-category {
  height: 100vh;

  &:hover {
    .teaser-img {
      filter: blur(0);
    }
  }

  .teaser-img-wrapper {
    &:after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.02);
    }
  }

  .teaser-img {
    filter: blur(0.625rem);
  }

  .teaser-body {
    bottom: 10%;
    text-align: center;
  }

  .teaser-title {
    font-size: 2.5rem;
    line-height: 1.5;
    margin-bottom: 1.25rem;
  }

  .teaser-subtitle {
    font-size: 2.5rem;
    line-height: 1.5;
  }
}

.teaser-artwork {
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

  .teaser-body {
    bottom: 1.5rem;
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
}
</style>
