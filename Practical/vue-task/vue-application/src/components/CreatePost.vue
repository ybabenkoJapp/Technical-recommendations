<script lang="ts" setup>
import { useRoute } from "vue-router";
import { ref } from "vue";
import axios from "axios";

const route = useRoute();
const id = route.params.id; // read parameter id (it is reactive) // see https://stackoverflow.com/questions/65284428/how-to-get-params-of-router-in-vue-3#answer-66953246

const title = ref("");
const postBody = ref("");
const emit = defineEmits<{
  (
    e: "push-post",
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
    .post("posts", {
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
      emit("push-post", json.data);
    })
    .catch((error) => console.error(error));
};
</script>

<template>
  <div class="post-container">
    <p>Check v-model Title: {{ title }}</p>
    <p>Check v-model Body: {{ postBody }}</p>
    <form class="post-form" @submit.prevent="submitForm">
      <h2 class="post-title">Create Post</h2>
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