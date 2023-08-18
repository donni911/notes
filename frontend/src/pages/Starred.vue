<template>
  <div class="w-full h-full relative pb-2">
    <div
      v-if="!starNotes.length"
      class="flex my-auto justify-center absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]"
    >
      <h4 class="text-muted">No star notes</h4>
    </div>
    <div v-else class="py-4 h-full overflow-y-auto">
      <NotesList :notes="starNotes" :editable="false" />
    </div>
  </div>
</template>

<script>
import NotesList from "../components/Notes/NotesList.vue";

import { mapState } from "pinia";
import { noteStore } from "../store/notes.js";

export default {
  components: { NotesList },

  computed: { ...mapState(noteStore, ["starNotes"]) },
};
</script>
