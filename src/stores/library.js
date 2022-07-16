import { defineStore } from 'pinia';
import { v4 as uuid } from 'uuid';

export const useLibraryStore = defineStore('library', {
  state: () => ({
    files: [],

    loading: false,

    viewingFileId: null,
  }),

  getters: {
    viewingFile: (state) => {
      if (!state.viewingFileId) {
        return null;
      }

      const file = state.files.find((file) => file.id === state.viewingFileId);

      if (!file) {
        return null;
      }

      return file;
    },
  },

  actions: {
    addFile(fileHandle) {
      return this.files.push({
        id: uuid(),
        name: fileHandle.name,
        fileHandle,
      });
    },

    removeFile(id) {
      if (!id) {
        throw new Error('File not found');
      }

      this.files = this.files.filter((file) => file.id !== id);
    },

    setLoading(loading) {
      this.loading = loading;
    },

    viewFile(id) {
      this.viewingFileId = id;
    },
  },
});
