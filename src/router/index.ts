import { createRouter, createWebHistory } from "vue-router";
import multiguard from 'vue-router-multiguard';
import authentication_middleware from "../middlewares/authentication.ts"

const HomeView = () => import("@/views/Dashboard/index.vue");
const LoginView = () => import("@/views/Login/index.vue");
const UsersView = () => import("@/views/Users/index.vue");
const AlertView = () => import("@/views/Alerts/index.vue");
const AnnotationView = () => import("@/views/Annotation/index.vue");

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Dashboard",
      component: HomeView,
      beforeEnter: multiguard([authentication_middleware]),
    },
    {
      path: "/users",
      name: "Usuários",
      component: UsersView,
      beforeEnter: multiguard([authentication_middleware]),
    },
    {
      path: "/login",
      name: "Login",
      component: LoginView,
    },
    {
      path: "/alerts",
      name: "Alertas",
      component: AlertView,
      beforeEnter: multiguard([authentication_middleware]),
    },
    {
      path: "/annotations",
      name: "Defeitos",
      component: AnnotationView,
      beforeEnter: multiguard([authentication_middleware]),
    }
  ],
});

export default router;
