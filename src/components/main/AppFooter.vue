<template>
  <footer class="colorbackground text-gray-300 py-8">
    <div class="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
      <!-- Left Section -->
      <div class="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
        <img src="@/components/img/only_cans.jpg" alt="OnlyCans Logo" class="w-24 h-24" />
        <div>
          <p>27 Rue Jean Moulin, Paris</p>
          <p>75014</p>
          <p>
            <a href="tel:+186574525">01 86 57 45 25</a>
          </p>
          <p>
            <a href="mailto:contact.onlycans@gmail.com" class="underline">contact.onlycans@gmail.com</a>
          </p>
        </div>
      </div>

      <!-- Center Section -->
      <div class="flex space-x-8">
        <RouterLink to="/cgv" class="hover:underline">Conditions Générales de Vente</RouterLink>
        <RouterLink to="/cgu" class="hover:underline">Conditions Générales d'Utilisation (CGU)</RouterLink>
        <RouterLink to="/confidentialite" class="hover:underline">Politique de confidentialité</RouterLink>
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
      <p>&copy; 2024 OnlyCans. Tous droits réservés.</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { SfIconFacebook, SfIconInstagram, SfIconTwitter, SfButton } from '@storefront-ui/vue';
import { RouterLink } from 'vue-router';

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
];
</script>

<style scoped>
.colorbackground {
  background-color: #253131;
}
</style>
