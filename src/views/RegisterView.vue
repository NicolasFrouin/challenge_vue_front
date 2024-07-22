<script setup lang="ts">
/* eslint-disable import/no-cycle */
import { AppLoading } from '@/components/main';
import { routes } from '@/router';
import type { User } from '@/types';
import { useRequest } from '@/utils';
import { apiRoutes } from '@/utils/apiRoutes';
import { computed, reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const formData = reactive<{
  email: string;
  password: string;
  confirmPassword: string;
  error: Error | null;
}>({
  email: '',
  password: '',
  confirmPassword: '',
  error: null,
});

const formErrors = reactive<{
  email: boolean | null;
  password: boolean | null;
  confirmPassword: boolean | null;
}>({
  email: null,
  password: null,
  confirmPassword: null,
});

const { error, isLoading, resData, sendRequest } = useRequest<User>(
  {
    url: apiRoutes.auth.register,
    method: 'POST',
    data: formData,
  },
  false,
);

async function handleSubmit() {
  if (!formData.email || !formData.password || !formData.confirmPassword) {
    formErrors.email = !formData.email;
    formErrors.password = !formData.password;
    formErrors.confirmPassword = !formData.confirmPassword;
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    formErrors.email = true;
    return;
  }
  if (formData.password.localeCompare(formData.confirmPassword) !== 0) {
    formErrors.confirmPassword = true;
    return;
  }
  await sendRequest();
  if (error.value) {
    formData.error = error.value;
  }
  if (resData.value) {
    router.push({ name: routes.login.name });
  }
}

const printErrors = computed(() => {
  return Object.keys(formErrors)
    .map((key) => {
      if (formErrors[key as keyof typeof formErrors] === true) {
        return `${key} is required`;
      }
      if (formErrors[key as keyof typeof formErrors] === null) {
        return '';
      }
      return `${key} is invalid`;
    })
    .filter((err) => err)
    .join(', ');
});
</script>

<template>
  <!-- eslint-disable vuejs-accessibility/label-has-for -->
  <div>
    <h1>Register</h1>
    <AppLoading v-if="isLoading" />
    <form v-else @submit.prevent="handleSubmit" class="w-1/2 flex justify-center flex-col mx-auto">
      <div>
        <label for="email" class="required">Email</label>
        <input type="email" id="email" v-model="formData.email" required placeholder="Enter your email" />
      </div>
      <div>
        <label for="password" class="required">Password</label>
        <input type="password" id="password" v-model="formData.password" required placeholder="Enter your password" />
      </div>
      <div>
        <label for="confirmPassword" class="required">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          v-model="formData.confirmPassword"
          required
          placeholder="Confirm your password"
        />
      </div>
      <div v-if="printErrors" class="mb-2">
        <p class="text-red-500">{{ printErrors }}</p>
      </div>
      <button type="submit" class="bg-green-500 text-white p-2 rounded">Register</button>
    </form>
  </div>
</template>

<style lang="postcss">
.required {
  @apply after:content-['*'] after:text-red-700 after:ml-1;
}
input {
  @apply w-full p-2 my-2 border border-gray-300 rounded;
}
</style>
