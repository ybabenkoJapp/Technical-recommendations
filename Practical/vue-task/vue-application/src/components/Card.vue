<script lang="ts" setup>
import Modal from "@/modals/Modal.vue";
import EditPost from "@/components/EditPost.vue";
import { ref } from "vue";

const props = defineProps<{ title: string; body: string }>();

const { title, body } = props;
const showModal = ref(false);
</script>

<template>
  <v-card class="mx-auto my-5 position-relative" width="1000">
    <template v-slot:title> {{ title }}</template>
    <Modal :show="showModal" @update:show="(val) => (showModal = val)">
      <EditPost />
    </Modal>
    <v-card-text>
      <p>{{ body }}</p>
      <br />
    </v-card-text>
    <v-row align="center" class="pa-0 my-2 mx-12" justify="end">
      <v-btn
        class="my-2 mr-2"
        density="comfortable"
        variant="elevated"
        @click="() => (showModal = !showModal)"
        >Edit post
      </v-btn>
      <v-btn
        color="error"
        density="comfortable"
        variant="elevated"
        @click="() => (showModal = !showModal)"
        >Delete
      </v-btn>
    </v-row>
  </v-card>
</template>

<style scoped></style>