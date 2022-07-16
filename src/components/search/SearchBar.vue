<template>
  <v-form @submit.prevent="search">
    <v-row no-gutters align="center" class="space-x-2">
      <search-input></search-input>

      <v-btn type="submit" color="primary" :loading="searching">
        {{ 'Buscar' }}
      </v-btn>
    </v-row>
  </v-form>
</template>

<script setup>
import SearchInput from './SearchInput.vue';
import { useSearchStore } from '../../stores/search';
import { useLibraryStore } from '../../stores/library';
import { useNotifyStore } from '../../stores/notify';
import { storeToRefs } from 'pinia';

const searchStore = useSearchStore();

const libraryStore = useLibraryStore();

const notifyStore = useNotifyStore();

const { searching } = storeToRefs(searchStore);

function search() {
  const files = [...libraryStore.files];

  if (!files || !files.length) {
    return notifyStore.error('No has agregado ningún archivo a la Librería');
  }

  if (!searchStore.searchText || searchStore.searchText.trim() === '') {
    return notifyStore.error('No has ingresado ninguna palabra clave para buscar');
  }

  searchStore.search(files);
}
</script>
