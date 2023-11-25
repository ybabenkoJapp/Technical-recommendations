<script lang="ts" setup>
import TeleportModal from "@/modals/TeleportModal.vue";
import EditPost from "@/components/EditPost.vue";
import { ref } from "vue";

const props = defineProps<{ title: string; body: string }>();

const { title, body } = props;
const showModal = ref(false);
</script>

<template>
  <v-card class="mx-auto my-5 position-relative" width="1000">
    <template v-slot:title> {{ title }}</template>
    <button @click="showModal = !showModal">Edit post</button>
    <TeleportModal :show="showModal" @update:show="(val) => (showModal = val)">
      <EditPost />
    </TeleportModal>
    <v-card-text>
      <p>{{ body }}</p>
      <br />
    </v-card-text>
  </v-card>
</template>

<style scoped></style>