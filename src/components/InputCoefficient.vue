<script setup>
const value = defineModel();
</script>

<template>
  <div class="p-2">
    <input type="number" v-model.number="value"
      class="appearance-none border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
  </div>
</template>

<style scoped>
input {
  field-sizing: content;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
  /* Firefox */
}
</style>