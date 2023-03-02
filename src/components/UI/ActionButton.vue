<template>
  <button
    :type="type ? type : 'button'"
    @click="$emit('clickEvent')"
    class="flex items-center justify-center py-1 px-3 bg-white hover:bg-secondary hover:text-white rounded-full [&>svg]:w-full [&>svg]:h-full transition active:scale-90"
  >
    <slot> Button</slot>
  </button>
</template>

<script>
export default {
  props: ["type"],
};
</script>

<style></style>
