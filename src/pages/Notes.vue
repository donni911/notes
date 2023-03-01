<template>
  <div class="w-full h-full relative">
    <Input
      :placeholder="'Search note'"
      :classes="'shadow-md rounded-full px-4 py-3'"
    />
    <div
      v-if="!items"
      class="flex my-auto justify-center absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]"
    >
      <h4 class="text-text-muted">EMPTY LIST</h4>
    </div>
    <div v-else>
      <ul class="grid grid-cols-2 overflow-scroll">
        <li v-for="item in items" :key="item" class="h-[200px]">{{ item }}</li>
      </ul>
    </div>
    <AddNoteWrapper />
  </div>
</template>

<script>
import Input from "../components/UI/Input.vue";
import Button from "../components/UI/Button.vue";
import AddNoteWrapper from "../components/Notes/AddNoteWrapper.vue";

export default {
  components: { Input, Button, AddNoteWrapper },

  data() {
    return {};
  },
};
</script>
