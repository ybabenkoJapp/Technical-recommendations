import { defineStore } from "pinia";
import type { IUser } from "@/app-types/IUser";

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
});
