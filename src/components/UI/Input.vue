<template>
  <input
    type="text"
    class="dark:bg-dark-input transition-colors"
    :class="classes"
    :placeholder="placeholder"
    :value="modelValue"
    @keyup.enter="$emit('enterClick')"
    @input="$emit('update:modelValue', $event.target.value)"
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
    modelValue: {
      type: String,
    },
  },
  emits: ["update:modelValue"],
};
</script>
