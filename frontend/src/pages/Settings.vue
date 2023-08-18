<template>
  <div class="w-full h-full relative pb-2">
    <div
      class="flex items-center justify-between w-full rounded-xl transition-colors dark:bg-dark-input bg-white p-4 py-2 shadow"
    >
      <h3 class="mr-4 text-lg">Dark mode</h3>
      <Switcher @clickEvent="toggleTheme" v-model="isDark" />
    </div>
  </div>
</template>

<script>
import Switcher from "../components/UI/Switcher.vue";

export default {
  components: {
    Switcher,
  },

  data() {
    return {
      isDark: false,
      htmlElement: document.documentElement,
    };
  },

  methods: {
    toggleTheme() {
      this.$data.isDark = !this.$data.isDark;

      localStorage.darkTheme = this.$data.isDark;

      if (this.$data.isDark) {
        this.$data.htmlElement.classList.add("dark");
      } else {
        this.$data.htmlElement.classList.remove("dark");
      }
    },
  },

  mounted() {
    if (localStorage.darkTheme && JSON.parse(localStorage.darkTheme) == true) {
      this.$data.htmlElement.classList.add("dark");
      this.$data.isDark = true;
    } else {
      this.$data.htmlElement.classList.remove("dark");
      this.$data.isDark = false;
    }
  },
};
</script>
