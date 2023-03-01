<template>
  <div></div>
</template>

<script>
import Multiselect from "vue-multiselect";

export default {
  components: { Multiselect },
  data() {
    return {
      value: null,
      options: ["list", "of", "options"],
    };
  },
};
</script>
