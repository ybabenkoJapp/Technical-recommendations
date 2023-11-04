import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PostsView from "@/views/PostsView.vue";
import AlbumsView from "@/views/AlbumsView.vue";
import PhotosView from "@/views/PhotosView.vue";

const Post = {
  template: '<div>User</div>',
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/dashboard",
      name: "dashboard", // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/DashboardView.vue"),
    },
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
  ],
});

export default router;
