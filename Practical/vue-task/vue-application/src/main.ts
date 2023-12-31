import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import axios from "axios";
import VueAxios from "vue-axios";

import App from "./App.vue";
import router from "./router";

// Vuetify
import "vuetify/styles";
import "vuetify/dist/vuetify.css";
import { createVuetify } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css";

const vuetify = createVuetify({
  components,
  directives,
  defaults: {
    VBtn: {
      color: "blue",
      variant: "outlined",
      rounded: false,
    },
  },
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
});

const app = createApp(App);

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com/";

app.use(vuetify);
app.use(VueAxios, axios);
app.provide("axios", app.config.globalProperties.axios);
app.use(createPinia());
app.use(router);

app.mount("#app");
