<script setup>
import { usePreferences } from '@/utils/usePreferences';
import { ref } from 'vue';
import Latex from '@/components/Latex.vue';

const {notation, updatePreference, getNotation} = usePreferences();

const selected = ref(false);
</script>

<template>
  <div v-if="!selected" @click="selected = true" class="w-12 bg-onyx hover:bg-black hover:cursor-pointer text-white p-3 rounded-full aspect-square">
    <Latex :math="getNotation(notation, 1)"/>
  </div>
  <div v-else class="flex flex-col items-center gap-4 text-gray-600">
    <span @click="updatePreference('notation', 'lagrange'); selected = false" class="hover:cursor-pointer hover:text-black">
      <Latex :math="getNotation('lagrange', 1)"/>
    </span>
    <span @click="updatePreference('notation', 'leibniz'); selected = false" class="hover:cursor-pointer hover:text-black">
      <Latex :math="getNotation('leibniz', 1)"/>
    </span>
    <span @click="updatePreference('notation', 'newton'); selected = false" class="hover:cursor-pointer hover:text-black">
      <Latex :math="getNotation('newton', 1)"/>
    </span>
    <div @click="selected = false" class="w-12 bg-onyx hover:bg-black hover:cursor-pointer text-white rounded-full aspect-square"></div>
  </div>
</template>