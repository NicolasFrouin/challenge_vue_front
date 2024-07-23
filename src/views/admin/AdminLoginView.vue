<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import useAuthStore from '@/stores/auth';

const username = ref('');
const password = ref('');
const error = ref('');
const router = useRouter();
const authStore = useAuthStore();

const handleLogin = async () => {
  try {
    const response = await axios.post('/api/admin/login', {
      username: username.value,
      password: password.value
    });
    const { token, user } = response.data;
    authStore.emailLogin(token, user);
    router.push({ name: 'admin-dashboard' });
  } catch (err) {
    error.value = 'Login failed. Please try again.';
  }
};
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-6 bg-white rounded-md shadow-md">
      <h2 class="mb-4 text-2xl">Admin Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
          <input type="text" id="username" v-model="username" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input type="password" id="password" v-model="password" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" />
        </div>
        <div v-if="error" class="mb-4 text-red-600">{{ error }}</div>
        <button type="submit" class="w-full py-2 px-4 bg-green-700 text-white rounded-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">Login</button>
      </form>
    </div>
  </div>
</template>
