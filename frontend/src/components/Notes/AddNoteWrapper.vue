<template>
  <div class="absolute bottom-5 right-5">
    <Transition name="scale" mode="out-in">
      <button
        v-if="!addNoteMode"
        @click="addNote"
        class="[&>svg>path]:fill-white bg-muted betterhover:hover::bg-secondary shadow-md rounded-full dark:bg-body-dark-side p-3 w-12 h-12 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full transition active:scale-90"
      >
        <font-awesome-icon icon="fa-solid fa-plus" />
      </button>

      <AddNote v-else @close-note="closeNote" :isOpen="addNoteMode" />
    </Transition>
  </div>
</template>

<script>
import AddNote from "./AddNote.vue";

export default {
  components: {
    AddNote,
  },

  data() {
    return {
      addNoteMode: false,
    };
  },

  methods: {
    addNote() {
      this.$data.addNoteMode = true;
    },
    closeNote() {
      this.$data.addNoteMode = false;
    },
  },
};
</script>

<style>
.scale-enter-active,
.scale-leave-active {
  @apply transition;
}

.scale-enter-from,
.scale-leave-to {
  @apply opacity-0 scale-0;
}
</style>
