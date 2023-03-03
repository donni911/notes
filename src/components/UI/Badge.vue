<template>
  <div
    class="inline-block px-3 py-1 pointer-events-none rounded-3xl"
    :class="[computedClasses]"
  >
    <p>
      <span class="capitalize">{{ type }} </span>
      priority
    </p>
  </div>
</template>

<script>
export default {
  props: ["type"],

  computed: {
    computedClasses() {
      switch (this.type) {
        case "high":
          return "bg-error text-white";
        case "medium":
          return "bg-warning text-white";
        case "low":
          return "bg-success text-white";
        default:
          return "bg-black text-white";
      }
    },
  },
};
</script>
