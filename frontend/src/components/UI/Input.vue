<template>
  <input
    type="text"
    class="dark:bg-dark-input transition-colors"
    :class="classes"
    :placeholder="placeholder"
    autocomplete="none"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    @keyup.enter="$emit('enterClick')"
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
