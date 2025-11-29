import 'reset-css';
import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/aura-light-green/theme.css';
import 'primeicons/primeicons.css';

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css'; // Ensure you are using css-loader
import 'simplebar/dist/simplebar.css';
import colors from 'vuetify/util/colors';

import { autoAnimatePlugin } from '@formkit/auto-animate/vue';

import App from './App.vue';
import router from './router';

import 'simplebar/dist/simplebar.css';

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi' // This is already the default value - only for display purposes
  },
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          primary: colors.red.darken1, // #E53935
          secondary: colors.red.lighten4 // #FFCDD2
        }
      }
    }
  }
});

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(PrimeVue);
app.use(vuetify);
app.use(autoAnimatePlugin);

app.mount('#app');
