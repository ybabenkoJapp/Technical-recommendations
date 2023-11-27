<script lang="ts" setup>
import { ref } from "vue";
import { usePostStore } from "@/stores/posts";

const postStore = usePostStore();
const title = ref("");
const postBody = ref("");

const submitForm = () => {
  const postData = {
    title: title.value,
    body: postBody.value,
    userId: 1,
    id: 101,
  };
  postStore.addPost(postData);
  title.value = "";
  postBody.value = "";
};
</script>

<template>
  <form class="post-form" @submit.prevent="submitForm">
    <div class="input-group">
      <label for="title">Title</label>
      <input
        id="title"
        v-model="title"
        class="input-control"
        minlength="3"
        name="title"
        placeholder="Title"
        required
        type="text"
      />
      <span aria-live="polite" class="error"></span>
    </div>
    <div class="input-group">
      <label for="post-editor">Body</label>
      <textarea
        id="post-editor"
        v-model="postBody"
        class="input-control"
        cols="5"
        minlength="3"
        name="post-editor"
        placeholder="Post body"
        required
        rows="6"
        type="text"
      />
      <span aria-live="polite" class="error"></span>
    </div>
    <button class="btn" type="submit">Save</button>
  </form>
</template>