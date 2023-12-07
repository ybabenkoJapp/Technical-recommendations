<script lang="ts" setup>
import { computed, onMounted } from "vue";
import { usePhotosStore } from "@/stores";
import type { IPhoto } from "@/app-types/IPhoto";

const photosStore = usePhotosStore();

// Create array of received photos, mutate photo found by ID
const photos = computed<IPhoto[]>(() => photosStore.getPosts);

onMounted(async () => await photosStore.fetchPhotos());
// TODO Implement emulation of creating and editing photo
</script>

<template>
  <section class="photos-view">
    <div v-for="item in photos" :key="item.id">
      <h2>{{ item.title }}</h2>
      <br />
      <img :src="item.thumbnailUrl" alt="test" height="150" width="150" />
    </div>
  </section>
</template>

<style>
.photos-view {
  width: 100vw;
}
</style>