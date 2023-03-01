<template>
  <article
    class="block overflow-hidden transition w-[300px] max-h-[500px] bg-article shadow relative p-2"
  >
    <div class="flex">
      <Priority />
      <div class="ml-auto">
        <Button
          @click-event="$emit('closeNote')"
          :icon="'fa-solid fa-close'"
          :size="'md'"
          :fill="'text'"
        />
      </div>
    </div>
    <div class="">
      <Input
        :classes="'p-1 body-inner border-2 border-body-inner mb-2'"
        :placeholder="'Note Title'"
      />

      <textarea
        class="focus:outline-0 p-1 min-h-[35px] h-[250px] max-h-[250px] w-full body-inner border-2 border-body-inner"
        placeholder="Note Description"
      />
    </div>
    <div>
      <ActionButton>Click</ActionButton>
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
};
</script>
