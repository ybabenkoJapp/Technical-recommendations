<script lang="ts" setup>
import { useRoute } from "vue-router";
import { useCommentStore, usePostStore } from "@/stores";
import type { IPost } from "@/app-types/IPost";
import { onMounted, ref, watch } from "vue";
import type { IComment } from "@/app-types/IComment";

const postStore = usePostStore();
const commentStore = useCommentStore();
const route = useRoute();
const postId = ref<string>("");

const post = ref({} as IPost);
const comments = ref<IComment[]>([]);

watch(
  () => postStore.getPosts,
  (newPosts) => {
    post.value =
      newPosts.find((post: IPost) => post.id === parseInt(postId!.value)) ||
      ({} as IPost);
  },
);

watch(
  () => commentStore.getComments,
  (newComments) => {
    comments.value = newComments;
  },
);

async function fetchData() {
  postId.value = route.params.id as string;
  if (!postStore.getPosts.length) {
    await postStore.fetchPosts();
  }

  post.value = postStore.getPosts.find(
    (post: IPost) => post.id === parseInt(postId!.value),
  ) || { body: "", id: 0, title: "", userId: 0 };

  if (post.value) {
    await commentStore.fetchComments(parseInt(postId!.value));
    comments.value = commentStore.getComments;
  }
}

onMounted(() => {
  fetchData();
});
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class="mx-auto my-5 position-relative" width="1000">
          <v-card-title>{{ post.title }}</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <p>{{ post.body }}</p>
          </v-card-text>
          <v-divider></v-divider>
          <v-list>
            <v-list-item v-if="comments.length > 0">
              <v-list-subheader
                >Comments: {{ comments.length }}
              </v-list-subheader>
              <v-list-item v-for="comment in comments" :key="comment.id">
                <v-list-item class="custom-list-item">
                  <v-list-item-title class="text-h6"
                    >{{ comment.name }}
                  </v-list-item-title>
                  <v-list-item-subtitle
                    >{{ comment.body }}
                  </v-list-item-subtitle>
                </v-list-item>
              </v-list-item>
            </v-list-item>
            <v-list-item v-else>
              <p>No comments available</p>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>