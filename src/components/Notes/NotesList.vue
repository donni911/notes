<template>
  <ul class="grid grid-cols-2 gap-4">
    <note-item v-for="note in notes" :note="note" :key="note" />
  </ul>
</template>

<script>
import NoteItem from "./NoteItem.vue";

export default {
  components: {
    NoteItem,
  },
  props: {
    notes: {
      type: Array,
    },
  },
};
</script>
