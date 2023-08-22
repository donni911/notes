import { defineStore } from "pinia";

const userSettingsStore = defineStore("userSettingsStore", {
  state: () => ({
    userThemeIsDark: false,
  }),

  actions: {
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
