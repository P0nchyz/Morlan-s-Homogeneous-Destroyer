<script setup>
import { usePreferences } from '@/utils/usePreferences';
import Latex from './Latex.vue';

const dV = usePreferences().dependentVariable;

const props = defineProps({
  y1: String,
  y2: String
})
</script>

<template>
  <div class="flex justify-center items-center bg-onyx h-12 min-w-64 text-white px-4">
    <Latex :math="dV + `_c=C_1${y1}+C_2${y2}`"/>
  </div>
</template>