import { defineStore } from "pinia";
import axios from "axios";
import type { IAlbum } from "@/app-types/IAlbum";

export const useAlbumStore = defineStore("album", {
  state() {
    return {
      albums: [] as IAlbum[],
    };
  },
  actions: {
    async fetchAlbums() {
      try {
        const response = await axios("albums");
        if (response.status === 200) {
          this.albums = response.data;
        }
      } catch (error) {
        console.error("[Error happened during fetching albums]", error);
      }
    },
  },
});
