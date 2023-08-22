<template>
  <article
    class="block overflow-hidden transition w-[300px] max-h-[500px] dark:bg-body-dark-side bg-article shadow relative p-2 rounded"
  >
    <div class="flex items-center mb-2">
      <priority-select
        v-model="priorityValue"
        :placeholder="'Select priority'"
      />
      <div class="ml-auto">
        <button
          @click="$emit('closeNote')"
          class="[&>svg>path]:fill-text p-2 w-8 h-8 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full transition active:scale-90"
        >
          <font-awesome-icon icon="fa-solid fa-close" />
        </button>
      </div>
    </div>
    <div>
      <Input
        v-model="title"
        @submit.prevent
        :classes="'p-1 body-inner w-full border-2 border-body-inner mb-2 rounded'"
        :placeholder="'Note Title'"
      />
      <textarea
        v-model="description"
        class="mb-2 focus:outline-0 p-1 min-h-[35px] h-[250px] max-h-[250px] w-full body-inner border-2 border-body-inner dark:bg-dark-input rounded"
        placeholder="Note Description"
      />
    </div>
    <div class="flex items-center">
      <ActionButton :type="'submit'" @click-event="submitNote">
        Add Note</ActionButton
      >
      <transition name="fade">
        <p v-if="!isFilled" class="ml-4 text-error">
          Please fill in everything
        </p>
      </transition>
    </div>
  </article>
</template>

<script>
import ActionButton from "../UI/ActionButton.vue";
import Input from "../UI/Input.vue";
import PrioritySelect from "../UI/PrioritySelect.vue";

import { mapActions } from "pinia";
import { noteStore } from "@/store/notes.js";

export default {
  components: {
    ActionButton,
    Input,
    PrioritySelect,
  },

  props: {
    isOpen: {
      type: Boolean,
    },
  },

  data() {
    return {
      title: "",
      description: "",
      priorityValue: null,
      isFilled: true,
    };
  },

  methods: {
    ...mapActions(noteStore, ["addNoteAction"]),

    cleanValues() {
      this.$data.title = "";
      this.$data.description = "";
      this.$data.priorityValue = null;
      this.isFilled = false;
    },

    handleClickOutside(event) {
      if (this.$props.isOpen && !event.composedPath().includes(this.$el)) {
        this.$emit("closeNote");
      }
    },

    submitNote() {
      if (this.title && this.description && this.priorityValue) {
        this.$emit("closeNote");

        this.addNoteAction({
          title: this.title,
          description: this.description,
          importanceLevel: this.priorityValue,
        });

        this.cleanValues();
      } else {
        this.$data.isFilled = false;
      }
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
.fade-enter-active,
.fade-leave-active {
  @apply transition;
}

.fade-enter-from,
.fade-leave-to {
  @apply opacity-0;
}
</style>
