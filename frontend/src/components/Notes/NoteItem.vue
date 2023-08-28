<template>
  <li
    class="rounded h-fit bg-white dark:bg-dark-text transition-colors shadow-md p-4"
  >
    <transition mode="out-in" name="fade">
      <div v-if="!editMode">
        <div class="flex justify-between items-center">
          <Badge :type="note.importanceLevel" />
          <div
            class="grid gap-4 grid-cols-2 items-baseline flex-shrink-0"
            v-if="editable"
          >
            <SvgButton
              @clickEvent="editNote"
              :tippyCaption="'Edit'"
              :icon="'fa-solid fa-pen'"
              :classes="'dark:[&>svg>path]:fill-body-dark-inner'"
            />

            <SvgButton
              @clickEvent="setStar"
              :icon="'fa-solid fa-star'"
              :tippyCaption="'Save this as important'"
              :classes="{
                '[&>svg>path]:fill-yellow-400 betterhover:group-hover:[&>svg>path]:fill-yellow-400':
                  note.starred,
                '[&>svg>path]:fill-muted dark:[&>svg>path]:fill-body betterhover:group-hover:[&>svg>path]:fill-yellow-200':
                  !note.starred,
              }"
            />
          </div>
        </div>

        <div class="mt-2">
          <h3 class="text-lg font-bold mb-1">
            {{ note.title }}
          </h3>

          <p>{{ note.description }}</p>

          <div class="mt-2 text-sm text-gray-500">
            {{ date }}
          </div>
        </div>
      </div>

      <NoteItemEditMode
        v-else
        :note="note"
        @setStar="setStar"
        @editNote="editNote"
        @closeEdit="closeEdit"
        @deleteNote="deleteNote"
      />
    </transition>
  </li>
</template>

<script>
import NoteItemEditMode from "./NoteItemEditMode.vue";
import Badge from "../UI/Badge.vue";
import SvgButton from "../UI/SvgButton.vue";

import { Tippy } from "vue-tippy";

import { mapActions, mapState } from "pinia";
import { noteStore } from "@/store/notes.js";

export default {
  components: {
    Tippy,
    NoteItemEditMode,
    SvgButton,
    Badge,
  },

  inject: ["editable"],

  data() {
    return {
      editMode: false,
      date: null,
    };
  },

  props: {
    note: {
      type: Object,
    },

    isOpen: {
      type: Boolean,
    },
  },

  computed: {
    ...mapState(noteStore, ["starNotes", "notes"]),
  },

  methods: {
    ...mapActions(noteStore, ["deleteNoteAction", "editNoteAction"]),

    updatedDate(date) {
      const localeDate = new Date(date).toLocaleString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      });

      if (this.note.createdAt === date) {
        this.date = `Task was added at ` + localeDate;
      } else {
        this.date = `Task was edited at ` + localeDate;
      }
    },

    handleClickOutside(event) {
      if (
        this.$props.isOpen &&
        this.$data.editMode &&
        !event.composedPath().includes(this.$el)
      ) {
        this.closeEdit();
      }
    },

    editNote() {
      this.$data.editMode = true;
      this.$emit("openEditNote", this.$props.note);
    },

    deleteNote() {
      this.deleteNoteAction(this.$props.note);
      this.$refs.tippySubmit?.hide();
    },

    async editNoteDate() {
      const date = await this.editNoteAction(this.$props.note);
      this.updatedDate(date.updatedAt);
    },

    closeEdit() {
      this.$data.editMode = false;
      this.$emit("sortAction");
      this.editNoteDate();
    },

    setStar() {
      this.$props.note.starred = !this.$props.note.starred;
      this.editNoteDate();
    },
  },

  mounted() {
    this.updatedDate(this.note.updatedAt);
    document.addEventListener("click", this.handleClickOutside);
  },

  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  },
};
</script>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: max-height 0.5s ease;
}

.slide-enter,
.slide-leave-to {
  max-height: 0;
}
</style>
