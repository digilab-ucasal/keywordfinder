<template>
  <v-list class="relative">
    <v-progress-linear
      v-if="loading"
      indeterminate
      color="primary"
      class="absolute top-0 inset-x-0"
    ></v-progress-linear>

    <v-list-item v-if="!files || !files.length">
      <td>Aún no has cargado ningún archivo</td>
    </v-list-item>

    <template v-for="item in files" :key="item.name">
      <v-list-item>
        <PDFLink :file="item" class="w-full truncate"></PDFLink>
        <template #append>
          <v-list-item-action>
            <v-btn icon="mdi-delete" variant="plain" size="small" @click="libraryStore.removeFile(item.id)"></v-btn>
          </v-list-item-action>
        </template>
      </v-list-item>

      <v-divider></v-divider>
    </template>
  </v-list>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useLibraryStore } from '../../stores/library';
import PDFLink from '../pdf/PDFLink.vue';

const libraryStore = useLibraryStore();

const { files, loading } = storeToRefs(libraryStore);
</script>
