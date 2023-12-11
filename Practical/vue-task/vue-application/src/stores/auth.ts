import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    _isAuthenticated: false,
    currentUser: "",
  }),
  getters: {
    getCurrentUser: (state) => state.currentUser,
    isAuthenticated: (state) => state._isAuthenticated,
  },
  actions: {
    async login(username: string) {
      try {
        const response = await axios(`users/?username=${username}`);
        if (
          response.data?.length > 0 &&
          response.data?.[0].username === username
        ) {
          this.currentUser = username;
          this._isAuthenticated = true;
        } else {
          return Promise.reject("Invalid credentials");
        }
      } catch (error) {
        console.error("[Error happened during login]", error);
        return Promise.reject("Login failed");
      }
    },
    setCurrentUser(username: string) {
      this.currentUser = username;
    },
    setAuthenticated(value: boolean) {
      this._isAuthenticated = value;
    },
    logout() {
      this.currentUser = "";
      this._isAuthenticated = false;
    },
  },
});