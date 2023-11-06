<script lang="ts" setup>
import { ref } from "vue";
import axios from "axios";
import CreatePost from "@/components/CreatePost.vue";

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
</script>

<template>
  <section class="posts-view">
    <v-card
      v-for="item in posts"
      v-if="posts"
      :key="item.id"
      class="mx-auto my-5"
      width="1000"
    >
      <template v-slot:title> {{ item.title }}</template>

      <v-card-text>
        <p>{{ item.body }}</p>
        <br />
        <CreatePost @push-post="pushPost" />
      </v-card-text>
    </v-card>
  </section>
</template>