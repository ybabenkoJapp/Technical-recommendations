import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PostsView from "@/views/PostsView.vue";
import AlbumsView from "@/views/AlbumsView.vue";
import PhotosView from "@/views/PhotosView.vue";
import PostView from "@/views/PostView.vue";
import { useAuthStore } from "@/stores";
import Login from "@/views/Login.vue";

export const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/posts",
    name: "posts",
    component: PostsView,
    meta: { requiresAuth: true },
  },
  // TODO add dynamic post
  {
    path: "/posts/:id",
    name: "post",
    component: PostView,
    meta: { requiresAuth: true },
  },
  {
    path: "/albums",
    name: "albums",
    component: AlbumsView,
    meta: { requiresAuth: true },
  },
  {
    path: "/photos",
    name: "photos",
    component: PhotosView,
    meta: { requiresAuth: true },
  },
  {
    path: "/users",
    name: "users",
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  // Check if the route requires authentication
  if (to.meta.requiresAuth) {
    // Check if the user is authenticated
    if (!authStore.isAuthenticated) {
      // Redirect to login page if not authenticated
      next({ name: "login" });
    } else if (to.meta.editorOnly && authStore.getCurrentUser !== "editor") {
      // Redirect to home if user is not an editor but tries to access an editor-only route
      next({ name: "home" });
    } else {
      // Continue to the requested route
      next();
    }
  } else {
    // Continue to the requested route
    next();
  }
});

export default router;
