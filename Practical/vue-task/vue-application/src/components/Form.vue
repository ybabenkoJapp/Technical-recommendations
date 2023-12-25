<script lang="ts" setup>
import { onMounted, ref } from "vue";
import type { IPost } from "@/app-types/IPost";

const title = ref("");
const postBody = ref("");
const emit = defineEmits(["submit"]);
const props = defineProps<{ initialData?: IPost }>();

const submitForm = () => {
  const postData = {
    title: title.value,
    body: postBody.value,
  };
  emit("submit", postData);
  clearForm();
};

const clearForm = () => {
  title.value = "";
  postBody.value = "";
};

onMounted(() => {
  if (props.initialData) {
    title.value = props.initialData?.title || "";
    postBody.value = props.initialData?.body || "";
  }
});
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