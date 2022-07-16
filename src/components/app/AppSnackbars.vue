<template>
  <div>
    <v-snackbar v-if="message" :model-value="true" app :color="color" content-class="text-gray-50">
      {{ message.message }}
    </v-snackbar>
  </div>
</template>

<script setup>
import { useNotifyStore } from '../../stores/notify';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const { message } = storeToRefs(useNotifyStore());

const color = computed(() => {
  if (!message) {
    return null;
  }

  switch (message.value.type) {
    case 'success':
      return 'teal-darken-2';

    case 'error':
      return 'red-darken-4';

    default:
      return null;
  }
});
</script>
