<script setup>
import Header from '@/components/Header.vue'
import SolutionDisplay from '@/components/SolutionDisplay.vue';
import EquationPreview from '@/components/EquationPreview.vue';

import { getCharEquations, getRoots } from '@/utils/solver';
import { ref } from 'vue';
import NotationSelector from '@/components/NotationSelector.vue';

let coefficients = ref(['','','']);

const charEquations = ref([]);
function handleCalculate() {
  charEquations.value = getCharEquations(coefficients.value);
}

function handleReset() {
  coefficients.value = ['','',''];
  charEquations.value = [];
}

</script>

<template>
  <Header />
  <main class="flex flex-col items-center">
    <div id="calculator" class="flex flex-col items-center">
      <SolutionDisplay v-if="charEquations[0] !== undefined" :y1="charEquations[0]" :y2="charEquations[1]" />
      <div v-else class="bg-onyx h-12 w-64 text-white"></div>
      <EquationPreview v-model="coefficients"/>
      <div id="buttons" class="flex justify-around self-stretch">
        <button @click="handleCalculate" class="text-white bg-onyx hover:brightness-140 focus:ring-4 focus:ring-blue-800 px-5 py-2.5 rounded-lg">Calculate</button>
        <button @click="handleReset">Reset</button>
      </div>
    </div>
    <div id="adv-results"></div>
  </main>
  <div class="absolute bottom-20 right-20 w-fit h-fit">
    <NotationSelector />
  </div>
</template>

<style scoped></style>
