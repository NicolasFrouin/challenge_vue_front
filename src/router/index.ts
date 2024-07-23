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
    meta: { title: 'Home' },
  },
  search: {
    path: '/search',
    name: 'search',
    component: () => import('../views/SearchView.vue'),
    meta: { title: 'Search Results' },
  },
  productDetails: {
    path: '/product/:slug',
    name: 'product-details',
    component: () => import('../views/ProductDetailsView.vue'),
    meta: { title: 'Product Details' },
  },
  login: {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
    meta: { title: 'Login' },
  },
  register: {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue'),
    meta: { title: 'Register' },
  },
  about: {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
    meta: { title: 'About' },
  },
  cart: {
    path: '/cart',
    name: 'cart',
    component: () => import('../views/CartView.vue'),
    meta: { title: 'Cart' },
  },
  account: {
    path: '/account',
    name: 'account',
    component: () => import('../views/user/AccountView.vue'),
    meta: { title: 'Account', requiresAuth: Role.User },
  },
  admin: {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/admin/AdminView.vue'),
    meta: { title: 'Admin Dashboard', requiresAuth: Role.Accountant },
    children: [
      {
        path: '',
        name: 'admin-home',
        component: () => import('../views/admin/AdminDashboard.vue'),
        meta: { title: 'Admin Dashboard' },
      },
      {
        path: 'products',
        name: 'admin-products',
        component: () => import('../views/admin/products/AdminProducts.vue'),
        meta: { title: 'Admin Products' },
        children: [
          {
            path: 'new',
            name: 'admin-new-product',
            component: () => import('../views/admin/products/AdminNewProduct.vue'),
            meta: { title: 'New Product' },
          },
          {
            path: ':slug',
            name: 'admin-edit-product',
            component: () => import('../views/admin/products/AdminEditProduct.vue'),
            meta: { title: 'Edit Product' },
          },
        ],
      },
      {
        path: 'users',
        name: 'admin-users',
        component: () => import('../views/admin/users/AdminUsers.vue'),
        meta: { title: 'Admin Users', requiresAuth: Role.Admin },
      },
    ],
  },
  notFound: {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFoundView.vue'),
    meta: {
      title: 'Not Found',
    },
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
