<template>
  <a class="text-primary-800 hover:underline" @click="libraryStore.viewFile(file.id)">
    <slot v-if="hasSlot('default')" />
    <span v-else>{{ file.name }}</span>
  </a>
</template>

<script setup>
import { defineProps, useSlots } from 'vue';
import { useLibraryStore } from '../../stores/library';

const slots = useSlots();

const { file } = defineProps({
  file: null,
});

const hasSlot = (name) => {
  return !!slots[name];
};

const libraryStore = useLibraryStore();
</script>

<style scoped></style>
