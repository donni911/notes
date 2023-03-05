<template>
  <div class="h-[100vh] flex items-center justify-center">
    <div
      class="bg-body-inner transition-colors dark:bg-body-dark max-w-[1030px] w-full h-full md:h-[765px] rounded overflow-hidden"
    >
      <section class="flex h-full relative">
        <sidebar :menu-items="menuItems" />
        <section class="w-full p-2 md:p-4 relative">
          <router-view v-slot="{ Component }">
            <transition name="fade">
              <component :is="Component" />
            </transition>
          </router-view>
        </section>
      </section>
    </div>
  </div>
</template>
<script>
import Sidebar from "./components/Sidebar.vue";

import { mapActions, mapState } from "pinia";
import { noteStore } from "./store/notes.js";

export default {
  components: {
    Sidebar,
  },
  provide() {
    return {
      menuItems: this.$data.menuItems,
    };
  },

  data() {
    return {
      menuItems: [
        {
          linkName: "notes",
          name: "Notes",
          icon: "fa-solid fa-table-list",
        },
        {
          linkName: "reminder",
          name: "Reminders",
          icon: "fa-solid fa-bell",
        },
        { linkName: "starred", name: "Starred", icon: "fa-solid fa-star" },
        { linkName: "weather", name: "Weather", icon: "fa-solid fa-sun" },
        { linkName: "map", name: "Map", icon: "fa-solid fa-map" },
        { linkName: "chat", name: "Chat", icon: "fa-solid fa-comments" },
      ],
      htmlElement: document.documentElement,
    };
  },

  computed: {
    ...mapState(noteStore, ["notes"]),
  },

  methods: {
    ...mapActions(noteStore, ["initStoreNotes"]),
  },

  created() {
    //initStore
    this.initStoreNotes();

    //init theme
    if (localStorage.darkTheme && JSON.parse(localStorage.darkTheme) == true) {
      this.$data.htmlElement.classList.add("dark");
    } else {
      this.$data.htmlElement.classList.remove("dark");
    }

    //os theme switching
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        if (e.matches) {
          this.$data.htmlElement.classList.add("dark");
          localStorage.darkTheme = true;
        } else {
          this.$data.htmlElement.classList.remove("dark");
          localStorage.darkTheme = false;
        }
      });
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  @apply transition-opacity;
}
.fade-enter-from,
.fade-leave-to {
  @apply opacity-0;
}
</style>
