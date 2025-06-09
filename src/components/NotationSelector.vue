<script setup>
import { usePreferences } from '@/utils/usePreferences';
import { ref } from 'vue';
import Latex from '@/components/Latex.vue';

const {notation, updatePreference, getNotation} = usePreferences();

const selected = ref(false);
</script>

<template>
  <button v-if="!selected" @click="selected = true" class="w-12 bg-onyx hover:brightness-140 active:bg-black hover:cursor-pointer text-white p-3 rounded-full aspect-square">
    <Latex :math="getNotation(notation, 1)"/>
  </button>
  <div v-else class="flex flex-col items-center gap-4 text-gray-600">
    <button @click="updatePreference('notation', 'lagrange'); selected = false" class="hover:cursor-pointer hover:text-black">
      <Latex :math="getNotation('lagrange', 1)"/>
    </button>
    <button @click="updatePreference('notation', 'leibniz'); selected = false" class="hover:cursor-pointer hover:text-black">
      <Latex :math="getNotation('leibniz', 1)"/>
    </button>
    <button @click="updatePreference('notation', 'newton'); selected = false" class="hover:cursor-pointer hover:text-black">
      <Latex :math="getNotation('newton', 1)"/>
    </button>
    <div @click="selected = false" class="w-12 bg-onyx hover:brightness-140 active:bg-black hover:cursor-pointer text-white rounded-full aspect-square"></div>
  </div>
</template>

<style scoped>
button {
  user-select: none;
}
</style>