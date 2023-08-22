<template>
  <li
    class="rounded bg-white dark:bg-dark-text transition-colors shadow-md p-4"
  >
    <NoteItemEditMode
      :editMode="editMode"
      :note="note"
      :editable="editable"
      @setStar="setStar"
      @editNote="editNote"
      @closeEdit="closeEdit"
      @deleteNote="deleteNote"
    />

    <div class="mt-2">
      <transition mode="out-in" name="fade">
        <Input
          v-if="editMode"
          :classes="'p-1 body-inner border-2 border-body-inner mb-2 rounded w-full'"
          :placeholder="'Note Title'"
          v-model="note.title"
        />
        <h3 v-else class="text-lg font-bold mb-1">
          {{ note.title }}
        </h3>
      </transition>

      <transition mode="out-in" name="fade">
        <p v-if="!editMode">{{ note.description }}</p>
        <textarea
          v-else
          v-model="note.description"
          class="mb-2 focus:outline-0 p-1 min-h-[35px] h-[150px] max-h-[250px] w-full body-inner border-2 border-body-inner rounded"
          placeholder="Note Description"
        />
      </transition>

      <transition name="fade">
        <div v-if="note.time && !editMode" class="mt-2 text-sm text-gray-500">
          <i>{{
            `Task was ${note.edited ? "edited" : "added"} at ` + note.time
          }}</i>
        </div>
      </transition>
    </div>
  </li>
</template>

<script>
import NoteItemEditMode from "./NoteItemEditMode.vue";
import Input from "../UI/Input.vue";

import { Tippy } from "vue-tippy";

import { mapActions, mapState } from "pinia";
import { noteStore } from "@/store/notes.js";

export default {
  components: {
    Tippy,
    NoteItemEditMode,
    Input,
  },

  data() {
    return {
      editMode: false,
    };
  },

  props: {
    note: {
      type: Object,
    },

    isOpen: {
      type: Boolean,
    },

    editable: {
      type: Boolean,
    },
  },

  computed: {
    ...mapState(noteStore, ["starNotes", "notes"]),
  },

  methods: {
    ...mapActions(noteStore, ["deleteNoteAction", "editNoteAction"]),

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
      this.$refs.tippySubmit.hide();
    },

    closeEdit() {
      this.$data.editMode = false;
      this.$emit("sortAction");
      this.editNoteAction(this.$props.note);
    },

    setStar() {
      this.$props.note.starred = !this.$props.note.starred;
      this.editNoteAction(this.$props.note);
    },
  },

  mounted() {
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
