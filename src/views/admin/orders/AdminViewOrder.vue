<script setup lang="ts">
import { AppLoading } from '@/components/main';
import useAuthStore from '@/stores/auth';
import { apiRoutes, useRefStore, useRequest } from '@/utils';
import { useRouter } from 'vue-router';

const router = useRouter();
const id = router.currentRoute.value.query.id as string;

const { token } = useRefStore(useAuthStore());

const { resData, isLoading } = useRequest<any>({
  url: apiRoutes.orders.byId(id),
  // @ts-expect-error
  headers: { Authorization: `Bearer ${token.value}` },
});
</script>

<template>
  <AppLoading v-if="isLoading" />
  <div v-else>
    <button type="button" @click="$router.back()" class="bg-primary-500 text-white p-2 rounded-md mb-2 inline-block">
      Retour
    </button>
    <div>
      <div class="bg-white rounded-lg shadow-md p-4">
        <h2 class="text-lg font-semibold mb-2">Détails</h2>
        <p><span class="font-semibold">ID de commande :</span> {{ resData._id }}</p>
        <p><span class="font-semibold">ID utilisateur :</span> {{ resData.userId }}</p>
        <p><span class="font-semibold">Statut :</span> {{ resData.status }}</p>
        <p><span class="font-semibold">Créée le :</span> {{ resData.createdAt }}</p>
      </div>
      <div class="bg-white rounded-lg shadow-md p-4 mt-4">
        <h2 class="text-lg font-semibold mb-2">Lignes de commande</h2>
        <div v-for="line in resData.lines" :key="line.id" class="border-b py-2">
          <p><span class="font-semibold">Produit :</span> {{ line.Product.name }}</p>
          <p><span class="font-semibold">Quantité :</span> {{ line.quantity }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
