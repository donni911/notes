<template>
  <div class="h-[100vh] flex items-center justify-center">
    <div class="bg-body-inner w-[1030px] h-[765px] rounded overflow-hidden">
      <section class="flex h-full">
        <sidebar :menu-items="menuItems" />
        <section class="w-full p-4 relative">
          <router-view />
        </section>
      </section>
    </div>
  </div>
</template>
<script>
import Sidebar from "./components/Sidebar.vue";

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
          count: 98,
        },
        {
          linkName: "reminder",
          name: "Reminders",
          icon: "fa-solid fa-bell",
        },
        { linkName: "starred", name: "Starred", icon: "fa-solid fa-star" },
        { linkName: "weather", name: "Weather", icon: "fa-solid fa-sun" },
        { linkName: "map", name: "Map", icon: "fa-solid fa-map" },
      ],
    };
  },
};
</script>
