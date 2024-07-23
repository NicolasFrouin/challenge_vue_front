<template>
  <footer class="bg-gray-900 text-gray-300 py-8">
    <div class="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
      <!-- Left Section -->
      <div class="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
        <img src="@/components/img/only_cans.jpg" alt="OnlyCans Logo" class="w-24 h-24">
        <div>
          <p>27 Rue Jean Moulin, Paris</p>
          <p>75014</p>
          <p>01.86.57.45.25</p>
          <p><a href="mailto:contact.onlycans@gmail.com" class="underline">contact.onlycans@gmail.com</a></p>
        </div>
      </div>

      <!-- Center Section -->
      <div class="flex space-x-8">
        <a href="#" class="hover:underline">About</a>
        <a href="#" class="hover:underline">Growers</a>
        <a href="#" class="hover:underline">Merchants</a>
        <a href="#" class="hover:underline">Partners</a>
        <a href="#" class="hover:underline">Contact</a>
        <a href="/confidentialite" class="hover:underline">Politique de confidentialité</a>
      </div>

      <!-- Right Section -->
      <div class="flex space-x-4 items-center">
        <SfButton
          v-for="{ label, link, icon } in socialMedia"
          :key="label"
          tag="a"
          square
          variant="tertiary"
          class="w-10 h-10 bg-white text-gray-900 rounded-full flex items-center justify-center hover:bg-neutral-500"
          :href="link"
          :aria-label="`Go to ${label} page`"
        >
          <component :is="icon" />
        </SfButton>
      </div>
    </div>
    <div class="container mx-auto text-center mt-8">
      <p>&copy; 2024 OnlyCans. Tout droit réservées.</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import {
  SfIconFacebook,
  SfIconInstagram,
  SfIconTwitter,
  SfIconPinterest,
  SfIconYoutube,
  SfButton
} from '@storefront-ui/vue';

const socialMedia = [
  {
    label: 'Facebook',
    link: '#',
    icon: SfIconFacebook,
  },
  {
    label: 'Twitter',
    link: '#',
    icon: SfIconTwitter,
  },
  {
    label: 'Instagram',
    link: '#',
    icon: SfIconInstagram,
  },
  {
    label: 'Pinterest',
    link: '#',
    icon: SfIconPinterest,
  },
  {
    label: 'Youtube',
    link: '#',
    icon: SfIconYoutube,
  },
];
</script>

<style scoped>
/* Add any additional styles here */
</style>
