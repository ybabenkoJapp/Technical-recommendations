<script lang="ts" setup>
import { useAuthStore } from "@/stores";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const logout = async () => {
  authStore.logout();
  await router.push({ name: "login" });
};
</script>

<template>
  <v-container>
    <v-row justify="end">
      <v-col class="v-col-12 align-center mr-16">
        <div v-if="authStore.isAuthenticated">
          <p>Welcome, {{ authStore.getCurrentUser }}</p>
          <v-btn color="primary" @click="logout">Logout</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
div {
  position: fixed;
  display: flex;
  align-items: center;
  gap: 30px;
  top: 10px;
  right: 250px; /* Змінилось значення left на right */
}
</style>