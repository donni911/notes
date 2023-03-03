<template>
  <ul class="grid gap-4 pr-2" :class="{ 'grid-cols-2': rowLayout }">
    <TransitionGroup name="list">
      <note-item
        v-for="note in notes"
        :note="note"
        :key="note"
        :isOpen="isOpen"
        @openEditNote="openEditNote"
        :editable="editable"
      />
    </TransitionGroup>
  </ul>
</template>

<script>
import NoteItem from "./NoteItem.vue";

import { mapState } from "pinia";
import { noteStore } from "../../store/notes.js";

export default {
  components: {
    NoteItem,
  },
  props: {
    notes: {
      type: Array,
    },

    editable: {
      type: Boolean,
    },
  },

  data() {
    return {
      activeNote: null,
      isOpen: false,
    };
  },

  computed: {
    ...mapState(noteStore, ["rowLayout"]),
  },

  methods: {
    closeEditNote() {
      this.isOpen = false;
      this.$data.activeNote = null;
    },

    openEditNote(item) {
      if (this.isOpen && this.$data.activeNote === item) {
        this.isOpen = false;
        this.$data.activeNote = null;
      } else {
        this.isOpen = true;
        this.$data.activeNote = item;
      }
    },
  },
};
</script>

<style>
.list-move,
.list-enter-active,
.list-leave-active {
  @apply transition;
}

.list-enter-from,
.list-leave-to {
  @apply opacity-0 translate-x-7;
}

.list-leave-active {
  @apply absolute;
}
</style>
