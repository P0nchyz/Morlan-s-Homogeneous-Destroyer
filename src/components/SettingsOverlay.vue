<script setup>
import { usePreferences } from '@/utils/usePreferences';
import { nextTick, ref, watch } from 'vue';

const { updatePreference, resetPreferences, notation, decimalPlaces, independentVariable, dependentVariable, rootVariable, showSettings } = usePreferences();

const isOpen = defineModel();
const overlayBox = ref(null);

watch(showSettings, async (isOpen) => {
  if (isOpen) {
    await nextTick();
    overlayBox.value?.focus();
  }
})

const handleEscape = () => {
  updatePreference('showSettings', false);
}

const handleNotation = (event) => {
  const newValue = event.target.value;
  updatePreference('notation', newValue)
}

const handleDecimals = (event) => {
  const newValue = event.target.value;
  updatePreference('decimalPlaces', newValue);
}

const handleIndependentVariable = (event) => {
  const newValue = event.target.value;
  updatePreference('independentVariable', newValue);
}

const handleDependentVariable = (event) => {
  const newValue = event.target.value;
  updatePreference('dependentVariable', newValue);
}

const handleRootVariable = (event) => {
  const newValue = event.target.value;
  updatePreference('rootVariable', newValue);
}
</script>

<template>
  <Transition name="fade">
    <div v-if="isOpen" @keydown.esc="handleEscape" @click.self="handleEscape" tabindex="0" ref="overlayBox"
      class="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div class="flex flex-col justify-baseline bg-white w-120 h-160 p-8 shadow-2xl rounded-xl overflow-y-auto">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-semibold">Settings</h2>
          <button @click="updatePreference('showSettings', false)" class="text-gray-400 hover:text-gray-900">✕</button>
        </div>
        <div class="space-y-6">
          <div class="flex items-center justify-between">
            <label>Notation for Differentiation</label>
            <select :value="notation" @change="handleNotation" class="border-1 rounded-sm">
              <option disabled value="">Please select one</option>
              <option value="lagrange">Lagrange</option>
              <option value="leibniz">Leibniz</option>
              <option value="newton">Newton</option>
            </select>
          </div>
          <div class="flex items-center justify-between">
            <label>Number of Decimals</label>
            <input type="number" @focus="$event.target.select()" :value="decimalPlaces" @change="handleDecimals"
              class="border-1 min-w-12 text-right px-1 rounded-sm">
          </div>
          <div class="flex items-center justify-between">
            <label>Independent Variable</label>
            <input type="text" @focus="$event.target.select()" :value="independentVariable"
              @change="handleIndependentVariable" class="border-1 min-w-12 text-right px-2 rounded-sm">
          </div>
          <div class="flex items-center justify-between">
            <label>Dependent Variable</label>
            <input type="text" @focus="$event.target.select()" :value="dependentVariable"
              @change="handleDependentVariable" class="border-1 min-w-12 text-right px-2 rounded-sm">
          </div>
          <div class="flex items-center justify-between">
            <label>Root Variable</label>
            <input type="text" @focus="$event.target.select()" :value="rootVariable" @change="handleRootVariable"
              class="border-1 min-w-12 text-right px-2 rounded-sm">
          </div>
        </div>
        <div @click="resetPreferences"
          class="mt-auto w-fit text-white bg-onyx hover:brightness-140 focus:ring-4 focus:ring-blue-800 px-5 py-2.5 rounded-lg">
          <button>Restore</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
input {
  field-sizing: content;
}
</style>