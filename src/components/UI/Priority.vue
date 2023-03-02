<template>
  <multiselect
    v-model="value"
    :placeholder="placeholder"
    :options="options"
    :searchable="false"
    :showLabels="false"
    track-by="name"
    label="name"
    @select="actionSelect"
  >
  </multiselect>
</template>

<script>
import Multiselect from "vue-multiselect";

export default {
  components: { Multiselect },
  props: ["placeholder", "value"],

  data() {
    return {
      value: "",
      optionSelect: [
        { name: "Low priority", priority: "low" },
        { name: "Medium priority", priority: "medium" },
        { name: "High priority", priority: "high" },
      ],
    };
  },

  methods: {
    actionSelect() {
      this.$emit("selectedValue", this.value);
    },
  },
};
</script>
