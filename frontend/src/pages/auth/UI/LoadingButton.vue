<template>
  <button
    type="submit"
    class="bg-primary select-none text-white px-2 py-4 rounded-full active:scale-95 cursor-pointer hover:bg-secondary transition-all"
    :class="{ 'flex justify-center': status }"
  >
    <div v-if="status" role="status">
      <Spinner class="w-5 h-5" />
      <span class="sr-only">Loading...</span>
    </div>
    <span v-else>{{ text }}</span>
  </button>
</template>

<script>
import Spinner from "@/components/UI/Spinner.vue";

export default {
  components: {
    Spinner,
  },
  props: ["status", "text"],
};
</script>
