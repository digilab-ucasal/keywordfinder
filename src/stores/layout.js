import { defineStore } from 'pinia';

export const useLayoutStore = defineStore('layout', {
  state: () => ({
    drawer: true,

    footerHeight: 0,
  }),

  getters: {},

  actions: {
    setDrawer(drawer) {
      this.drawer = drawer;
    },
  },
});
