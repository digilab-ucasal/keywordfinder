<template>
  <v-row class="w-full h-full" align="center" no-gutters>
    <v-row no-gutters justify="start" align="center" class="grow-0 h-full space-x-1 pr-2">
      <v-btn icon="mdi-menu" @click="layoutStore.setDrawer(!layoutStore.drawer)" />

      <v-img src="/assets/logo.png" class="w-32 h-16" />
    </v-row>

    <v-col cols="4" no-gutters>
      <search-bar></search-bar>
    </v-col>

    <v-col cols="4"> </v-col>
  </v-row>
</template>

<script setup>
import SearchBar from '../search/SearchBar.vue';
import { useLayoutStore } from '../../stores/layout';

const layoutStore = useLayoutStore();
</script>
