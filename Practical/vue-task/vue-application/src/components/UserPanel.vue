<script lang="ts" setup>
import { useAuthStore, useUserStore } from "@/stores";
import { useRouter } from "vue-router";
import { onMounted, ref, watch } from "vue";
import type { IUser } from "@/app-types/IUser";

const authStore = useAuthStore();
const router = useRouter();
const user = useUserStore();

const currentUser = ref<IUser | null>(null);

onMounted(() => {
  const sessionUser = sessionStorage.getItem("user");
  if (sessionUser) {
    currentUser.value = JSON.parse(sessionUser);
  } else {
    currentUser.value = user.getUser;
  }
});

watch(
  () => user.getUser,
  (val) => {
    currentUser.value = val;
  },
);
const logout = async () => {
  authStore.logout();
  await router.push({ name: "login" });
};
</script>

<template>
  <v-container class="bg-grey-lighten-3 mb-6">
    <v-row justify="end">
      <v-col
        v-if="currentUser && Object.values(currentUser).length"
        class="v-col-3 align-center d-flex justify-space-around"
      >
        <p v-if="currentUser.username">Welcome, {{ currentUser.username }}</p>
        <v-btn color="primary" @click="logout">Logout</v-btn>
      </v-col>
      <v-col v-else class="v-col-3">
        <v-list-item
          class="outlined-link"
          color="primary"
          dense
          link
          rounded
          to="/login"
        >
          Login
        </v-list-item>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.v-container {
  position: fixed;
  display: flex;
  align-items: center;
  gap: 30px;
  top: 10px;
  border-radius: 8px;
  padding: 10px 20px;
  z-index: 1000;
}

.outlined-link {
  border: 2px solid #6200ee;
  /*color: red;*/
  text-decoration: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}
</style>