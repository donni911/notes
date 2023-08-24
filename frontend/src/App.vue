<template>
  <div class="h-[100dvh] flex items-center justify-center">
    <div
      class="bg-body-inner transition-colors dark:bg-body-dark max-w-[1030px] w-full h-full md:h-[765px] rounded overflow-hidden"
    >
      <section class="flex h-full relative">
        <transition name="fade" mode="out-in">
          <sidebar :menu-items="menuItems" v-if="user" />
        </transition>
        <section class="w-full p-2 md:p-4 relative">
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
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
import { userSettingsStore } from "./store/userSettings.js";
import { noteStore } from "./store/notes.js";

export default {
  components: {
    Sidebar,
  },
  provide() {
    return {
      menuItems: this.menuItems,
    };
  },

  data() {
    return {
      htmlElement: document.documentElement,
    };
  },

  computed: {
    ...mapState(noteStore, ["notes", "menuItems", "starNotes"]),
    ...mapState(userSettingsStore, ["user"]),
  },

  methods: {
    ...mapActions(noteStore, ["initStoreNotes"]),
    ...mapActions(userSettingsStore, ["getUserDetails"]),
  },

  mounted() {
    //init User
    this.getUserDetails();
    console.log(this.user);
  },

  created() {
    //init Store
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
