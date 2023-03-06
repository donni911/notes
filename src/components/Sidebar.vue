<template>
  <div>
    <SvgButton
      @click="openSidebar"
      :icon="'fa-solid fa-bars'"
      class="md:hidden absolute z-30 bg-side top-[25%] shadow right-2 dark:bg-body-dark-side bg-white rounded-tl-md rounded-bl-md transition-transform"
      :class="{ 'translate-x-full ': openedSidebar }"
      :classes="'w-6 h-6 dark:[&>svg>path]:fill-white '"
    />

    <section
      class="md:static absolute z-20 -md:overflow-y-auto -md:-translate-x-full pt-4 pb-2 w-[255px] h-full flex flex-col shadow-md bg-white transition dark:bg-body-dark-side shrink-0"
      :class="{ '-md:translate-x-0': openedSidebar }"
    >
      <Logo @click="closeSidebar" />
      <MainMenu @clickEvent="closeSidebar" />
      <SecondaryMenu @clickEvent="closeSidebar" />
    </section>
    <div
      @click="closeSidebar"
      class="bg-black opacity-0 fixed inset-0 pointer-events-none transition-opacity md:hidden z-10"
      :class="{ 'opacity-40 pointer-events-auto': openedSidebar }"
    ></div>
  </div>
</template>

<script>
import Logo from "./UI/Logo.vue";

import MainMenu from "./UI/Menu/MainMenu.vue";
import SecondaryMenu from "./UI/Menu/SecondaryMenu.vue";
import Button from "./UI/Button.vue";
import SvgButton from "./UI/SvgButton.vue";

export default {
  components: {
    Logo,
    MainMenu,
    SecondaryMenu,
    Button,
    SvgButton,
  },

  data() {
    return {
      openedSidebar: false,
    };
  },

  methods: {
    closeSidebar() {
      this.$data.openedSidebar = false;
    },

    openSidebar() {
      this.$data.openedSidebar = true;
    },
  },

  props: {
    menuItems: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style></style>
