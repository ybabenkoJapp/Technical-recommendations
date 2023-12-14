import { defineStore } from "pinia";
import axios from "axios";
import { useUserStore } from "@/stores/users";
import type { IUser } from "@/app-types/IUser";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    _isAuthenticated: false,
    currentUser: "",
    token: null,
  }),
  getters: {
    getCurrentUser: (state) => state.currentUser,
    isAuthenticated: (state) => state._isAuthenticated,
  },
  actions: {
    setCurrentUser(username: string) {
      this.currentUser = username;
    },
    setAuthenticated(value: boolean) {
      this._isAuthenticated = value;
    },
    async login(username: string) {
      const userStore = useUserStore();
      try {
        const response = await axios<IUser[]>(`users/?username=${username}`);
        if (
          response.data?.length > 0 &&
          response.data?.[0].username === username
        ) {
          userStore.user = response.data?.[0];
          this.setCurrentUser(username);
          this.setAuthenticated(true);
          const user = {
            id: response.data?.[0]?.id,
            username: response.data?.[0]?.username,
            role: "user",
          };
          const token = this.createFakeToken(user);
          this.token = token;
          sessionStorage.setItem("token", token);
        } else {
          return Promise.reject("Invalid credentials");
        }
      } catch (error) {
        console.error("[Error happened during login]", error);
        return Promise.reject("Login failed");
      }
    },
    logout() {
      const userStore = useUserStore();
      userStore.user = {} as IUser;
      this.currentUser = "";
      this._isAuthenticated = false;
      this.token = null;
      sessionStorage.removeItem("token");
    },
    createFakeToken(userData) {
      const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
      const payload = btoa(JSON.stringify(userData));
      const secretKey = "ha-ha-ha-fake-secret-key";
      const signature = btoa(
        new TextEncoder().encode(`${header}.${payload}.${secretKey}`),
      );
      return `${header}.${payload}.${signature}`;
    },
  },
});
