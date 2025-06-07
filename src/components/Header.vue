<script setup>
import IconSettings from '@/components/icons/IconSettings.vue';
import IconMorlan from './icons/IconMorlan.vue';
</script>

<template>
  <header class="flex justify-between items-center px-6 py-1">
    <div>
      <IconMorlan class="w-16"/>
    </div>
    <div class="flex flex-col items-center">
      <span class="text-2xl">Morlan's</span>
      <span>Homogeneous</span>
      <span>Destroyer</span>
    </div>
    <div>
      <IconSettings class="fill-black" />
    </div>
  </header>
</template>