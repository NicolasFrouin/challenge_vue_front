/* eslint-disable import/no-cycle */
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import { company } from '@/mocks';
import useAuthStore from '@/stores/auth';
import { Role } from '@/types/user';
import HomeView from '../views/HomeView.vue';

export const routes = {
  home: {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: 'Accueil' },
  },
  search: {
    path: '/search',
    name: 'search',
    component: () => import('../views/SearchView.vue'),
    meta: { title: 'Résultats de recherche' },
  },
  productDetails: {
    path: '/product/:slug',
    name: 'product-details',
    component: () => import('../views/ProductDetailsView.vue'),
    meta: { title: 'Détails de produit' },
  },
  login: {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
    meta: { title: 'Connexion' },
  },
  register: {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue'),
    meta: { title: 'Créer un compte' },
  },
  about: {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
    meta: { title: 'À props' },
  },
  cart: {
    path: '/cart',
    name: 'cart',
    component: () => import('../views/CartView.vue'),
    meta: { title: 'Panier' },
  },
  account: {
    path: '/account',
    name: 'account',
    component: () => import('../views/user/AccountView.vue'),
    meta: { title: 'Mon compte', requiresAuth: Role.User },
  },
  checkout: {
    path: '/checkout',
    name: 'checkout',
    component: () => import('../views/user/CheckoutView.vue'),
    meta: { title: 'Paiement', requiresAuth: Role.User },
  },
  admin: {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/admin/AdminView.vue'),
    meta: { title: 'Accueil administrateur', requiresAuth: Role.Accountant },
    children: [
      {
        path: '',
        name: 'admin-home',
        component: () => import('../views/admin/AdminDashboard.vue'),
        meta: { title: 'Accueil administrateur', requiresAuth: Role.Accountant },
      },
      {
        path: 'products',
        name: 'admin-products',
        children: [
          {
            path: '',
            name: 'admin-products-list',
            component: () => import('../views/admin/products/AdminProducts.vue'),
            meta: { title: 'Liste de produits', requiresAuth: Role.Accountant },
          },
          {
            path: 'new',
            name: 'admin-products-new',
            component: () => import('../views/admin/products/AdminNewProduct.vue'),
            meta: { title: 'Nouveau produit', requiresAuth: Role.Accountant },
          },
          {
            path: ':id',
            name: 'admin-products-edit',
            component: () => import('../views/admin/products/AdminEditProduct.vue'),
            meta: { title: 'Modifier un produit', requiresAuth: Role.Accountant },
          },
        ],
      },
      {
        path: 'users',
        name: 'admin-users',
        children: [
          {
            path: '',
            name: 'admin-users-list',
            component: () => import('../views/admin/users/AdminUsers.vue'),
            meta: { title: "Liste d'utilisateurs", requiresAuth: Role.Admin },
          },
          {
            path: 'new',
            name: 'admin-users-new',
            component: () => import('../views/admin/users/AdminNewUser.vue'),
            meta: { title: 'Nouvel utilisateur', requiresAuth: Role.Admin },
          },
          {
            path: ':id',
            name: 'admin-users-edit',
            component: () => import('../views/admin/users/AdminEditUser.vue'),
            meta: { title: 'Modifier un utilisateur', requiresAuth: Role.Admin },
          },
        ],
      },
      {
        path: 'categories',
        name: 'admin-categories',
        children: [
          {
            path: '',
            name: 'admin-categories-list',
            component: () => import('../views/admin/categories/AdminCategories.vue'),
            meta: { title: 'Liste de catégories', requiresAuth: Role.Accountant },
          },
          {
            path: 'new',
            name: 'admin-categories-new',
            component: () => import('../views/admin/categories/AdminNewCategory.vue'),
            meta: { title: 'Nouvelle catégorie', requiresAuth: Role.Accountant },
          },
          {
            path: ':id',
            name: 'admin-categories-edit',
            component: () => import('../views/admin/categories/AdminEditCategory.vue'),
            meta: { title: 'Modifier une catégorie', requiresAuth: Role.Accountant },
          },
        ],
      },
      {
        path: 'orders',
        name: 'admin-orders',
        children: [
          {
            path: '',
            name: 'admin-orders-list',
            component: () => import('../views/admin/orders/AdminOrders.vue'),
            meta: { title: 'Liste de catégories', requiresAuth: Role.Accountant },
          },
          {
            path: 'new',
            name: 'admin-orders-view',
            component: () => import('../views/admin/orders/AdminViewOrder.vue'),
            meta: { title: 'Nouvelle catégorie', requiresAuth: Role.Accountant },
          },
        ],
      },
    ],
  },
  notFound: {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFoundView.vue'),
    meta: { title: 'Page non trouvée' },
  },
} as const satisfies Record<string, RouteRecordRaw>;

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' };
    }
    return savedPosition || { top: 0, left: 0 };
  },
  routes: Object.values(routes),
});

router.beforeEach((to, from, next) => {
  const { jwtLogin, isLoggedIn, hasToken } = useAuthStore();

  if (to.meta.requiresAuth) {
    if (!hasToken()) next({ name: 'login', query: { redirect: to.fullPath } });
    else if (isLoggedIn()) next();
    else {
      jwtLogin().then((loggedIn) => next(loggedIn ? to : { name: 'login', query: { redirect: to.fullPath } }));
    }
  } else {
    next();
  }
});

router.afterEach((to) => {
  document.title = `${to.meta.title ? `${to.meta.title} — ` : ''}${company.name}`;
});

export default router;
