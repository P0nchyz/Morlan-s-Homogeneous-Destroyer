<script setup>
import { usePreferences } from '@/utils/usePreferences';
import InputCoefficient from './InputCoefficient.vue';
import Latex from './Latex.vue';
import { getNotation } from '@/utils/derivative';

const {notation} = usePreferences();

const coefficients = defineModel();
</script>

<template>
  <div class="flex items-center">
    <InputCoefficient v-model="coefficients[0]"/>
    <Latex :math="getNotation(notation, 2) + '+'" />
    <InputCoefficient v-model="coefficients[1]"/>
    <Latex :math="getNotation(notation, 1) + '+'"/>
    <InputCoefficient v-model="coefficients[2]"/>
    <Latex :math="getNotation(notation, 0) + '=0'" />
  </div>
</template>