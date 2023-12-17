<script lang="ts" setup>
import type { IUser } from "@/app-types/IUser";
import { onMounted, ref } from "vue";

const currentUser = ref<IUser>({} as IUser);

onMounted(() => {
  const sessionUser = sessionStorage.getItem("user");
  if (sessionUser) {
    currentUser.value = JSON.parse(sessionUser);
  }
});
</script>

<template>
  <section>
    <v-card v-if="currentUser?.username === 'editor'">
      <v-card-title>Hello {{ currentUser?.username }}!</v-card-title>
      <v-card-text>
        <p>Nice to see you again!</p>
      </v-card-text>
    </v-card>
    <v-card v-else-if="Object.values(currentUser).length">
      <v-card-title>{{ currentUser?.name }}</v-card-title>
      <v-card-subtitle>{{ currentUser?.username }}</v-card-subtitle>
      <v-card-text>
        <p>{{ currentUser?.email }}</p>
        <p>
          {{ currentUser?.address?.city }}, {{ currentUser?.address?.street }},
          {{ currentUser?.address?.suite }}
        </p>
      </v-card-text>
    </v-card>
    <div v-else>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. A dolorum, illo
      laudantium pariatur unde voluptas. Adipisci aliquam cum cumque, deserunt
      dignissimos eaque exercitationem harum numquam officia quaerat,
      reprehenderit suscipit voluptate!
    </div>
  </section>
</template>