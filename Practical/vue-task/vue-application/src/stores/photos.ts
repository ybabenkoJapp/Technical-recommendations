import { defineStore } from "pinia";
import type { IPhoto } from "@/app-types/IPhoto";
import axios from "axios";

export const usePhotosStore = defineStore("photo", {
  state: () => ({
    photos: [] as IPhoto[],
  }),
  getters: {
    getPosts: (state) => state.photos,
  },
  actions: {
    async fetchPhotos() {
      try {
        const response = await axios("photos", {
          params: {
            _limit: 99,
          },
        });
        if (response.status === 200) {
          this.photos = response.data;
        } else {
          return this.photos;
        }
      } catch (error) {
        console.error("[Error happened during fetching photos]", error);
      }
    },
  },
});
