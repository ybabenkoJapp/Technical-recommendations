import { defineStore } from "pinia";
import type { IPhoto } from "@/app-types/IPhoto";
import axios from "axios";

export const usePhotosStore = defineStore("photo", {
  state: () => ({
    photos: [] as IPhoto[],
  }),
  getters: {
    getPhotos: (state) => state.photos,
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
    async deletePhoto(photoId: number) {
      try {
        const response = await axios.delete(`photos/${photoId}`);
        if (response.status === 200) {
          this.photos = this.photos.filter((photo) => photo.id !== photoId);
        } else {
          console.error(`Unsuccessful delete. Status: ${response.status}`);
        }
      } catch (error) {
        console.error("Error deleting photo:", error);
      }
    },
    async updatePhoto(photoId: number, body: IPhoto) {
      try {
        const response = await axios.put(`photos/${photoId}`, body);

        if (response.status === 200) {
          const index = this.photos.findIndex((photo) => photo.id === photoId);
          if (index !== -1) {
            this.photos.splice(index, index + 1);
            setTimeout(() => (this.photos[index] = response.data), 10);
          }
        }
      } catch (error) {
        console.error("Error updating photo:", error);
      }
    },
  },
});
