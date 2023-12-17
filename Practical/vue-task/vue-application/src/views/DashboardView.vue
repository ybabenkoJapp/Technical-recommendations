<script lang="ts" setup>
import { routes } from "@/router";
import { useUserStore } from "@/stores";
import { onMounted, ref, watch } from "vue";
import type { RouteRecordName } from "vue-router";

const userStore = useUserStore();
const userRole = ref(userStore.getUserRole);
const links = ref<{ title?: RouteRecordName; route: string }[]>([]);

const updateRoutes = () => {
  links.value = routes
    .filter((route) => {
      if (route.name === "users") {
        return userRole.value === "editor";
      } else return !(route.name === "post" || route.name === "login");
    })
    .map((route) => ({ title: route.name, route: route.path }));
};

onMounted(() => {
  userRole.value = sessionStorage.getItem("role") || userStore.getUserRole;
  updateRoutes();
});

watch(
  () => userStore.getUserRole,
  (newUserRole) => {
    userRole.value = newUserRole;
    updateRoutes();
  },
);
</script>

<template>
  <v-navigation-drawer app>
    <v-list-item>
      <v-list-item-title class="subtitle-2">My Application</v-list-item-title>
    </v-list-item>
    <v-divider></v-divider>
    <v-list class="py-1" dense flat nav>
      <v-list-item
        v-for="item in links"
        :key="item.route"
        :to="item.route"
        link
      >
        <v-list-item-title>{{ item.title }}</v-list-item-title>
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