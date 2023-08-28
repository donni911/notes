<template>
  <div>
    <div class="flex justify-between items-center">
      <priority-select
        v-model="note.importanceLevel"
        class="mr-8"
        :placeholder="'Select priority'"
      />

      <div class="grid gap-4 grid-cols-2 items-baseline flex-shrink-0">
        <SvgButton
          @clickEvent="$emit('closeEdit')"
          :tippyCaption="'Save'"
          :icon="'fa-solid fa-check'"
          :classes="'dark:[&>svg>path]:fill-body-dark-inner'"
        />

        <tippy
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
                  @click="$emit('deleteNote')"
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
      </div>
    </div>
    <div class="mt-2">
      <Input
        :classes="'p-1 body-inner border-2 border-body-inner mb-2 rounded w-full'"
        :placeholder="'Note Title'"
        v-model="note.title"
      />

      <textarea
        v-model="note.description"
        class="mb-2 focus:outline-0 p-1 min-h-[35px] h-[150px] max-h-[250px] w-full body-inner border-2 border-body-inner rounded"
        placeholder="Note Description"
      />
    </div>
  </div>
</template>

<script>
import SvgButton from "../UI/SvgButton.vue";
import Input from "../UI/Input.vue";
import PrioritySelect from "../UI/PrioritySelect.vue";

export default {
  components: {
    Input,
    SvgButton,
    PrioritySelect,
  },

  props: ["note"],
};
</script>
