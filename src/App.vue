<script setup>
import { usePreferences } from './utils/usePreferences';

import Header from '@/components/Header.vue'
import SolutionDisplay from '@/components/SolutionDisplay.vue';
import EquationPreview from '@/components/EquationPreview.vue';

import { coefficientString, getCharacteristicEquation, getLinearSolutions, getRoots, trimRoots } from '@/utils/solver';
import { ref } from 'vue';
import NotationSelector from '@/components/NotationSelector.vue';
import Latex from './components/Latex.vue';
import SettingsOverlay from './components/SettingsOverlay.vue';

const { showSettings } = usePreferences();

const coefficients = ref(['', '', '']);

const characteristicEquation = ref('');
const linearSolutions = ref([]);
const roots = ref({});
const showRoots = ref([]);
function handleCalculate() {
  characteristicEquation.value = getCharacteristicEquation(coefficients.value);
  roots.value = getRoots(coefficients.value);
  const trimmedRoots = trimRoots(roots.value);
  if (!roots.value.isComplex) {
    showRoots.value = trimmedRoots;
    if (trimmedRoots.length == 1) {
      showRoots.value[1] = trimmedRoots[0];
    }
  } else {
    showRoots.value = [`${trimmedRoots.real} + ${coefficientString(trimmedRoots.imaginary)}i`, `${trimmedRoots.real} - ${coefficientString(trimmedRoots.imaginary)}i`]
  }

  linearSolutions.value = getLinearSolutions(coefficients.value);
}

function handleReset() {
  coefficients.value = ['', '', ''];
  linearSolutions.value = [];
  roots.value = {};
  showRoots.value = [];
}

</script>

<template>
  <SettingsOverlay v-model="showSettings" />
  <Header />
  <main class="flex flex-col items-center gap-8 m-8">
    <div id="calculator" class="flex flex-col items-center gap-4">
      <SolutionDisplay v-if="linearSolutions[0] !== undefined" :y1="linearSolutions[0]" :y2="linearSolutions[1]" />
      <div v-else class="bg-onyx h-12 w-64 text-white"></div>
      <EquationPreview v-model="coefficients" />
      <div id="buttons" class="flex justify-center gap-32 self-stretch">
        <button @click="handleCalculate"
          class="text-white bg-onyx hover:brightness-140 focus:ring-4 focus:ring-blue-800 px-5 py-2.5 rounded-lg">Calculate</button>
        <button @click="handleReset">Reset</button>
      </div>
    </div>
    <div v-if="linearSolutions.length != 0" id="adv-results" class="flex flex-col border-onyx border-2">
      <div class="px-4 py-2 bg-onyx text-white">
        <h2 class="text-lg font-semibold">Advanced Results</h2>
      </div>
      <div class="m-4 flex flex-col gap-4">
        <div>
          <h3 class="font-medium mb-2">Characteristic Equation</h3>
          <div>
            <Latex :math="characteristicEquation" />
          </div>
        </div>
        <div>
          <h3 class="font-medium mb-2">Roots</h3>
          <div class="flex justify-around gap-12">
            <Latex :math="'r_1=' + showRoots[0]" />
            <Latex :math="'r_2=' + showRoots[1]" />
          </div>
        </div>
        <div>
          <h3 class="font-medium mb-2">Linear Solutions</h3>
          <div class="flex justify-around gap-12">
            <Latex :math="'y_1=' + linearSolutions[0]" />
            <Latex :math="'y_2=' + linearSolutions[1]" />
          </div>
        </div>
      </div>
    </div>
  </main>
  <div class="absolute bottom-20 right-20 w-fit h-fit">
    <NotationSelector />
  </div>
</template>

<style scoped></style>
