import { createRouter, createWebHistory } from "vue-router";

const HomeView = () => import("@/views/AboutView.vue");
const LoginView = () => import("@/views/Login/index.vue");

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    }
  ],
});

export default router;