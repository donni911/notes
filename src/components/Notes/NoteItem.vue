<template>
  <li
    class="rounded bg-white shadow-md p-4 transition"
    :class="{ '': editMode }"
  >
    <div class="flex justify-between items-center">
      <transition mode="out-in" name="fade">
        <Badge v-if="!editMode" :type="note.importanceLevel" />
        <priority-select
          v-else
          v-model="note.importanceLevel"
          class="mr-8"
          :placeholder="'Select priority'"
        />
      </transition>

      <div
        class="grid gap-4 flex-shrink-0"
        :class="{ 'grid-cols-2 ': editable }"
      >
        <Transition mode="out-in" name="fade">
          <div v-if="editable">
            <button
              v-if="!editMode"
              v-tippy="'Edit'"
              @click="editNote"
              class="p-2 -m-2 active:scale-90 group"
            >
              <div
                class="w-4 h-4 flex items-center justify-center [&>svg>path]:transition [&>svg>path]:fill-muted group-hover:[&>svg>path]:fill-body"
              >
                <font-awesome-icon icon="fa-solid fa-pen" />
              </div>
            </button>

            <button
              v-else
              v-tippy="'Save'"
              @click="closeEdit"
              class="p-2 -m-2 active:scale-90 group"
            >
              <div
                class="w-4 h-4 flex items-center justify-center [&>svg>path]:transition [&>svg>path]:fill-muted group-hover:[&>svg>path]:fill-body"
              >
                <font-awesome-icon icon="fa-solid fa-check" />
              </div>
            </button>
          </div>
        </Transition>

        <Transition mode="out-in" name="fade">
          <button
            v-if="!editMode"
            v-tippy="'Save this as important'"
            @click="setStar"
            class="p-2 -m-2 active:scale-90 group"
          >
            <div
              class="w-4 h-4 flex items-center justify-center [&>svg>path]:transition"
              :class="{
                '[&>svg>path]:fill-yellow-400': note.starred,
                ' [&>svg>path]:fill-muted group-hover:[&>svg>path]:fill-yellow-200':
                  !note.starred,
              }"
            >
              <font-awesome-icon icon="fa-solid fa-star" />
            </div>
          </button>

          <tippy
            v-else
            arrow
            interactive
            trigger="click"
            theme="tomato"
            ref="tippySubmit"
          >
            <template #default>
              <button class="p-2 -m-2 active:scale-90 group" v-tippy="'Delete'">
                <div
                  class="w-4 h-4 flex items-center justify-center [&>svg>path]:transition [&>svg>path]:fill-muted group-hover:[&>svg>path]:fill-body"
                >
                  <font-awesome-icon icon="fa-solid fa-trash" />
                </div>
              </button>
            </template>

            <template #content="{ hide }">
              <div class="p-1 text-center">
                <span class="inline-block text-center mb-1">Delete?</span>
                <div class="flex">
                  <button
                    @click="deleteNote"
                    class="py-1 px-2 mx-1 bg-warning rounded"
                  >
                    YES
                  </button>
                  <button
                    @click="hide()"
                    class="py-1 px-2 mx-1 border-2 border-muted transition-colors hover:bg-muted rounded"
                  >
                    NO
                  </button>
                </div>
              </div>
            </template>
          </tippy>
        </Transition>
      </div>
    </div>

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
    </div>
  </li>
</template>

<script>
import Badge from "../UI/Badge.vue";
import Button from "../UI/Button.vue";
import Input from "../UI/Input.vue";
import { Tippy } from "vue-tippy";

import PrioritySelect from "../UI/PrioritySelect.vue";

import { mapActions } from "pinia";
import { noteStore } from "@/store/notes.js";

export default {
  components: {
    Badge,
    Button,
    Tippy,
    Input,
    PrioritySelect,
  },

  data() {
    return {
      editMode: false,
      contentHeight: 0,
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

  methods: {
    ...mapActions(noteStore, ["deleteNoteAction", "editNoteAction"]),

    handleClickOutside(event) {
      if (this.$props.isOpen && !event.composedPath().includes(this.$el)) {
        this.closeEdit();
      }
    },

    editNote() {
      this.$data.editMode = true;
      this.$emit("openEditNote", this.$props.note);
    },

    deleteNote() {
      this.deleteNoteAction(this.note);
      this.$refs.tippySubmit.hide();
    },

    closeEdit() {
      this.editNoteAction();
      this.$data.editMode = false;
    },

    setStar() {
      this.$props.note.starred = !this.$props.note.starred;
      this.editNoteAction();
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
