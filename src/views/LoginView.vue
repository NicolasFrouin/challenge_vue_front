<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import useAuthStore from '@/stores/auth';

const username = ref('');
const password = ref('');
const error = ref('');
const router = useRouter();
const authStore = useAuthStore();

const handleLogin = async () => {
  const success = authStore.emailLogin(username.value, password.value);
  if (success) {
    router.push({ name: 'admin-dashboard' });
  } else {
    error.value = 'Login failed. Please try again.';
  }
};
</script>

<template>
  <div class="flex flex-col md:flex-row h-screen bg-gray-100">
    <div class="flex flex-col justify-center items-center p-6 w-full md:w-1/2 h-full">
      <div class="w-full max-w-md">
        <h2 class="text-2xl mb-4 text-left">Bonjour</h2>
        <form @submit.prevent="handleLogin" class="w-full">
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              v-model="username"
              required
              placeholder="Entrez votre email"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>
          <div class="mb-4">
            <label for="password" class="block text-sm font-medium text-gray-700">Mot de passe</label>
            <div class="flex items-center mt-1">
              <input
                type="password"
                id="password"
                v-model="password"
                required
                placeholder="Entrez votre mot de passe"
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              />
            </div>
            <a href="#" class="text-sm text-green-700 hover:underline mt-2 block">Mot de passe oublié</a>
          </div>
          <div v-if="error" class="mb-4">
            <p class="text-red-600">{{ error }}</p>
          </div>
          <button
            type="submit"
            class="w-full py-2 px-4 bg-green-700 text-white rounded-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
    <div class="hidden md:flex flex-1 bg-gray-200 justify-center items-center overflow-hidden w-full md:w-1/2 h-full">
      <img src="../components/img/Background_login.webp" alt="Background Image" class="object-cover w-full h-full" />
    </div>
  </div>
</template>
