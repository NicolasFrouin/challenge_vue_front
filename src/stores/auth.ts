// eslint-disable-next-line import/no-cycle
import { routes } from '@/router';
import type { User } from '@/types';
import type { Role } from '@/types/user';
import { apiRoutes } from '@/utils/apiRoutes';
import axios from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const useAuthStore = defineStore('auth', () => {
  const router = useRouter();
  const token = ref<string | null>(null);
  const user = ref<User | null>(null);

  function getToken() {
    return window.document.cookie
      .split('; ')
      .find((row) => row.startsWith('jwt='))
      ?.split('=')[1];
  }

  function setToken(jwt: string) {
    token.value = jwt;
    window.document.cookie = `jwt=${jwt}; path=/; max-age=86400`;
  }

  function removeToken() {
    token.value = null;
    window.document.cookie = 'jwt=; path=/; max-age=0';
  }

  async function jwtLogin() {
    const jwt = getToken();
    if (jwt) {
      token.value = jwt;
      // Fetch user data
      const response = await axios({
        url: apiRoutes.auth.me,
        headers: { Authorization: `Bearer ${jwt}` },
      })
        .then(({ data }) => data)
        .catch(() => null);
      if (response) {
        const { id, email, role } = response;
        user.value = { id, email, role };
        return true;
      }
      removeToken();
    }
    return false;
  }

  function emailLogin(newToken: string, newUser: User) {
    setToken(newToken);
    user.value = newUser;
  }

  function logout() {
    if (router.currentRoute.value.meta.requiresAuth) {
      router.push({ name: routes.login.name });
    }
    removeToken();
    user.value = null;
  }

  function isLoggedIn() {
    return token.value !== null && user.value !== null && token.value === getToken();
  }

  function hasRights(role: Role) {
    return user.value !== null && user.value.role >= role;
  }

  return {
    token,
    user,
    emailLogin,
    jwtLogin,
    logout,
    isLoggedIn,
    hasRights,
  };
});

export default useAuthStore;
