<template>
  <button
    @click="$emit('clickEvent')"
    class="flex items-center justify-center [&>svg]:w-full [&>svg]:h-full transition active:scale-90"
    :class="[sizeComputed, bgComputed, fillComputed]"
  >
    <slot> <font-awesome-icon :icon="icon" /></slot>
  </button>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
    },
    size: {
      type: String,
    },
    bg: {
      type: String,
    },
    fill: {
      type: String,
    },
  },

  computed: {
    sizeComputed() {
      switch (this.size) {
        case "lg":
          return "p-3 w-12 h-12";
        case "md":
          return "p-2 w-8 h-8";
        default:
          return "p-3 w-12 h-12";
      }
    },

    bgComputed() {
      switch (this.bg) {
        case "bg":
          return "bg-white hover:bg-secondary";
        case "bg-rounded":
          return "bg-muted hover:bg-secondary shadow-md rounded-full";
        default:
          return "";
      }
    },

    fillComputed() {
      return this.fill
        ? "[&>svg>path]:fill-" + this.fill
        : "[&>svg>path]:fill-white";
    },
  },
};
</script>
