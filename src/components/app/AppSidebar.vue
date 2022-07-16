<template>
  <v-row no-gutters class="w-full h-full">
    <div class="w-full h-full py-3 pl-3">
      <v-card class="w-full h-full overflow-hidden">
        <v-row no-gutters class="w-full h-full overflow-hidden">
          <v-col class="flex flex-col h-full">
            <v-card-title class="shrink">
              <span>Librería</span>

              <v-spacer></v-spacer>

              <add-files-button></add-files-button>
            </v-card-title>

            <library-list class="grow"></library-list>
          </v-col>
        </v-row>
      </v-card>
    </div>
  </v-row>
</template>

<script setup>
import LibraryList from '../library/LibraryList.vue';
import AddFilesButton from '../library/AddFilesButton.vue';
</script>
