<template>
  <div :class="`teaser teaser-${type}`">
    <img class="teaser-img" :src="imgSrc" />

    <div class="teaser-body">
      <h3 class="teaser-title">
        {{ title }}
      </h3>

      <div class="teaser-subtitle">
        {{ subtitle }}
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  subtitle: String,
  imgSrc: String,
  type: {
    type: String,
    validator(value) {
      return ["category", "artwork"].includes(value);
    },
  },
});
</script>

<style lang="scss" scoped>
.teaser {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  word-wrap: break-word;
  background-color: #ffffff;
  box-shadow: 0px 16px 20px rgba(0, 0, 0, 0.25);

  &:before {
    display: block;
    content: "";
  }
}

.teaser-category {
  justify-content: center;

  &:before {
    padding-top: 100%;
  }

  .teaser-body {
    padding: 20px 30px;
    text-align: center;
    font-weight: 600;
    font-size: 24px;
    line-height: 125%;
  }
}

.teaser-artwork {
  justify-content: flex-end;

  &:before {
    padding-top: 124%;
  }

  .teaser-body {
    min-height: 50%;
    padding: 10px 12px;
  }

  .teaser-title {
    font-weight: 600;
    font-size: 16px;
    line-height: 175%;
  }

  .teaser-subtitle {
    font-size: 14px;
    line-height: 175%;
  }
}

.teaser-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.teaser-body {
  position: absolute;
  width: 100%;
  background: rgba(46, 46, 46, 0.4);
  color: #ffffff;
  font-family: "Poppins";
}
</style>
