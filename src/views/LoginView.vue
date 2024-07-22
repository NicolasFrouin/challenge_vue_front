<script setup lang="ts">
/* eslint-disable import/no-cycle */
import { ref } from 'vue';
import axios from 'axios';
import { apiRoutes } from '@/utils/apiRoutes';
import { useRefStore } from '@/utils/refStore';
import useAuthStore from '@/stores/auth';
import { RouterLink, useRouter } from 'vue-router';
import { routes } from '@/router';
import { Role } from '@/types/user';

const { emailLogin, hasRights } = useRefStore(useAuthStore());

const router = useRouter();

const username = ref('');
const password = ref('');
const error = ref('');

const handleSubmit = async () => {
  try {
    const response = await axios({
      method: 'POST',
      url: apiRoutes.auth.login,
      data: {
        email: username.value,
        password: password.value,
      },
    })
      .then(({ data }) => data)
      .catch((err) => (error.value = err));
    if (response) {
      const { accessToken, id, role, email } = response;
      emailLogin(accessToken, { id, role, email });
      if (hasRights(Role.Accountant)) router.push({ name: routes.admin.name });
      else router.push({ name: routes.account.name });
    }
  } catch (err) {
    error.value = 'Email ou mot de passe incorrect';
  }
};
</script>

<template>
  <div class="login-container">
    <div class="login-form" style="width: 60%; padding-left: 5em">
      <h2 class="titreprincip">Bonjour !</h2>
      <form @submit.prevent="handleSubmit" class="form_size">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="username" required placeholder="Entrez votre email" />
        </div>
        <div class="form-group">
          <label for="password">Mot de passe</label>
          <div class="password-container">
            <input type="password" id="password" v-model="password" required placeholder="Entrez votre mot de passe" />
          </div>
          <!-- <a href="#" class="forgot-password">Mot de passe oublié</a> -->
        </div>
        <div v-if="error">
          <p style="color: red">{{ error }}</p>
        </div>
        <button type="submit" class="login-button" style="background-color: darkgreen">Login</button>
      </form>
      <p class="signup-text">
        Vous n'avez pas de compte ?
        <RouterLink :to="$router.resolve({ name: routes.register.name })">S'inscrire</RouterLink>
      </p>
    </div>
    <div class="login-image">
      <img
        src="../components/img/Background_login.webp"
        alt="Only Cans"
        style="width: 100%; background-size: cover; height: 100%"
      />
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  height: 100vh;
  background-color: #f9f9f9;
}

.login-form {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0 50px;
}

h2 {
  font-size: 2rem;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
  width: 100%;
}

label {
  display: block;
  margin-bottom: 5px;
  font-size: 0.9rem;
}

.titreprincip {
  margin-bottom: 2em;
}

.form_size {
  width: 65%;
}

input[type='email'],
input[type='password'] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

.password-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.forgot-password {
  font-size: 0.8rem;
  color: #007bff;
  text-decoration: none;
}

.forgot-password:hover {
  text-decoration: underline;
}

.login-button {
  width: 100%;
  padding: 10px;
  background-color: #4caf50;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 20px;
}

.login-button:hover {
  background-color: #45a049;
}

.signup-text {
  margin-top: 20px;
  font-size: 0.9rem;
  text-align: center;
}

.signup-text a {
  color: #007bff;
  text-decoration: none;
}

.signup-text a:hover {
  text-decoration: underline;
}

.login-image {
  flex: 1;
  background-color: #eaeaea;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden; /* Empêche l'image de dépasser */
}

.login-image img {
  max-width: 100%;
  height: auto;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}
</style>
