import { defineStore } from "pinia";
import VueJwtDecode from "vue-jwt-decode";
import { setAuthToken, unsetAuthToken } from "../services/http.js";

const userSettingsStore = defineStore("userSettingsStore", {
  state: () => ({
    userThemeIsDark: false,
    user: null,
  }),

  actions: {
    getUserDetails() {
      let token = localStorage.getItem("jwt");
      if (token) {
        let decoded = VueJwtDecode.decode(token);
        this.user = decoded;
      }
    },

    async setUser(token) {
      localStorage.setItem("jwt", token);
      setAuthToken(token);
      this.getUserDetails();
    },

    logUserOut() {
      unsetAuthToken();
      localStorage.removeItem("jwt");
      this.user = null;
    },

    initUserSettings() {
      this.userThemeIsDark =
        JSON.parse(localStorage.getItem("userThemeIsDark")) || false;
      this.applyTheme();
    },

    toggleTheme() {
      this.userThemeIsDark = !this.userThemeIsDark;
      localStorage.userThemeIsDark = JSON.stringify(this.userThemeIsDark);

      this.applyTheme();
    },

    applyTheme() {
      this.userThemeIsDark
        ? document.documentElement.classList.add("dark")
        : document.documentElement.classList.remove("dark");
    },
  },
});

export { userSettingsStore };
