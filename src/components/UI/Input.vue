<template>
  <input
    type="text"
    :class="classes"
    :placeholder="placeholder"
    :value="modelValue"
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
