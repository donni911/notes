<template>
  <div class="bg-white p-4 flex flex-col rounded-xl">
    <h4 class="text-center text-xs">{{ title }}</h4>
    <span class="text-center text-lg font-bold"> {{ description }}</span>
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
