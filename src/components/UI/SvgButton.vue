<template>
  <button
    @click="$emit('clickEvent')"
    class="p-2 -m-2 active:scale-90 group"
    v-tippy="tippyCaption"
  >
    <div
      class="w-4 h-4 flex items-center justify-center [&>svg>path]:transition [&>svg>path]:fill-muted betterhover:group-hover:[&>svg>path]:fill-body"
      :class="classes"
    >
      <font-awesome-icon :icon="icon" />
    </div>
  </button>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
    },

    tippyCaption: {
      type: String,
    },

    classes: {
      type: Object,
    },
  },
};
</script>
