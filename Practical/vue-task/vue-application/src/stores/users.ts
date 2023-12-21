import { defineStore } from "pinia";
import type { IUser } from "@/app-types/IUser";
import axios from "axios";

export const useUserStore = defineStore("user", {
  state(): {
    users: IUser[];
    user: IUser | null;
    role: string;
  } {
    return {
      users: [],
      user: null,
      role: "",
    };
  },
  getters: {
    getUsers: (state) => state.users,
    getUser: (state) => state.user,
    getUserRole: (state) => state.role,
  },
  actions: {
    async fetchAllUsers() {
      try {
        const response = await axios("users");
        if (response.status === 200) {
          this.setUsers(response.data);
        }
      } catch (e) {
        console.error(e);
      }
    },

    setUser(user: IUser | null, role: string) {
      this.user = user;
      this.role = role;

      if (!sessionStorage.getItem("role")) {
        sessionStorage.setItem("role", role);
      } else {
        sessionStorage.removeItem("role");
        sessionStorage.setItem("role", role);
      }

      if (!sessionStorage.getItem("user")) {
        sessionStorage.setItem("user", JSON.stringify(user));
      } else {
        sessionStorage.removeItem("user");
        sessionStorage.setItem("user", JSON.stringify(user));
      }
    },

    setUsers(users: IUser[]) {
      if (users.length) {
        this.users.push(...users);
        if (!sessionStorage.getItem("users")) {
          sessionStorage.setItem("users", JSON.stringify(this.users));
        } else {
          sessionStorage.removeItem("users");
          sessionStorage.setItem("users", JSON.stringify(this.users));
        }
      } else {
        this.users = [];
      }
    },
  },
});
