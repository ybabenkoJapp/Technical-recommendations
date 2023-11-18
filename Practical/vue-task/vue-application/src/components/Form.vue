<script lang="ts" setup>
import { ref } from "vue";
import axios from "axios";

const title = ref("");
const postBody = ref("");

const emit = defineEmits<{
  (
    e: "put-post",
    value: {
      userId: number;
      id: number;
      title: string;
      body: string;
    },
  ): void;
}>();

const submitForm = () => {
  axios
    .post("put", {
      title: title.value,
      body: postBody.value,
      userId: 1,
      config: {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      },
    })
    .then((json) => {
      emit("put-post", json.data);
    })
    .catch((error) => console.error(error));
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