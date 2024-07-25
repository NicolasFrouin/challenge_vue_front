<script setup lang="ts">
import { NewRessource } from '@/components/admin';
import type { Category } from '@/types/category';
import { apiRoutes, useRequest } from '@/utils';
import { SfInput, SfSelect } from '@storefront-ui/vue';
import { reactive } from 'vue';
import { z } from 'zod';

const data = reactive({
  name: '',
  price: 0,
  description: '',
  tax: 0,
  stockReal: 0,
  category: '',
});

const errors = reactive({
  name: '',
  price: '',
  description: '',
  tax: '',
  stockReal: '',
  category: '',
});

const { resData: categories } = useRequest<Category[]>({ url: apiRoutes.categories.all });

function validate() {
  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for (const key in errors) {
    errors[key as keyof typeof errors] = '';
  }

  const check = z
    .object({
      name: z.string().min(3, 'Le nom doit contenir au moins 3 caractères'),
      price: z.number().min(0, 'Le prix doit être positif'),
      description: z.string().min(3, 'La description doit contenir au moins 3 caractères'),
      tax: z.number().min(0, 'La taxe doit être positive'),
      stockReal: z.number().min(0, 'Le stock doit être positif'),
      category: z.string().uuid('La catégorie est invalide'),
    })
    .safeParse(data);

  if (check.error) {
    check.error.errors.forEach((err) => {
      errors[err.path[0] as keyof typeof errors] = err.message;
    });
    throw new Error('Invalid data');
  }
}
</script>

<template>
  <div>
    <NewRessource ressource="products" :data="data" @validate="validate" title="Nouveau produit">
      <div class="field">
        <label for="name">Nom</label>
        <SfInput v-model="data.name" id="name" />
        <p class="text-red-500" v-if="errors.name">{{ errors.name }}</p>
      </div>
      <div class="field">
        <label for="price">Prix</label>
        <SfInput v-model="data.price" id="price" type="number" />
        <p class="text-red-500" v-if="errors.price">{{ errors.price }}</p>
      </div>
      <div class="field">
        <label for="description">Description</label>
        <SfInput v-model="data.description" id="description" />
        <p class="text-red-500" v-if="errors.description">{{ errors.description }}</p>
      </div>
      <div class="field">
        <label for="tax">Taxe</label>
        <SfInput v-model="data.tax" id="tax" type="number" />
        <p class="text-red-500" v-if="errors.tax">{{ errors.tax }}</p>
      </div>
      <div class="field">
        <label for="stockReal">Stock</label>
        <SfInput v-model="data.stockReal" id="stockReal" type="number" />
        <p class="text-red-500" v-if="errors.stockReal">{{ errors.stockReal }}</p>
      </div>
      <div class="field">
        <label for="category">Catégorie</label>
        <SfSelect v-model="data.category" id="category">
          <option v-for="categ in categories" :key="categ.id" :value="categ.id">{{ categ.name }}</option>
        </SfSelect>
        <p class="text-red-500" v-if="errors.category">{{ errors.category }}</p>
      </div>
    </NewRessource>
  </div>
</template>

<style lang="postcss" scoped>
.field {
  margin-bottom: 1rem;
}
</style>
