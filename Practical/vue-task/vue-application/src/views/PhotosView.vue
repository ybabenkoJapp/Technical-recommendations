<script lang="ts" setup>
import { ref } from "vue";
import axios from "axios";

interface IPhotos {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

// Create array of received photos, mutate photo found by ID
const photos = ref<IPhotos[] | null>(null);

axios("photos").then((res) => (photos.value = res.data as IPhotos[]));

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