<script lang="ts" setup>
import Form from "@/components/Form.vue";
import { usePostStore } from "@/stores";
import type { IPost } from "@/app-types/IPost";

const storage = usePostStore();

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
      :initialData="storage.getPostData(props.postId)"
      @submit="submitForm"
    />
  </div>
</template>

<style scoped>
.post-form {
  margin: 30px auto;
  background: #fff;
  border-radius: 5px;
  padding: 20px;
}

.post-title {
  margin-bottom: 20px;
}

.input-group {
  margin-bottom: 16px;
}

.input-group label {
  display: block;
  margin-bottom: 8px;
  user-select: none;
}

.input-control {
  display: block;
  width: 100%;
  font-size: 1.1rem;
  background: #fff;
  border: 1px solid #2d2c2c;
  line-height: 1.6rem;
  padding: 0.75rem 1rem;
  border-radius: 3px;
  height: 52px;
}

textarea.input-control {
  height: unset !important;
}

/* input validation */
textarea:invalid:required,
input:invalid:required {
  border: 1px solid red;
}

/*input:invalid:required {*/
/*  background-image: linear-gradient(to right, pink, lightgreen);*/
/*}*/

input:valid {
  border: 2px solid black;
}
</style>