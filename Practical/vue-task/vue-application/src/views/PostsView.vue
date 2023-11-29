<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import Modal from "@/modals/Modal.vue";
import CreatePost from "@/components/CreatePost.vue";
import Card from "@/components/Card.vue";
import { usePostStore } from "@/stores/posts";

interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const store = usePostStore();

// Create array of received posts, mutate post found by ID
const posts = computed<IPost[]>(() => store.getPosts);

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

onMounted(() => {
  store.fetchPosts();
});
</script>

<template>
  <section class="posts-view">
    <header>
      <v-btn
        density="comfortable"
        elevated
        variant="elevated"
        @click="() => (showModal = !showModal)"
        >Create post
      </v-btn>
      <Modal :show="showModal" @update:show="(val) => (showModal = val)">
        <CreatePost />
      </Modal>
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