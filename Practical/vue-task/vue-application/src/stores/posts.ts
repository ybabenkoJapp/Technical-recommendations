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
      } catch (error) {
        console.error("Error adding post:", error);
      }
    },

    async deletePost(postId: number) {
      try {
        const response = await axios.delete(`posts/${postId}`);
        if (response.status === 200) {
          this.posts = this.posts.filter((post) => post.id !== postId);
        } else {
          console.error(`Unsuccessful delete. Status: ${response.status}`);
        }
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    },

    async updatePost(postId: number, body: IPost) {
      try {
        const response = await axios.put(`posts/${postId}`, body);

        if (response.status === 200) {
          const index = this.posts.findIndex((post) => post.id === postId);
          if (index !== -1) {
            this.posts.splice(index, index + 1);
            setTimeout(() => (this.posts[index] = response.data), 100);
          }
        }
      } catch (error) {
        console.error("Error updating post:", error);
      }
    },

    getPostData(postId: number) {
      return this.posts.find((post) => post.id === postId);
    },
  },
});
