<script setup lang="ts">
import { ref } from 'vue';
import { setCookie, getCookie } from '@/utils/cookie';

const showPopup = ref(!getCookie('cookieConsent'));
const cooldown = 1440; //1 jour en minute

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
    <div class="bg-white p-4 rounded-md shadow-md">
      <p>Afin de pouvoir accéder à nos contenus voulez-vous accepter les cookies ?</p>
      <div class="mt-4 flex justify-end">
        <button @click="rejectCookies" class="mr-2 px-4 py-2 bg-red-500 text-white rounded-md">No</button>
        <button @click="acceptCookies" class="px-4 py-2 bg-blue-500 text-white rounded-md">Yes</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Ajoutez des styles personnalisés ici */
</style>
