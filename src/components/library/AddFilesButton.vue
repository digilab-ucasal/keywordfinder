<template>
  <v-btn icon="mdi-plus" variant="plain" size="small" color="primary" class="bg-blue-50" @click="openFiles()"></v-btn>
</template>

<script setup>
import { useLibraryStore } from '../../stores/library';
import { useNotifyStore } from '../../stores/notify';

const libraryStore = useLibraryStore();

async function openFiles() {
  try {
    libraryStore.setLoading(true);
    const filesHandles = await window.showOpenFilePicker({
      types: [
        {
          description: 'Archivo PDF',
          accept: {
            'application/pdf': ['.pdf'],
          },
        },
      ],
      multiple: true,
    });

    if (!filesHandles || !filesHandles.length) {
      throw new Error('No se seleccionó ningun archivo');
    }

    filesHandles.map(async (fileHandle) => await libraryStore.addFile(fileHandle));

    libraryStore.setLoading(false);
  } catch (error) {
    libraryStore.setLoading(false);
    useNotifyStore().error(error);
  }
}
</script>
