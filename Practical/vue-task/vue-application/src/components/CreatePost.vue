<script lang="ts" setup>
import Form from "@/components/Form.vue";
import type { IPost } from "@/app-types/IPost";
import { usePostStore } from "@/stores";

const storage = usePostStore();

const randomId = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min)) + min;

const emit = defineEmits(["updateShowModal"]);

const submitForm = (postData: IPost) => {
  emit("updateShowModal", false);
  postData.id = randomId(100, 200); // create random IDs in range
  storage.addPost(postData);
};
</script>

<template>
  <div class="post-container">
    <h2 class="post-title">Create Post</h2>
    <Form @submit="submitForm" />
  </div>
</template>