<template>
  <div class="bg-white p-4 flex flex-col rounded-xl flex-grow-0 flex-shrink-0">
    <transition name="fade" mode="out-in">
      <h4 class="text-center text-xs" :key="title">{{ title }}</h4>
    </transition>
    <transition name="fade" mode="out-in">
      <span class="text-center text-lg font-bold" :key="description">
        {{ description }}</span
      >
    </transition>
  </div>
</template>

<script>
export default {
  props: ["title", "description"],
};
</script>

<style scoped>
.primary {
  @apply bg-body dark:bg-body-dark text-white;
}
.muted {
  @apply dark:bg-white bg-accent text-text-color;
}
.secondary {
  @apply bg-secondary dark:bg-body-dark-side text-white;
}
</style>
