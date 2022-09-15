<template>
  <main>
    <AtomsNavigation name="arrowRight" :to="gotoArtwork" direction="up" class="flex flex-nowrap justify-center items-center">Goto Artwork</AtomsNavigation>
    <p class="max-w-xl p-4">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec felis ligula, ultricies nec euismod a, porttitor non eros. Nullam dapibus tristique enim. Mauris efficitur aliquam blandit. Praesent faucibus hendrerit massa, eu mattis tellus suscipit eget. Morbi semper eget lacus nec convallis. Quisque convallis tortor neque, sed egestas arcu mollis et. Aliquam faucibus luctus elit, eu tincidunt purus dapibus vitae. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
    </p>
    <p class="max-w-xl p-4">
      Quisque porttitor ornare erat. Vestibulum faucibus lorem vel ligula finibus vestibulum. Cras laoreet turpis et urna efficitur faucibus. Etiam risus arcu, imperdiet in est eu, porttitor auctor massa. In mattis id libero sed molestie. Quisque quis quam non ante auctor pellentesque vel vel ligula. Nulla mi felis, aliquam eu mattis a, mattis eget neque. Integer mollis sit amet neque vel vehicula. Donec eleifend arcu lectus, ut fermentum ligula eleifend eu.
    </p>
    <p class="max-w-xl p-4">
      Vestibulum pulvinar massa non lacus tempor condimentum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam sed elit at magna vehicula suscipit. Cras a nisl libero. Proin a pellentesque erat. Quisque tempor dolor a orci faucibus, gravida finibus eros lacinia. Nunc iaculis consequat hendrerit. Praesent eget vehicula tellus. Mauris accumsan risus id purus placerat aliquam et et quam. Mauris nisi urna, dapibus vel eros ac, accumsan sollicitudin ipsum. Nam maximus est sed nibh dapibus, in pretium lacus egestas. Morbi egestas porta porttitor. Cras interdum rutrum tempus. In imperdiet ornare nibh eu vulputate. Duis pellentesque cursus gravida.
    </p>
    <p class="max-w-xl p-4">
      Praesent mollis placerat arcu, non congue magna dapibus a. Phasellus ac ligula quam. Nulla facilisi. Quisque sagittis sapien at ipsum lacinia interdum. Integer sit amet faucibus orci. Morbi vulputate consectetur interdum. Vivamus id elementum leo, non iaculis justo. Nulla magna sem, rutrum id sollicitudin a, congue eget libero. Vivamus vehicula, felis vitae sagittis laoreet, mauris massa viverra justo, quis congue lectus ex ornare diam. In sit amet vestibulum nibh. Cras lectus purus, dictum et nulla ut, malesuada convallis eros. Etiam eget elit velit. Sed quis arcu nisi. Integer vitae lectus eu sem maximus pellentesque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed vitae tempor nisi, eu consectetur ipsum.
    </p>
    <p class="max-w-xl p-4">
      Quisque vitae arcu vel elit pulvinar dictum. Pellentesque ut aliquam massa. Aenean dictum elit pharetra, sodales ante in, vulputate dolor. Vestibulum placerat sed enim vitae egestas. In hac habitasse platea dictumst. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Quisque sit amet tincidunt nibh. Nulla semper nisl mi, scelerisque placerat orci aliquam id. Nunc vehicula et arcu ac euismod. In nisl justo, imperdiet ut diam eu, egestas dictum tellus. Aliquam odio nulla, mollis a porttitor at, egestas eu nibh.
    </p>
  </main>
</template>


<script setup lang="ts">
  import { useTransitionStore } from '@/stores/transition';
  const { transition } = useTransitionStore();

  definePageMeta({
    pageTransition: {
      name: "page",
      mode: "in-out",
      duration: 1000
    }
  })
  const gotoArtwork = {name: 'category-art', params: {category: 'middeleeuwen', art: 1}};
</script>
