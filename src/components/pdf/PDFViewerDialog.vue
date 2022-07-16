<template>
  <div>
    <v-dialog v-model="dialog" fullscreen>
      <v-card v-if="dialog && libraryStore.viewingFile" class="relative bg-gray-200">
        <v-card-title class="sticky top-0 inset-x-0 bg-white/70 backdrop-blur-md z-50 shadow">
          <v-btn icon="mdi-arrow-left" variant="plain" @click="dialog = false"></v-btn>
          <v-spacer></v-spacer>
          <span class="max-w-64 truncate">{{ libraryStore.viewingFile.name }}</span>
          <v-spacer></v-spacer>
          <v-btn icon="mdi-close" variant="plain" @click="dialog = false"></v-btn>
        </v-card-title>
        <v-card-text>
          <PDFViewer :file-handle="libraryStore.viewingFile.fileHandle" class="max-w-4xl mx-auto"></PDFViewer>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import PDFViewer from './PDFViewer.vue';
import { ref } from 'vue';
import { useLibraryStore } from '../../stores/library';

const dialog = ref(false);

const libraryStore = useLibraryStore();

libraryStore.$onAction((action) => {
  if (action.name !== 'viewFile') {
    return;
  }

  const fileId = action.args[0];

  if (fileId) {
    dialog.value = true;
  } else {
    dialog.value = false;
  }
});
</script>

<style lang="scss">
.vue-pdf-embed {
  & > div {
    @apply mb-6 shadow-md;
  }
}
</style>
