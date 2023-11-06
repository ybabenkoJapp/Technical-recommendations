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

    <!--    <v-list-item link title="Dashboard" to="/dashboard"></v-list-item>-->
    <!--    <v-list-item link title="Posts" to="/posts"></v-list-item>-->
    <!--    <v-list-item link title="Albums" to="/albums"></v-list-item>-->
    <!--    <v-list-item link title="Photos" to="/photos"></v-list-item>-->
  </v-navigation-drawer>
</template>