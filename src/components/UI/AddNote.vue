<template>
  <article
    class="block overflow-hidden transition w-[300px] max-h-[500px] bg-article shadow relative p-2 rounded"
  >
    <div class="flex items-center mb-2">
      <Priority
        :placeholder="'Select priority'"
        @selectedValue="selectedMultiselectValue"
      />
      <div class="ml-auto">
        <Button
          @click-event="$emit('closeNote')"
          :icon="'fa-solid fa-close'"
          :size="'md'"
          :fill="'text'"
        />
      </div>
    </div>
    <div>
      <Input
        v-model="title"
        @submit.prevent
        :classes="'p-1 body-inner border-2 border-body-inner mb-2 rounded'"
        :placeholder="'Note Title'"
      />
      <textarea
        v-model="description"
        class="mb-2 focus:outline-0 p-1 min-h-[35px] h-[250px] max-h-[250px] w-full body-inner border-2 border-body-inner rounded"
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
import ActionButton from "./ActionButton.vue";
import Button from "./Button.vue";
import Input from "./Input.vue";
import Priority from "./Priority.vue";

export default {
  components: {
    ActionButton,
    Button,
    Input,
    Priority,
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
    selectedMultiselectValue(value) {
      this.$data.priorityValue = value;
    },

    cleanValues() {
      this.$data.title = "";
      this.$data.description = "";
      this.$data.priorityValue = null;
    },

    handleClickOutside(event) {
      if (this.$props.isOpen && !event.composedPath().includes(this.$el)) {
        this.$emit("closeNote");
      }
    },

    submitNote() {
      if (this.title && this.description && this.priorityValue) {
        this.isFilled = false;
        this.cleanValues();
        this.$emit("closeNote");
        console.log({
          title: this.title,
          description: this.description,
          priority: this.priorityValue,
        });
      } else {
        this.isFilled = false;
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
