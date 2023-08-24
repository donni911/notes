import VueJwtDecode from "vue-jwt-decode";
import { userSettingsStore } from "../store/userSettings";

import { createRouter, createWebHistory } from "vue-router";
import Notes from "../pages/Notes.vue";
import Reminder from "../pages/Reminder.vue";
import Settings from "../pages/Settings.vue";
import Starred from "../pages/Starred.vue";
import Weather from "../pages/Weather.vue";
import Chat from "../pages/Chat.vue";
import Map from "../pages/Map.vue";
import PageNotFound from "../pages/error/PageNotFound.vue";

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
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/weather",
    name: "weather",
    component: Weather,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/settings",
    name: "settings",
    component: Settings,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/starred",
    name: "starred",
    component: Starred,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/map",
    name: "map",
    component: Map,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/chat",
    name: "chat",
    component: Chat,
    meta: {
      requiresAuth: true,
    },
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
  { path: "/:pathMatch(.*)*", name: "notfound", component: PageNotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

//Redirecting if user is not authorized
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem("jwt");

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({
        name: "login",
        query: { redirect: to.fullPath },
      });
    } else {
      const user = VueJwtDecode.decode(localStorage.getItem("jwt"));
      const currentTime = Date.now() / 1000;
      if (user.exp < currentTime) {
        userSettingsStore().logUserOut();
        next({
          name: "login",
          query: { redirect: to.fullPath },
        });
        console.log("exp");
      } else {
        next();
      }
    }
  } else {
    next();
  }
});

export default router;
