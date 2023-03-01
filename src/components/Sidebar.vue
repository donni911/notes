<template>
  <section
    class="pt-4 pb-2 w-[255px] h-full flex flex-col shadow-md bg-white shrink-0"
  >
    <Logo />
    <MainMenu />
    <SecondaryMenu />
  </section>
</template>

<script>
import Logo from "./UI/Logo.vue";

import MainMenu from "./UI/Menu/MainMenu.vue";
import SecondaryMenu from "./UI/Menu/SecondaryMenu.vue";

export default {
  components: {
    Logo,
    MainMenu,
    SecondaryMenu,
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
