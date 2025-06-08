<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'

const props = defineProps({
  math: String
})

const mathRoot = ref(null)

const renderMath = () => {
  window.renderMathInElement(mathRoot.value, {
    delimiters: [
      { left: '$$', right: '$$', display: true },
      { left: '\\(', right: '\\)', display: false }
    ],
    throwOnError: false
  })
}

onMounted(renderMath)
watch(() => props.math, async () => {
  await nextTick();
  if (window.renderMathInElement) {
    renderMath();
  }
})
</script>

<template>
  <span ref="mathRoot">$${{ math }}$$</span>
</template>