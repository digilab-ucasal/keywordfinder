<template>
  <div class="relative">
    <v-progress-linear
      v-if="searching"
      indeterminate
      color="primary"
      class="absolute top-0 inset-x-0"
    ></v-progress-linear>

    <v-grid
      theme="compact"
      :source="source"
      :columns="columns"
      readonly
      :resize="true"
      :auto-size-column="{
        mode: 'headerClickAutoSize',
      }"
    ></v-grid>
  </div>
</template>

<script setup>
import { useSearchStore } from '../../stores/search';
import { storeToRefs } from 'pinia';
import VGrid from '@revolist/vue3-datagrid';
import { computed } from 'vue';
import collect from 'collect.js';
import { useLibraryStore } from '../../stores/library';

const { searching } = storeToRefs(useSearchStore());

const libraryStore = useLibraryStore();

const columns = computed(() => {
  const keywords = useSearchStore().keywords;
  return [
    {
      prop: 'fileName',
      name: 'Archivo',
      cellProperties: ({ model }) => {
        return {
          onClick: () => {
            libraryStore.viewFile(model.fileId);
          },
          class: 'hover:underline',
        };
      },
      size: 250,
      sortable: true,
      pin: 'colPinStart',
    },
    {
      name: 'Palabras Claves',
      autoSize: true,
      children:
        keywords && keywords.length
          ? keywords.map((keyword) => ({
              prop: `keywords-${keyword}`,
              name: keyword,
              autoSize: true,
              sortable: true,
            }))
          : [],
    },
  ];
});

const source = computed(() => {
  const results = useSearchStore().results;

  if (!results || !results.length) {
    return [];
  }

  return results.map((item) => ({
    fileId: item.file.id,
    fileName: item.file.name,
    fileHandle: item.file.fileHandle,
    ...collect(item.keywords)
      .mapWithKeys((count, keyword) => [`keywords-${keyword}`, count])
      .all(),
  }));
});
</script>
