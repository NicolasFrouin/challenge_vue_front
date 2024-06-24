import { defineStore } from "pinia";
import { ref } from "vue";

export type User = {
  id: number;
  name: string;
  email: string;
};

export const useAuthStore = defineStore("auth", () => {
  const token = ref<string | null>(null);
  const user = ref<User | null>(null);

  function login(newToken: string, newUser: User) {
    token.value = newToken;
    user.value = newUser;
  }

  function logout() {
    token.value = null;
    user.value = null;
  }

  function isLoggedIn() {
    return token.value !== null;
  }

  return { token, user, login, logout, isLoggedIn };
});
