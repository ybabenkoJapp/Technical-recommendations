<script lang="ts" setup>
import { useUserStore } from "@/stores";
import { computed, onMounted } from "vue";
import type { IUser } from "@/app-types/IUser";

const usersStore = useUserStore();

onMounted(() => usersStore.fetchAllUsers());

const allUsers = computed<IUser[]>(() => usersStore.getUsers);
</script>

<template>
  <section>
    <v-container>
      <v-row>
        <v-col v-for="user in allUsers" :key="user.id" cols="12" lg="4" md="6">
          <v-card>
            <v-card-title>{{ user.name }}</v-card-title>
            <v-card-subtitle>{{ user.username }}</v-card-subtitle>
            <v-card-text>
              <p>{{ user.email }}</p>
              <p>
                {{ user.address.city }}, {{ user.address.street }},
                {{ user.address.suite }}
              </p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>