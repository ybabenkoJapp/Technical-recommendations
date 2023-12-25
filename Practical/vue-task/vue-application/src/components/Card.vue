<script lang="ts" setup>
import Modal from "@/modals/Modal.vue";
import EditPost from "@/components/EditPost.vue";
import { ref } from "vue";
import { usePostStore } from "@/stores";

const props = defineProps<{ title: string; body: string; id: number }>();
const storage = usePostStore();
const { title, body, id } = props;
const showModal = ref(false);
</script>

<template>
  <v-card class="mx-auto my-5 position-relative" width="1000">
    <v-list-item :to="{ name: 'post', params: { id } }" link title="Post">
      <template v-slot:title> {{ title }}</template>
    </v-list-item>
    <Modal :show="showModal" @update:show="(val) => (showModal = val)">
      <EditPost
        :postId="id"
        @updateShowModal="(value) => (showModal = value)"
      />
    </Modal>
    <v-card-text>
      <p>{{ body }}</p>
      <br />
    </v-card-text>
    <v-card-actions>
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
        @click="() => storage.deletePost(id)"
        >Delete
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped></style>