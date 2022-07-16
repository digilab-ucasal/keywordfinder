import { defineStore } from 'pinia';
import { getKeywordsFromText, search } from '../workers/searchWorker';

export const useSearchStore = defineStore('search', {
  state: () => ({
    searchText: null,

    results: null,

    searching: false,
  }),

  getters: {
    keywords: (state) => {
      if (!state.searchText || state.searchText.trim() === '') {
        return null;
      }

      return [...new Set(getKeywordsFromText(state.searchText))];
    },
  },

  actions: {
    async search(files) {
      if (this.searching || !files || !files.length) {
        return null;
      }

      this.setSearching(true);

      const results = await search(files, this.keywords);

      this.setResults(results);

      this.setSearching(false);
    },

    setResults(results) {
      if (!results || !results.length) {
        this.results = null;
        return;
      }

      this.results = [...new Set(results)];
    },

    setSearching(searching) {
      this.searching = searching;
    },
  },
});
