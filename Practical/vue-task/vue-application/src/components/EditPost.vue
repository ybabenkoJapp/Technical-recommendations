<script lang="ts" setup>
import Form from "@/components/Form.vue";
import { usePostStore } from "@/stores";
import type { IPost } from "@/app-types/IPost";

const postStore = usePostStore();
const props = defineProps<{ postId: number }>();
const emit = defineEmits(["updateShowModal"]);
const submitForm = (postData: IPost) => {
  emit("updateShowModal", false);
  postStore.updatePost(props.postId, postData);
};
</script>

<template>
  <div class="post-container">
    <h2 class="post-title">Edit Post</h2>
    <Form
      :initialData="postStore.getPostData(props.postId)"
      @submit="submitForm"
    />
  </div>
</template>