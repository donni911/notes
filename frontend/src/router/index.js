import { createRouter, createWebHistory } from "vue-router";
import Notes from "../pages/Notes.vue";
import Reminder from "../pages/Reminder.vue";
import Settings from "../pages/Settings.vue";
import Starred from "../pages/Starred.vue";
import Weather from "../pages/Weather.vue";
import Chat from "../pages/Chat.vue";
import Map from "../pages/Map.vue";

const routes = [
  {
    path: "/",
    name: "notes",
    component: Notes,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/reminder",
    name: "reminder",
    component: Reminder,
  },
  {
    path: "/weather",
    name: "weather",
    component: Weather,
  },
  {
    path: "/settings",
    name: "settings",
    component: Settings,
  },
  {
    path: "/starred",
    name: "starred",
    component: Starred,
  },
  {
    path: "/map",
    name: "map",
    component: Map,
  },
  {
    path: "/chat",
    name: "chat",
    component: Chat,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../pages/auth/RegisterPage.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../pages/auth/LoginPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
