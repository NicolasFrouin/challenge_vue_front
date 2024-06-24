import type { User } from '@/types/user';
import { defineStore, storeToRefs } from 'pinia';
import { ref } from 'vue';

const authStore = defineStore('auth', () => {
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

  return {
    token,
    user,
    login,
    logout,
    isLoggedIn,
  };
});

const instance = authStore();

const useAuthStore = () => ({
  ...instance,
  ...storeToRefs(instance),
});

export default useAuthStore;
