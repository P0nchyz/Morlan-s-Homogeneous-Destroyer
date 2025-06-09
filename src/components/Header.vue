<script setup>
import { usePreferences } from '@/utils/usePreferences';

import IconSettings from '@/components/icons/IconSettings.vue';
import IconMorlan from './icons/IconMorlan.vue';

const { updatePreference } = usePreferences();
</script>

<template>
  <header class="flex justify-between items-center px-6 py-1">
    <div>
      <IconMorlan class="w-8" />
    </div>
    <div class="flex flex-col items-center">
      <span class="text-2xl font-bold">Morlan's</span>
      <span>Homogeneous</span>
      <span>Destroyer</span>
    </div>
    <div @click="updatePreference('showSettings', true)">
      <IconSettings class="fill-onyx hover:fill-black hover:cursor-pointer active:fill-gray-500"/>
    </div>
  </header>
</template>