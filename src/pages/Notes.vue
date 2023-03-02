<template>
  <div class="w-full h-full relative">
    <Input
      :placeholder="'Search note'"
      :classes="'shadow-md rounded-full px-4 py-3 mb-4'"
    />
    <div
      v-if="!notes"
      class="flex my-auto justify-center absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]"
    >
      <h4 class="text-muted">EMPTY LIST</h4>
    </div>
    <div v-else class="py-4 h-[calc(100%-50px)] overflow-y-scroll">
      <NotesList :notes="notes" />
    </div>
    <AddNoteWrapper />
  </div>
</template>

<script>
import Input from "../components/UI/Input.vue";
import Button from "../components/UI/Button.vue";
import AddNoteWrapper from "../components/Notes/AddNoteWrapper.vue";
import NotesList from "../components/Notes/NotesList.vue";

export default {
  components: { Input, Button, AddNoteWrapper, NotesList },

  data() {
    return {
      notes: [
        {
          title: "Buy a new car",
          description: "It should be fantasic idea to buy a car!",
          starred: false,
          importanceLevel: "high",
        },
        {
          title: "Buy a new car",
          description:
            " It should be fantasic idea to buy a car! It should be fantasic idea to buy a car! It should be fantasic idea to buy a car!",
          starred: true,
          importanceLevel: "medium",
        },
        {
          title: "Buy a new car",
          description:
            " It should be fantasic idea to buy a car! It should be fantasic idea to buy a car! It should be fantasic idea to buy a car!",
          starred: false,
          importanceLevel: "low",
        },
        {
          title: "Buy a new car",
          description:
            " It should be fantasic idea to buy a car! It should be fantasic idea to buy a car! It should be fantasic idea to buy a car!",
          starred: false,
          importanceLevel: "low",
        },
        {
          title: "Buy a new car",
          description:
            " It should be fantasic idea to buy a car! It should be fantasic idea to buy a car! It should be fantasic idea to buy a car!",
          starred: false,
          importanceLevel: "low",
        },
        {
          title: "Buy a new car",
          description:
            " It should be fantasic idea to buy a car! It should be fantasic idea to buy a car! It should be fantasic idea to buy a car!",
          starred: false,
          importanceLevel: "low",
        },
        {
          title: "Buy a new car",
          description:
            " It should be fantasic idea to buy a car! It should be fantasic idea to buy a car! It should be fantasic idea to buy a car!",
          starred: false,
          importanceLevel: "low",
        },
        {
          title: "Buy a new car",
          description:
            " It should be fantasic idea to buy a car! It should be fantasic idea to buy a car! It should be fantasic idea to buy a car!",
          starred: false,
          importanceLevel: "low",
        },
        {
          title: "Buy a new car",
          description:
            " It should be fantasic idea to buy a car! It should be fantasic idea to buy a car! It should be fantasic idea to buy a car!",
          starred: false,
          importanceLevel: "low",
        },
        {
          title: "Buy a new car",
          description:
            " It should be fantasic idea to buy a car! It should be fantasic idea to buy a car! It should be fantasic idea to buy a car!",
          starred: false,
          importanceLevel: "low",
        },
      ],
    };
  },
};
</script>
