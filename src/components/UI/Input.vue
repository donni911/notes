<template>
  <input
    type="text"
    class="w-full"
    :class="classes"
    :placeholder="placeholder"
  />
</template>

<script>
export default {
  props: {
    classes: {
      type: String,
    },
    placeholder: {
      type: String,
    },
  },
};
</script>
