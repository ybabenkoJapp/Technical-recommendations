<script lang="ts" setup>
import { routes } from "@/router/index";

const links = routes.map((link) => ({ title: link.name, route: link.path }));
</script>
<template>
  <v-navigation-drawer>
    <v-list-item subtitle="Vuetify" title="My Application"></v-list-item>
    <v-divider></v-divider>
    <v-list class="py-1" dense flat nav>
      <v-list-item
        v-for="item in links"
        :title="item.title"
        :to="item.route"
        link
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>