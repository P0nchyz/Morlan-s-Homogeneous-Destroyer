<script setup>
import Latex from './Latex.vue';

const props = defineProps({
  y1: String,
  y2: String
})
</script>

<template>
  <div class="flex justify-center items-center bg-onyx h-12 min-w-64 text-white px-4">
    <Latex :math="`y_c=C_1${y1}+C_2${y2}`"/>
  </div>
</template>