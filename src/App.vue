<template>
  <Suspense>
    <v-app id="app" class="h-screen bg-gray-200 overflow-hidden">
      <v-app-bar app flat height="64" class="AppBar">
        <AppBar />
      </v-app-bar>

      <v-navigation-drawer
        :model-value="layoutStore.drawer"
        :permanent="smAndUp"
        temporary
        floating
        color="transparent"
      >
        <AppSidebar
          :style="{ paddingBottom: `${layoutStore.footerHeight}px` }"
          class="w-full h-full overflow-hidden"
        ></AppSidebar>
      </v-navigation-drawer>

      <v-main class="flex-1">
        <div class="w-full h-full flex flex-auto">
          <v-row no-gutters class="flex flex-auto p-3 overflow-hidden">
            <router-view></router-view>
          </v-row>
        </div>
      </v-main>

      <v-footer v-if="false" app :height="layoutStore.footerHeight" class="grow-0 p-0 bg-gray-50" style="z-index: 1000">
        <AppFooter />
      </v-footer>

      <app-snackbars></app-snackbars>
      <PDFViewerDialog></PDFViewerDialog>
    </v-app>
  </Suspense>
</template>

<script setup>
import AppBar from './components/app/AppBar.vue';
import AppSidebar from './components/app/AppSidebar.vue';
import AppFooter from './components/app/AppFooter.vue';
import { useDisplay } from 'vuetify';
import { useLayoutStore } from './stores/layout';
import AppSnackbars from './components/app/AppSnackbars.vue';
import PDFViewerDialog from './components/pdf/PDFViewerDialog.vue';

const layoutStore = useLayoutStore();

const { smAndUp } = useDisplay();
</script>

<style lang="scss">
html {
  overflow: hidden !important;
}

.AppBar {
  padding-left: 0 !important;
  padding-right: 0 !important;
  .v-toolbar__content {
    @apply bg-white;
    padding: 0 !important;
  }
}
</style>
