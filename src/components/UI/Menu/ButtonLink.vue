<template>
  <li class="relative p-3 flex items-center">
    <div
      class="w-4 h-4 transition-colors dark:[&>svg>path]:fill-dark-text [&>svg]:h-full [&>svg]:w-full flex z-10"
    >
      <font-awesome-icon :icon="item.icon" />
    </div>
    <slot>
      <router-link
        :to="{ name: item.linkName }"
        class="group after:absolute after:inset-0 after:content-[''] transition-colors dark:text-dark-text betterhover:hover:before:bg-body-inner dark:betterhover:hover:before:bg-body-dark betterhover:hover:before:-translate-x-[85%] mx-4 isolate before:absolute before:inset-0 before:content-[''] before:bg-accent dark:before:bg-body-dark before:rounded-r-full before:shadow-sm before:-z-10 before:transition before:-translate-x-full"
        >{{ item.name }}</router-link
      >
    </slot>
    <counter v-if="computedCount" :count="computedCount" class="ml-auto z-10" />
  </li>
</template>

<script>
import Counter from "../Counter.vue";

import { mapState } from "pinia";
import { noteStore } from "@/store/notes.js";

export default {
  components: {
    Counter,
  },
  props: {
    item: {
      type: Object,
    },
  },

  computed: {
    ...mapState(noteStore, ["notesLength", "starNotesLength"]),

    computedCount() {
      switch (this.item.linkName) {
        case "notes":
          return this.notesLength;
        case "starred":
          return this.starNotesLength;
      }
    },
  },

  mounted() {},
};
</script>

<style scoped>
.router-link-exact-active {
  @apply before:translate-x-[calc(0%-5px)] pointer-events-none;
}
</style>
