<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import Modal from "@/modals/Modal.vue";
import CreatePost from "@/components/CreatePost.vue";
import Card from "@/components/Card.vue";
import { usePostStore } from "@/stores";
import type { IPost } from "@/app-types/IPost";

const store = usePostStore();

// Create array of received posts, mutate post found by ID
const posts = computed<IPost[]>(() => store.getPosts);

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
        variant="elevated"
        @click="() => (showModal = !showModal)"
        >Create post
      </v-btn>
      <Modal :show="showModal" @update:show="(val) => (showModal = val)">
        <CreatePost @updateShowModal="(value) => (showModal = value)" />
      </Modal>
    </header>
    <Card
      v-for="item in posts"
      v-if="posts"
      :id="item.id"
      :key="item.id"
      :body="item.body"
      :title="item.title"
      class="mx-auto my-5 position-relative"
      width="1000"
    />
  </section>
</template>