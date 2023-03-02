<template>
  <li class="rounded bg-white shadow-md p-4">
    <div class="flex justify-between items-center">
      <transition mode="out-in" name="fade">
        <Badge v-if="!editMode" :type="note.importanceLevel" />
        <Priority
          v-else
          :placeholder="'Select priority'"
          :options="optionSelect"
          @selectedValue="selectedMultiselectValue"
        />
      </transition>

      <div class="grid grid-cols-2 gap-4">
        <Transition mode="out-in" name="fade">
          <button
            v-if="!editMode"
            v-tippy="'Edit'"
            @click="editNote"
            class="p-2 -m-2 active:scale-90 group"
          >
            <div
              class="w-5 h-5 [&>svg>path]:transition [&>svg>path]:fill-muted group-hover:[&>svg>path]:fill-body"
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
              class="w-5 h-5 [&>svg>path]:transition [&>svg>path]:fill-muted group-hover:[&>svg>path]:fill-body"
            >
              <font-awesome-icon icon="fa-solid fa-check" />
            </div>
          </button>
        </Transition>
        <Transition mode="out-in" name="fade">
          <button
            v-if="!editMode"
            v-tippy="'Save this as important'"
            @click="setStar"
            class="p-2 -m-2 active:scale-90 group"
          >
            <div
              class="w-6 h-6 [&>svg>path]:transition"
              :class="{
                '[&>svg>path]:fill-yellow-400': note.starred,
                ' [&>svg>path]:fill-muted group-hover:[&>svg>path]:fill-yellow-200':
                  !note.starred,
              }"
            >
              <font-awesome-icon icon="fa-solid fa-star" />
            </div>
          </button>
          <button
            v-else
            v-tippy="'Delete Note'"
            @click="deleteNote"
            class="p-2 -m-2 active:scale-90 group"
          >
            <div
              class="w-5 h-5 [&>svg>path]:transition [&>svg>path]:fill-muted group-hover:[&>svg>path]:fill-body"
            >
              <font-awesome-icon icon="fa-solid fa-trash" />
            </div>
          </button>
        </Transition>
      </div>
    </div>

    <div class="mt-2">
      <transition mode="out-in" name="fade">
        <Input
          v-if="editMode"
          :classes="'p-1 body-inner border-2 border-body-inner mb-2 rounded'"
          :placeholder="'Note Title'"
          :value="note.title"
        />
        <h3 v-else class="text-lg font-bold mb-1">
          {{ note.title }}
        </h3>
      </transition>

      <transition mode="out-in" name="fade">
        <p v-if="!editMode">{{ note.description }}</p>
        <textarea
          v-else
          :value="note.description"
          class="mb-2 focus:outline-0 p-1 min-h-[35px] h-[250px] max-h-[250px] w-full body-inner border-2 border-body-inner rounded"
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

import Priority from "../UI/Priority.vue";

export default {
  components: {
    Badge,
    Button,
    Tippy,
    Input,
    Priority,
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
  },

  methods: {
    editNote() {
      this.$data.editMode = true;
    },

    closeEdit() {
      this.$data.editMode = false;
    },

    setStar() {
      this.$props.note.starred = !this.$props.note.starred;
    },
  },
};
</script>
