import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import { router } from './plugins/router';
import { loadFonts } from './plugins/webfontloader';
import { createPinia } from 'pinia';
import mitt from 'mitt';

import './assets/tailwind.css';

loadFonts();

const emitter = mitt();

const app = createApp(App).use(vuetify).use(createPinia()).use(router);

app.config.globalProperties.emitter = emitter;

app.mount('#app');
