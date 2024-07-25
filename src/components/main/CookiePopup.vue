<script setup lang="ts">
import { ref } from 'vue';
import { setCookie, getCookie } from '@/utils/cookie';

const showPopup = ref(!getCookie('cookieConsent'));
const cooldown = 1440; // 1 jour en minute

const acceptCookies = () => {
  setCookie('cookieConsent', 'accepted', cooldown);
  showPopup.value = false;
};

const rejectCookies = () => {
  setCookie('cookieConsent', 'rejected', cooldown);
  showPopup.value = false;
};
</script>

<template>
  <div v-if="showPopup" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
    <div class="bg-white p-4 rounded-md shadow-md w-96">
      <p class="font-semibold text-lg">À propos des cookies</p>
      <p class="my-2">Ce site utilise des cookies pour vous offrir une meilleure expérience utilisateur.</p>
      <p>En continuant à naviguer sur ce site, vous acceptez l'utilisation de cookies.</p>
      <div class="mt-4 flex justify-end">
        <button
          type="button"
          @click="rejectCookies"
          class="mr-2 px-4 py-2 bg-red-500 text-white rounded-md leading-normal font-normal"
        >
          Refuser
        </button>
        <button
          type="button"
          @click="acceptCookies"
          class="px-4 py-2 bg-blue-500 text-white rounded-md leading-normal font-normal"
        >
          Accepter
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Ajoutez des styles personnalisés ici */
</style>
