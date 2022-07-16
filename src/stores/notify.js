import { defineStore } from 'pinia';

export const useNotifyStore = defineStore('notify', {
  state: () => ({
    messages: [],

    message: null,
  }),

  getters: {},

  actions: {
    success(message) {
      this.addMessage({
        type: 'success',
        message,
        timeout: 3000,
      });
    },

    error(message) {
      this.addMessage({
        type: 'error',
        message,
        timeout: 3000,
      });
    },

    addMessage({ type, message, timeout }) {
      this.message = {
        type,
        message,
        timeout,
      };

      setTimeout(() => {
        this.message = null;
      }, timeout);
    },
  },
});
