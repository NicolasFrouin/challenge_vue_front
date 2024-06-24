import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import company from "@/company";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      meta: { title: "Accueil" },
      component: HomeView,
    },
    {
      path: "/test",
      name: "test",
      component: () => import("../views/TestView.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  // if (to.meta.requiresAuth /* && !store.getters.isAuthenticated */) {
  //   next({ name: "login", query: { redirect: to.fullPath } });
  // }
  document.title = (to.meta.title ? to.meta.title + " — " : "") + company.name;
  next();
});

export default router;
