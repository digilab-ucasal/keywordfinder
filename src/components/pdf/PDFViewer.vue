<template>
  <vue-pdf-embed :source="pdfTypedArray" />
</template>

<script setup>
import { defineProps } from 'vue';
import { getTypedArray } from '../../workers/searchWorker';
import VuePdfEmbed from 'vue-pdf-embed';

const { fileHandle } = defineProps({
  fileHandle: null,
});

const pdfTypedArray = await getTypedArray(await fileHandle.getFile());
</script>

<style lang="scss">
.vue-pdf-embed {
  & > div {
    @apply mb-6 shadow-md;
  }
}
</style>
