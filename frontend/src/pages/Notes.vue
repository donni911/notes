<template>
  <div class="w-full h-full relative pb-2">
    <div class="flex items-center mb-4" v-if="notes.length">
      <Input
        v-model="searchNote"
        :placeholder="'Search note'"
        :classes="'shadow-md rounded-full px-4 py-3 w-[75%]'"
      />
      <div class="ml-2 gap-6 flex justify-center w-[25%]">
        <button
          @click="toggleLayoutAction"
          v-tippy="'Toggle layout'"
          class="p-2 -m-2 active:scale-90 group -md:hidden"
        >
          <transition name="fade" mode="out-in">
            <div
              v-if="!rowLayout"
              class="w-6 h-6 flex items-center justify-center [&>svg>path]:transition [&>svg>path]:fill-body transition-colors dark:[&>svg>path]:fill-body-dark-inner betterhover:group-hover:[&>svg>path]:fill-muted"
            >
              <font-awesome-icon icon="fa-solid fa-border-all" />
            </div>
            <div
              v-else
              class="w-6 h-6 flex items-center justify-center [&>svg>path]:transition [&>svg>path]:fill-body transition-colors dark:[&>svg>path]:fill-body-dark-inner betterhover:group-hover:[&>svg>path]:fill-muted"
            >
              <font-awesome-icon icon="fa-solid fa-grip-lines" />
            </div>
          </transition>
        </button>
        <SvgButton
          @clickEvent="actionSort"
          :tippyCaption="'Importance sort'"
          :icon="'fa-solid fa-sort'"
          :classes="'dark:[&>svg>path]:fill-body-dark-inner'"
        />
      </div>
    </div>
    <div
      v-if="!computedNotes.length"
      class="flex my-auto justify-center absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]"
    >
      <h4 class="text-muted">EMPTY LIST</h4>
    </div>
    <div
      v-else
      class="py-4 h-[calc(100%-50px)] overflow-y-auto overflow-x-hidden [scrollbar-gutter:stable] pr-2"
    >
      <NotesList
        :notes="computedNotes"
        :editable="true"
        @sortAction="sortNotes"
      />
    </div>
    <AddNoteWrapper />
  </div>
</template>

<script>
import Input from "../components/UI/Input.vue";
import SvgButton from "../components/UI/SvgButton.vue";
import AddNoteWrapper from "../components/Notes/AddNoteWrapper.vue";
import NotesList from "../components/Notes/NotesList.vue";

import { mapState, mapActions } from "pinia";
import { noteStore } from "../store/notes.js";

export default {
  components: { Input, AddNoteWrapper, NotesList, SvgButton },

  data() {
    return {
      searchNote: "",
      isSorted: false,
    };
  },

  computed: {
    ...mapState(noteStore, ["notes", "starNotes", "rowLayout"]),

    computedNotes() {
      if (!this.searchNote) {
        return this.notes;
      }
      return this.notes.filter((note) =>
        note.title.toLowerCase().includes(this.searchNote.toLowerCase())
      );
    },
  },

  methods: {
    ...mapActions(noteStore, [
      "toggleLayoutAction",
      "updateLocalStorage",
      "initVisibilityNotes",
    ]),

    actionSort() {
      this.isSorted = !this.isSorted;

      if (this.isSorted) {
        this.sortNotes();
      } else {
        this.unSortNotes();
      }
      this.updateLocalStorage();
    },

    sortNotes() {
      return this.notes.sort(function (a, b) {
        if (a.importanceLevel.priorityLevel > b.importanceLevel.priorityLevel)
          return 1;
        if (a.importanceLevel.priorityLevel < b.importanceLevel.priorityLevel)
          return -1;
        return 0;
      });
    },

    unSortNotes() {
      return this.notes.sort(function (a, b) {
        if (a.importanceLevel.priorityLevel < b.importanceLevel.priorityLevel)
          return 1;
        if (a.importanceLevel.priorityLevel > b.importanceLevel.priorityLevel)
          return -1;
        return 0;
      });
    },
  },

  mounted() {
    this.initVisibilityNotes();
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
