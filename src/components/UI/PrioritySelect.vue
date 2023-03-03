<template>
  <multiselect
    :modelValue="selectedOption"
    @select="$emit('update:modelValue', $event.priority)"
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
      type: String,
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
        { name: "Low priority", priority: "low" },
        { name: "Medium priority", priority: "medium" },
        { name: "High priority", priority: "high" },
      ],
    };
  },

  computed: {
    selectedOption() {
      return this.$data.options.find(
        (option) => option.priority === this.$props.modelValue
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
