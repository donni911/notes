<template>
  <div class="w-full h-full relative pb-2">
    <div
      class="flex items-center justify-between w-full rounded-xl transition-colors dark:bg-dark-input bg-white p-4 py-2 shadow"
    >
      <h3 class="mr-4 text-lg">Dark mode</h3>
      <Switcher @clickEvent="toggleTheme" v-model="userThemeIsDark" />
    </div>

    <button @click="logUserOut">Log Out</button>
  </div>
</template>

<script>
import Switcher from "../components/UI/Switcher.vue";

import { mapState, mapActions } from "pinia";
import { userSettingsStore } from "../store/userSettings.js";

export default {
  data() {
    return {
      isDark: false,
    };
  },

  components: {
    Switcher,
  },

  methods: {
    ...mapActions(userSettingsStore, ["toggleTheme", "initUserSettings"]),
    logUserOut() {
      localStorage.removeItem("jwt");
      this.$router.push("/login");
    },
  },

  computed: {
    ...mapState(userSettingsStore, ["userThemeIsDark"]),
  },

  mounted() {
    this.initUserSettings();
  },
};
</script>
