<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import useAuthStore from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();
const users = ref([
  { id: 1, firstName: 'Yves', lastName: 'MU', email: 'yves@example.com', role: 'user' },
  { id: 2, firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@example.com', role: 'admin' },
  { id: 3, firstName: 'John', lastName: 'Smith', email: 'john.smith@example.com', role: 'user' }
]);

const newUser = reactive({
  id: null,
  firstName: '',
  lastName: '',
  email: '',
  role: 'user'
});

const showModal = ref(false);
const isEditing = ref(false);

const openModal = (user = null) => {
  if (user) {
    isEditing.value = true;
    Object.assign(newUser, user);
  } else {
    isEditing.value = false;
    newUser.id = null;
    newUser.firstName = '';
    newUser.lastName = '';
    newUser.email = '';
    newUser.role = 'user';
  }
  showModal.value = true;
};

const saveUser = () => {
  if (isEditing.value) {
    const index = users.value.findIndex(user => user.id === newUser.id);
    if (index !== -1) {
      Object.assign(users.value[index], newUser);
    }
  } else {
    const maxId = users.value.reduce((max, user) => (user.id > max ? user.id : max), 0);
const id = maxId + 1;
    users.value.push({ id, ...newUser });
  }
  showModal.value = false;
  
};

const deleteUser = (id) => {
  users.value = users.value.filter(user => user.id !== id);
};

/*onMounted(async () => {
  if (!authStore.isLoggedIn()) {
    const loggedIn = await authStore.jwtLogin();
    if (!loggedIn || authStore.user?.role !== 'admin') {
      router.push({ name: 'admin-login' });
      return;
    }
  } else if (authStore.user?.role !== 'admin') {
    router.push({ name: 'admin-login' });
    return;
  }
});*/

</script>

<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <h1 class="text-2xl mb-4">Admin Dashboard</h1>

    
    <button @click="openModal()" class="mb-4 py-2 px-4 bg-green-700 text-white rounded-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">Ajouter un utilisateur</button>

    <table class="min-w-full bg-white">
      <thead>
        <tr>
          <th class="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">ID</th>
          <th class="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">First Name</th>
          <th class="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Last Name</th>
          <th class="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Email</th>
          <th class="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Role</th>
          <th class="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td class="py-2 px-4 border-b border-gray-200">{{ user.id }}</td>
          <td class="py-2 px-4 border-b border-gray-200">{{ user.firstName }}</td>
          <td class="py-2 px-4 border-b border-gray-200">{{ user.lastName }}</td>
          <td class="py-2 px-4 border-b border-gray-200">{{ user.email }}</td>
          <td class="py-2 px-4 border-b border-gray-200">{{ user.role }}</td>
          <td class="py-2 px-4 border-b border-gray-200">
            <button @click="openModal(user)" class="mr-2 py-1 px-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Modifier</button>
            <button @click="deleteUser(user.id)" class="py-1 px-3 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Add/Edit User Modal -->
    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div class="bg-white p-6 rounded-md shadow-md w-full max-w-md">
        <h2 class="text-xl mb-4">{{ isEditing.value ? 'Modifier l\'utilisateur' : 'Ajouter un utilisateur' }}</h2>
        <div class="mb-4">
          <label for="firstName" class="block text-sm font-medium text-gray-700">Prénom</label>
          <input type="text" id="firstName" v-model="newUser.firstName" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" />
        </div>
        <div class="mb-4">
          <label for="lastName" class="block text-sm font-medium text-gray-700">Nom</label>
          <input type="text" id="lastName" v-model="newUser.lastName" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" id="email" v-model="newUser.email" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" />
        </div>
        <div class="flex justify-end">
          <button @click="saveUser" class="mr-2 py-2 px-4 bg-green-700 text-white rounded-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">{{ isEditing.value ? 'Enregistrer' : 'Ajouter' }}</button>
          <button @click="showModal = false" class="py-2 px-4 bg-gray-700 text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">Annuler</button>
        </div>
      </div>
    </div>
  </div>
</template>