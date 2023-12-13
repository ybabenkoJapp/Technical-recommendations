import { defineStore } from "pinia";
import type { IUser } from "@/app-types/IUser";
import axios from "axios";

export const useUserStore = defineStore("user", {
  state() {
    return {
      users: [] as IUser[],
      user: {} as IUser,
    };
  },
  getters: {
    getUsers: (state) => state.users,
    getUser: (state) => state.user,
  },
  actions: {
    async fetchAllUsers() {
      try {
        const response = await axios("users");
        if (response.status === 200) {
          console.log(response.data);
          this.setUsers(response.data);
        }
      } catch (e) {}
    },

    setUser(user: IUser) {
      this.user = user;
    },

    setUsers(users: IUser[]) {
      this.users.push(...this.users, ...users);
    },
  },
});
