import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Reminder from "../pages/Reminder.vue";
import Settings from "../pages/Settings.vue";
import Starred from "../pages/Starred.vue";
import Weather from "../pages/Weather.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
