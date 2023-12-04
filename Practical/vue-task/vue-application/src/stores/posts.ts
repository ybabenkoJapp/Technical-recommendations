import { defineStore } from "pinia";
import axios from "axios";
import type { IPost } from "@/app-types/IPost";

export const usePostStore = defineStore("post", {
  state: () => ({
    posts: [] as IPost[],
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
    async addPost(postData: IPost) {
      try {
        const response = await axios.post("posts", postData);
        if (response.status === 200 || response.status === 201) {
          this.posts.unshift(response.data);
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
});
