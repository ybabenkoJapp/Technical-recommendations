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
        if (response.status === 200) {
          this.posts.unshift(response.data);
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
});
