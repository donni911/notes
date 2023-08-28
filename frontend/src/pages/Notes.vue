<template>
  <div class="w-full h-full relative pb-2">
    <transition mode="out-in" name="fade">
      <div v-if="!isLoading || notes.length" class="h-full">
        <div class="flex items-center mb-4">
          <input
            v-model="searchNote"
            placeholder="Search note by text or description"
            class="dark:bg-dark-input transition-colors shadow-md rounded-full px-4 py-3 w-[75%]"
            @input="getByText(searchNote)"
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
          v-if="!notes.length"
          class="flex my-auto justify-center absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]"
        >
          <h4 class="text-muted">EMPTY LIST</h4>
        </div>
        <div
          v-else
          class="py-4 h-[calc(100%-50px)] overflow-y-auto overflow-x-hidden [scrollbar-gutter:stable] pr-2"
        >
          <NotesList :notes="notes" @sortAction="sortNotes" />
        </div>
      </div>
      <div v-else="isLoading" class="h-full">
        <div
          class="flex items-center justify-center h-full flex-col gap-4 text-xl"
        >
          <h3>Fetching Data</h3>
          <div>
            <Spinner class="w-10 h-10" />
          </div>
        </div>
      </div>
    </transition>
    <AddNoteWrapper />
  </div>
</template>

<script>
import Input from "../components/UI/Input.vue";
import SvgButton from "../components/UI/SvgButton.vue";
import AddNoteWrapper from "../components/Notes/AddNoteWrapper.vue";
import NotesList from "../components/Notes/NotesList.vue";
import Spinner from "@/components/UI/Spinner.vue";

import { mapState, mapActions } from "pinia";
import { noteStore } from "../store/notes.js";

export default {
  components: { Input, AddNoteWrapper, NotesList, SvgButton, Spinner },
  provide() {
    return {
      editable: true,
    };
  },

  data() {
    return {
      searchNote: "",
      isSorted: false,
    };
  },

  computed: {
    ...mapState(noteStore, ["notes", "isLoading", "starNotes", "rowLayout"]),
  },

  methods: {
    ...mapActions(noteStore, [
      "toggleLayoutAction",
      "initVisibilityNotes",
      "initStoreNotes",
      "getByText",
    ]),

    actionSort() {
      this.isSorted = !this.isSorted;

      if (this.isSorted) {
        this.sortNotes();
      } else {
        this.unSortNotes();
      }
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
