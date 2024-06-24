import { createRouter, createWebHistory } from 'vue-router';
import useAppState from '@/stores/state';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/product/:id',
      name: 'product-details',
      // route level code-splitting
      // this generates a separate chunk (ProductDetails.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ProductDetailsView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  // if (to.meta.requiresAuth /* && !store.getters.isAuthenticated */) {
  //   next({ name: "login", query: { redirect: to.fullPath } });
  // }
  document.title = `${to.meta.title ? `${to.meta.title} — ` : ''} company.name`;
  const appState = useAppState();
  to.meta.appState = appState;
  next();
});

export default router;
