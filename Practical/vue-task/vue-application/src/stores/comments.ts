import { defineStore } from "pinia";
import type { IComment } from "@/app-types/IComment";
import axios from "axios";

export const useCommentStore = defineStore("comment", {
  state: () => ({
    comments: [] as IComment[],
  }),
  getters: {
    getComments: (state) => state.comments,
  },
  actions: {
    async fetchComments(id: number) {
      try {
        const response = await axios(`posts/${id}/comments`);
        if (response.status === 200 || response.status === 201) {
          console.log("comments: ", response.data);
          this.comments = response.data;
        }
      } catch (e) {
        console.error(e);
      }
    },
  },
});
