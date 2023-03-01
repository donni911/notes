<template>
  <div class="absolute bottom-5 right-5">
    <Transition name="scale" mode="out-in">
      <Button
        v-if="!addNoteMode"
        @click-event="addNote"
        :icon="'fa-solid fa-plus'"
        :size="'lg'"
        :bg="'bg-rounded'"
      />
      <AddNote v-else @close-note="closeNote" />
    </Transition>
  </div>
</template>

<script>
import AddNote from "../UI/AddNote.vue";
import Button from "../UI/Button.vue";

export default {
  components: {
    AddNote,
    Button,
  },

  data() {
    return {
      addNoteMode: true,
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
.scale-enter-from {
  @apply scale-0;
}

.scale-enter-active,
.scale-leave-active {
  @apply transition;
}

.scale-enter-from,
.scale-leave-to {
  @apply opacity-0;
}
</style>
