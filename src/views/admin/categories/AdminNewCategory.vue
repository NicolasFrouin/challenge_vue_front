<script setup lang="ts">
import { NewRessource } from '@/components/admin';
import { SfInput, SfSelect } from '@storefront-ui/vue';
import { reactive } from 'vue';
import { z } from 'zod';

const data = reactive({
  name: '',
  description: '',
  status: '',
});

const errors = reactive({
  name: '',
  description: '',
  status: '',
});

function validate() {
  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for (const key in errors) {
    errors[key as keyof typeof errors] = '';
  }

  const check = z
    .object({
      name: z.string().min(3, 'Le nom doit contenir au moins 3 caractères'),
      description: z.string().min(3, 'La description doit contenir au moins 3 caractères'),
      status: z.enum(['0', '1'], { message: 'Le statut est invalide' }),
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
    <NewRessource ressource="categories" :data="data" @validate="validate" title="Nouvelle catégorie">
      <div class="field">
        <label for="name">Nom</label>
        <SfInput v-model="data.name" id="name" />
        <p class="text-red-500" v-if="errors.name">{{ errors.name }}</p>
      </div>
      <div class="field">
        <label for="description">Description</label>
        <SfInput v-model="data.description" id="description" />
        <p class="text-red-500" v-if="errors.description">{{ errors.description }}</p>
      </div>
      <div class="field">
        <label for="status">Statut</label>
        <SfSelect v-model="data.status" id="status">
          <option
            v-for="status in [
              { id: '0', name: 'Inactif' },
              { id: '1', name: 'Actif' },
            ]"
            :key="status.id"
            :value="status.id"
          >
            {{ status.name }}
          </option>
        </SfSelect>
        <p class="text-red-500" v-if="errors.status">{{ errors.status }}</p>
      </div>
    </NewRessource>
  </div>
</template>

<style lang="postcss" scoped>
.field {
  margin-bottom: 1rem;
}
</style>
