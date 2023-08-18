<template>
  <multiselect
    :modelValue="selectedOption"
    @select="$emit('update:modelValue', $event)"
    :placeholder="placeholder"
    :options="options"
    :searchable="false"
    :showLabels="false"
    track-by="name"
    label="name"
  >
  </multiselect>
</template>

<script>
import Multiselect from "vue-multiselect";

export default {
  components: { Multiselect },
  props: {
    modelValue: {
      type: Object || String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "Placeholder",
    },
  },

  data() {
    return {
      options: [
        { name: "Low priority", priority: "low", priorityLevel: 3 },
        { name: "Medium priority", priority: "medium", priorityLevel: 2 },
        { name: "High priority", priority: "high", priorityLevel: 1 },
      ],
    };
  },

  computed: {
    selectedOption() {
      return this.$data.options.find(
        (option) => option.priority === this.$props.modelValue?.priority
      );
    },
  },

  methods: {
    actionSelect() {
      this.$emit("selectedValue", this.value);
    },
  },
};
</script>
