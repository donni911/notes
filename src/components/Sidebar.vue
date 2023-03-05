<template>
  <div>
    <SvgButton
      @click="openedSidebar = true"
      :icon="'fa-solid fa-bars'"
      class="md:hidden absolute z-30 bg-side top-[25%] shadow left-0 dark:bg-body-dark-side bg-white rounded-tr-md rounded-br-md transition-transform"
      :class="{ '-translate-x-full ': openedSidebar }"
      :classes="'w-8 h-8 [&>svg>path]:fill-white '"
    />

    <section
      class="md:static absolute z-20 -md:-translate-x-full pt-4 pb-2 w-[255px] h-full flex flex-col shadow-md bg-white transition-colors dark:bg-body-dark-side shrink-0 transition-transform"
      :class="{ '-md:translate-x-0': openedSidebar }"
    >
      <Logo />
      <MainMenu />
      <SecondaryMenu />
    </section>
    <div
      @click="openedSidebar = false"
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

  props: {
    menuItems: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style></style>
