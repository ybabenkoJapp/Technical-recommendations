<script lang="ts" setup>
import { useAlbumStore } from "@/stores";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

const albumsStore = useAlbumStore();

const { albums } = storeToRefs(albumsStore);
onMounted(() => albumsStore.fetchAlbums());
</script>

<template>
  <section>
    <v-container>
      <v-row>
        <v-col
          v-for="album in albums"
          v-if="albums.length"
          :key="album.id"
          cols="12"
          md="4"
          sm="6"
        >
          <v-card>
            <v-card-title>{{ album.title }}</v-card-title>
            <v-card-text>
              <p>User ID: {{ album.userId }}</p>
              <p>ID: {{ album.id }}</p>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col v-else><p>No comments available</p></v-col>
      </v-row>
    </v-container>
  </section>
</template>