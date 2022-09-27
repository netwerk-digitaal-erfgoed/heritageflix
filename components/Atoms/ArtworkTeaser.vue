<template>
  <AtomsNavigation :to="path">
    <div class="teaser">
      <div class="background" :style="cssStyle" />
      <div class="description">
        <div class="flex justify-center items-center flex-col text-white glass">
          <!-- @TODO: Discuss with Alexander, text is too big sometimes -->
          <span class="text-center title">
            {{ item.title }}
          </span>
          <span class="text-center subtitle">
            {{ item.artist }}, {{ item.period }}
          </span>
        </div>


      </div>
    </div>
  </AtomsNavigation>
</template>

<script setup lang="ts">
import { PropType } from 'vue';

const route = useRoute();
const props = defineProps({
  item: {
    type: Object as PropType<Artwork>,
    required: true
  }
});

const path = {
  name: 'category-art',
  params: {
    category: route.params.category,
    art: props.item.id
  }
};

const cssStyle = computed(() => {
  return {
    backgroundImage: `url(${props.item.image}})`
  }
})

</script>

<style lang="scss" scoped>
  .teaser {
    width: 20rem;
    height: 20rem;
    margin: 0.3125rem;
    position: relative;
    display: inline-block;
    overflow: hidden;

    &:hover {
      .background {
        transform: scale(1.1);
      }
    }
  }

  .background {
    height: 100%;
    width: 100%;
    background-repeat: no-repeat;
	  background-size: cover;
    transition: all .5s;
  }

  .description {
    width: 100%;
    position: absolute;
    bottom: 2rem;
  }

  // @TODO: Fix the typography
  .title {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 1.5rem;
  }

  .subtitle {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 300;
    font-size: 1rem;
  }


</style>
