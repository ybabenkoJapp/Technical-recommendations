<script lang="ts" setup>
import { ref } from "vue";
import axios from "axios";

interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// Create array of received posts, mutate post found by ID
const posts = ref<IPost[] | null>(null);

axios("posts").then((res) => (posts.value = res.data as IPost[]));

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
        <v-dialog width="500">
          <template v-slot:activator="{ props }">
            <v-btn text="Open Dialog" v-bind="props"></v-btn>
          </template>

          <template v-slot:default="{ isActive }">
            <v-card title="Dialog">
              <v-card-text>
                <!-- <Form /> -->
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                  text="Close Dialog"
                  @click="isActive.value = false"
                ></v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </v-card-text>
    </v-card>
  </section>
</template>