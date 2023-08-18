<template>
  <div
    class="overflow-hidden shrink-0 py-1 px-3 leading-4 bg-body-inner rounded-xl"
  >
    <transition mode="out-in">
      <span :key="computedCounter" class="block"> {{ computedCounter }}</span>
    </transition>
  </div>
</template>

<script>
export default {
  props: ["count"],

  computed: {
    computedCounter() {
      return this.$props.count > 99 ? "99+" : this.$props.count;
    },
  },
};
</script>

<style>
.v-enter-from {
  @apply -translate-y-full;
}

.v-enter-active,
.v-leave-active {
  @apply transition delay-200;
}

.v-enter-from,
.v-leave-to {
  @apply opacity-0;
}
</style>
