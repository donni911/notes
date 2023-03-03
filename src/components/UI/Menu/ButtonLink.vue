<template>
  <li class="relative p-3 flex items-center">
    <div class="w-4 h-4 [&>svg]:h-full [&>svg]:w-full flex z-10">
      <font-awesome-icon :icon="item.icon" />
    </div>
    <slot>
      <router-link
        :to="{ name: item.linkName }"
        class="group after:absolute after:inset-0 after:content-[''] hover:before:bg-body-inner hover:before:-translate-x-[85%] mx-4 isolate before:absolute before:inset-0 before:content-[''] before:bg-accent before:rounded-r-full before:shadow-sm before:-z-10 before:transition before:-translate-x-full"
        >{{ item.name }}</router-link
      >
    </slot>
    <counter v-if="item.count" :count="item.count" class="ml-auto z-10" />
  </li>
</template>

<script>
import Counter from "../Counter.vue";

export default {
  components: {
    Counter,
  },
  props: {
    item: {
      type: Object,
    },
  },

  methods: {
    computedCount() {
      this.$props.item.count++;
    },
  },
};
</script>

<style scoped>
.router-link-exact-active {
  @apply before:translate-x-[calc(0%-5px)] pointer-events-none;
}
</style>
