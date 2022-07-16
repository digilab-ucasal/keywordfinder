<template>
  <v-text-field
    v-model="searchText"
    :label="'Buscar por palabras claves'"
    hint="separadas por coma"
    persistent-hint
    hide-details
    autofocus
    autocomplete="on"
    :loading="searching"
    prepend-inner-icon="mdi-magnify"
    clearable
  ></v-text-field>
</template>

<script setup>
import { ref } from 'vue';
import { useSearchStore } from '../../stores/search';
import { storeToRefs } from 'pinia';

const { searchText } = storeToRefs(useSearchStore());

const searching = ref(false);
</script>
