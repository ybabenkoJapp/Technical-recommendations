<script lang="ts" setup>
import { routes } from "@/router";
import { useUserStore } from "@/stores";

const userStore = useUserStore();
const links = routes
  .map((link) => ({ title: link.name, route: link.path }))
  .filter((route) => route.title !== "post");
</script>
<template>
  <!--  <pre>{{ links }}</pre>-->
  <v-navigation-drawer app>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="subtitle-2">My Application</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
    <v-list class="py-1" dense flat nav>
      <v-list-item
        v-for="item in links"
        :key="item.route"
        :to="item.route"
        link
      >
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style>
.v-navigation-drawer {
  width: 250px;
}

@media only screen and (max-width: 1264px) {
  .v-navigation-drawer {
    width: 200px;
  }
}

@media only screen and (max-width: 600px) {
  .v-navigation-drawer {
    width: 100%;
  }
}
</style>