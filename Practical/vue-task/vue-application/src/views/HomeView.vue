<script lang="ts" setup>
import { useUserStore } from "@/stores";

const currentUser = useUserStore();
</script>

<template>
  <div>
    <h2>This is a home page</h2>
    <pre>Current user data: {{ currentUser.user }}</pre>
  </div>
</template>

<style scoped>
div {
  margin-left: 400px;
}
</style>