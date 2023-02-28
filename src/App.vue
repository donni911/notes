<template>
  <div class="h-[100vh] flex items-center justify-center">
    <div class="bg-body-inner rounded w-[1030px] h-[765px]">
      <section class="flex h-full">
        <sidebar :menu-items="menuItems" />
        <router-view class="" />
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

  data() {
    return {
      menuItems: [
        { linkName: "home", name: "Notes" },
        { linkName: "reminder", name: "Reminders" },
        { linkName: "starred", name: "Starred " },
        { linkName: "weather", name: "Weather " },
      ],
    };
  },
};
</script>
