import { defineStore } from "pinia";
import axios from "axios";

interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const usePostStore = defineStore("post", {
  state: () => ({
    posts: [],
  }),
  getters: {
    getPosts: (state) => state.posts,
  },
  actions: {
    async fetchPosts() {
      axios("posts")
        .then((res) => (this.posts = res.data))
        .catch((error) => console.log(error));
    },
  },
});
