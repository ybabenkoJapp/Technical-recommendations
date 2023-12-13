<script lang="ts" setup>
import { useUserStore } from "@/stores";

const userStore = useUserStore();

const currentUser = userStore.getUser;
</script>

<template>
  <section>
    <v-card>
      <v-card-title>{{ currentUser.name }}</v-card-title>
      <v-card-subtitle>{{ currentUser.username }}</v-card-subtitle>
      <v-card-text>
        <p>{{ currentUser.email }}</p>
        <p>
          {{ currentUser.address.city }}, {{ currentUser.address.street }},
          {{ currentUser.address.suite }}
        </p>
      </v-card-text>
    </v-card>
  </section>
</template>