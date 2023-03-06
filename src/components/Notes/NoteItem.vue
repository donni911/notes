<template>
  <li
    class="rounded bg-white transition-colors dark:bg-dark-text shadow-md p-4"
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
        class="grid gap-4 items-baseline flex-shrink-0"
        :class="{ 'grid-cols-2 ': editable }"
      >
        <div v-if="editable">
          <Transition mode="out-in" name="fade">
            <SvgButton
              v-if="!editMode"
              @clickEvent="editNote"
              :tippyCaption="'Edit'"
              :icon="'fa-solid fa-pen'"
              :classes="'dark:[&>svg>path]:fill-body-dark-inner'"
            />
            <SvgButton
              v-else
              @clickEvent="closeEdit"
              :tippyCaption="'Save'"
              :icon="'fa-solid fa-check'"
              :classes="'dark:[&>svg>path]:fill-body-dark-inner'"
            />
          </Transition>
        </div>

        <Transition mode="out-in" name="fade">
          <SvgButton
            v-if="!editMode"
            @clickEvent="setStar"
            :icon="'fa-solid fa-star'"
            :tippyCaption="'Save this as important'"
            :classes="{
              '[&>svg>path]:fill-yellow-400': note.starred,
              '[&>svg>path]:fill-muted dark:[&>svg>path]:fill-body betterhover:group-hover:[&>svg>path]:fill-yellow-200':
                !note.starred,
            }"
          />

          <tippy
            v-else
            arrow
            interactive
            trigger="click"
            theme="tomato"
            ref="tippySubmit"
          >
            <template #default>
              <SvgButton
                :icon="'fa-solid fa-trash'"
                :tippy-caption="'Delete'"
                :classes="'dark:[&>svg>path]:fill-body-dark-inner'"
              />
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
                    class="py-1 px-2 mx-1 border-2 border-muted transition-colors betterhover:hover:bg-muted rounded"
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
      <transition name="fade">
        <div v-if="note.time && !editMode" class="mt-2 text-sm text-gray-500">
          <i>{{ `Task was ${edited ? "edited" : "added"} at ` + note.time }}</i>
        </div>
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
import SvgButton from "../UI/SvgButton.vue";

export default {
  components: {
    Badge,
    Button,
    Tippy,
    Input,
    PrioritySelect,
    SvgButton,
  },

  data() {
    return {
      editMode: false,
      edited: false,
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
      this.$data.editMode = false;
      (this.$props.note.time = new Date().toLocaleString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      })),
        (this.edited = true);
      this.editNoteAction();
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
