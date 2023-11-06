<script lang="ts" setup>
import DashboardView from "@/views/DashboardView.vue";
// TODO 1. Implement emulation of creating and editing post / photo in the modal + form + validation (fields should be required)
//          - Create array of received posts and photos, mutate post and photo found by ID
//          - Add new Post and Photo to the beginning of the array
// TODO 2. Implement delete Post and Photo
// TODO 3. Implement auth by common router practice using hardcoded user credentials.
//          - Implement auth form and validate user credentials with hardcoded data and allow user page route
//          - Based on Editor user (hardcoded) show/hide Users page https://jsonplaceholder.typicode.com/users
</script>

<template>
  <v-app>
    <DashboardView />
    <main>
      <RouterView />
    </main>
  </v-app>
</template>

<style>
main {
  min-height: 100vh;
  max-width: 100%;
  position: relative;
}
</style>