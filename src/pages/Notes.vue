<template>
  <div class="w-full h-full relative pb-2">
    <div class="flex items-center mb-4">
      <Input
        :placeholder="'Search note'"
        :classes="'shadow-md rounded-full px-4 py-3  w-[75%]'"
      />
      <div class="mx-auto flex">
        <button
          @click="toggleLayout"
          v-tippy="'Toggle layout'"
          class="p-2 -m-2 active:scale-90 group"
        >
          <transition mode="out-in">
            <div
              v-if="!rowLayout"
              class="w-6 h-6 flex items-center justify-center [&>svg>path]:transition [&>svg>path]:fill-body group-hover:[&>svg>path]:fill-muted"
            >
              <font-awesome-icon icon="fa-solid fa-border-all" />
            </div>
            <div
              v-else
              class="w-6 h-6 flex items-center justify-center [&>svg>path]:transition [&>svg>path]:fill-body group-hover:[&>svg>path]:fill-muted"
            >
              <font-awesome-icon icon="fa-solid fa-grip-lines" />
            </div>
          </transition>
        </button>
      </div>
    </div>
    <div
      v-if="!notes.length"
      class="flex my-auto justify-center absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]"
    >
      <h4 class="text-muted">EMPTY LIST</h4>
    </div>
    <div
      v-else
      class="py-4 h-[calc(100%-50px)] overflow-y-auto overflow-x-hidden [scrollbar-gutter:stable]"
    >
      <NotesList :notes="notes" :editable="true" />
    </div>
    <AddNoteWrapper />
  </div>
</template>

<script>
import Input from "../components/UI/Input.vue";
import AddNoteWrapper from "../components/Notes/AddNoteWrapper.vue";
import NotesList from "../components/Notes/NotesList.vue";

import { mapState, mapActions } from "pinia";
import { noteStore } from "../store/notes.js";

export default {
  components: { Input, AddNoteWrapper, NotesList },

  computed: { ...mapState(noteStore, ["notes", "starNotes", "rowLayout"]) },

  methods: {
    ...mapActions(noteStore, ["initStoreNotes", "toggleLayoutAction"]),

    toggleLayout() {
      this.toggleLayoutAction();
    },
  },
};
</script>

<style>
.v-enter-active,
.v-leave-active {
  @apply transition-opacity;
}

.v-enter-from,
.v-leave-to {
  @apply opacity-0;
}
</style>
