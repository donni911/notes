<template>
  <div class="w-full h-full relative pb-2">
    <div
      class="flex items-center justify-between w-full rounded-xl transition-colors dark:bg-dark-input bg-white p-4 py-2 shadow"
    >
      <h3 class="mr-4 text-lg">Dark mode</h3>
      <Switcher @clickEvent="toggleTheme" v-model="userThemeIsDark" />
    </div>

    <button
      class="px-4 py-2 rounded-full text-white bg-primary mt-2"
      @click="logOut"
    >
      Log Out
    </button>
  </div>
</template>

<script>
import Switcher from "../components/UI/Switcher.vue";

import { mapState, mapActions } from "pinia";
import { userSettingsStore } from "../store/userSettings.js";
import { noteStore } from "../store/notes.js";

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
    ...mapActions(userSettingsStore, [
      "toggleTheme",
      "initUserSettings",
      "logUserOut",
    ]),

    ...mapActions(noteStore, ["deleteAllInfo"]),

    logOut() {
      this.logUserOut();
      this.deleteAllInfo();
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
