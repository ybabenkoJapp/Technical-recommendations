<script lang="ts" setup>
import { ref } from "vue";
import axios from "axios";
import TeleportModal from "@/modals/TeleportModal.vue";
import CreatePost from "@/components/CreatePost.vue";
import Card from "@/components/Card.vue";

interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// Create array of received posts, mutate post found by ID
const posts = ref<IPost[] | null>(null);

axios("posts").then((res) => (posts.value = res.data as IPost[]));

function pushPost(emittedValue: unknown) {
  console.log("emittedValue: ", emittedValue);
  if (posts.value && emittedValue) posts.value.unshift(emittedValue as IPost);
}

// TODO Implement emulation of creating and editing post

fetch("https://jsonplaceholder.typicode.com/posts/1", {
  method: "PUT",
  body: JSON.stringify({
    id: 1,
    title: "foo",
    body: "bar",
    userId: 1,
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8",
  },
})
  .then((response) => response.json())
  .then((json) => console.log(json));

const showModal = ref(false);
</script>

<template>
  <section class="posts-view">
    <header>
      <button @click="() => (showModal = !showModal)">Create post</button>
      <TeleportModal :show="showModal">
        <CreatePost />
      </TeleportModal>
    </header>
    <Card
      v-for="item in posts"
      v-if="posts"
      :key="item.id"
      :body="item.body"
      :title="item.title"
      class="mx-auto my-5 position-relative"
      width="1000"
    />
  </section>
</template>

<style>
.posts-view {
  padding-left: 200px;
}
</style>