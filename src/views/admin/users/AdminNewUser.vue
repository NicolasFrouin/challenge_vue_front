<script setup lang="ts">
import { NewRessource } from '@/components/admin';
import { Role } from '@/types/user';
import { SfInput, SfSelect } from '@storefront-ui/vue';
import { reactive } from 'vue';
import { z } from 'zod';

const data = reactive({
  email: '',
  password: '',
  role: '',
  firstname: '',
  lastname: '',
});

const errors = reactive({
  email: '',
  password: '',
  role: '',
  firstname: '',
  lastname: '',
});

function validate() {
  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for (const key in errors) {
    errors[key as keyof typeof errors] = '';
  }

  const check = z
    .object({
      email: z.string().email("L'email est invalide"),
      password: z
        .string()
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\s\w])[^\s]{12,63}$/,
          'Le mot de passe doit contenir au moins 12 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial',
        ),
      role: z.enum([Role.Admin, Role.Accountant, Role.User], { message: 'Le rôle est invalide' }),
      firstname: z.string().min(3, 'Le prénom doit contenir au moins 3 caractères'),
      lastname: z.string().min(3, 'Le nom doit contenir au moins 3 caractères'),
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
    <NewRessource ressource="users" :data="data" @validate="validate" title="Nouvel utilisateur">
      <div class="field">
        <label for="email">Email</label>
        <SfInput v-model="data.email" id="email" type="email" />
        <p class="text-red-500" v-if="errors.email">{{ errors.email }}</p>
      </div>
      <div class="field">
        <label for="firstname">Prénom</label>
        <SfInput v-model="data.firstname" id="firstname" />
        <p class="text-red-500" v-if="errors.firstname">{{ errors.firstname }}</p>
      </div>
      <div class="field">
        <label for="lastname">Nom de famille</label>
        <SfInput v-model="data.lastname" id="lastname" />
        <p class="text-red-500" v-if="errors.lastname">{{ errors.lastname }}</p>
      </div>
      <div class="field">
        <label for="password">Mot de passe</label>
        <SfInput v-model="data.password" id="password" />
        <p class="text-red-500" v-if="errors.password">{{ errors.password }}</p>
      </div>
      <div class="field">
        <label for="role">Rôle</label>
        <SfSelect v-model="data.role" id="role">
          <option v-for="[value, key] in Object.entries(Role)" :key="key" :value="key">{{ value }}</option>
        </SfSelect>
        <p class="text-red-500" v-if="errors.role">{{ errors.role }}</p>
      </div>
    </NewRessource>
  </div>
</template>

<style lang="postcss" scoped>
.field {
  margin-bottom: 1rem;
}
</style>
