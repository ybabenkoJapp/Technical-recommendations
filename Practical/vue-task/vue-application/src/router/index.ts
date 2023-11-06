import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PostsView from "@/views/PostsView.vue";
import AlbumsView from "@/views/AlbumsView.vue";
import PhotosView from "@/views/PhotosView.vue";
import Post from "@/components/Post.vue";

export const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  // {
  //   path: "/dashboard",
  //   name: "dashboard",
  //   component: DashboardView,
  // },
  {
    path: "/posts",
    name: "posts",
    component: PostsView,
  },
  {
    path: "/post/:id",
    name: "post",
    component: Post,
  },
  {
    path: "/albums",
    name: "albums",
    component: AlbumsView,
  },
  {
    path: "/photos",
    name: "photos",
    component: PhotosView,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
