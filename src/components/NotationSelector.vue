<script setup>
import { usePreferences } from '@/utils/usePreferences';
import { ref } from 'vue';
import Latex from '@/components/Latex.vue';

const {notation, updatePreference} = usePreferences();

const selected = ref(false);
</script>

<template>
  <div v-if="!selected" @click="selected = true" class="w-12 bg-onyx text-white p-3 rounded-full aspect-square">
    <Latex math="y'" v-if="notation === 'lagrange'"/>
    <Latex math="\frac{dy}{dx}" v-else-if="notation === 'leibniz'" />
    <Latex math="\dot y" v-else-if="notation === 'newton'"/>
  </div>
  <div v-else class="flex flex-col items-center gap-4">
    <span @click="updatePreference('notation', 'lagrange'); selected = false">
      <Latex math="y'"/>
    </span>
    <span @click="updatePreference('notation', 'leibniz'); selected = false">
      <Latex math="\frac{dy}{dx}"/>
    </span>
    <span @click="updatePreference('notation', 'newton'); selected = false">
      <Latex math="\dot y"/>
    </span>
    <div @click="selected = false" class="w-12 bg-onyx text-white rounded-full aspect-square"></div>
  </div>
</template>