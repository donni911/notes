<template>
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
            @clickEvent="$emit('editNote')"
            :tippyCaption="'Edit'"
            :icon="'fa-solid fa-pen'"
            :classes="'dark:[&>svg>path]:fill-body-dark-inner'"
          />
          <SvgButton
            v-else
            @clickEvent="$emit('closeEdit')"
            :tippyCaption="'Save'"
            :icon="'fa-solid fa-check'"
            :classes="'dark:[&>svg>path]:fill-body-dark-inner'"
          />
        </Transition>
      </div>

      <Transition mode="out-in" name="fade">
        <SvgButton
          v-if="!editMode"
          @clickEvent="$emit('setStar')"
          :icon="'fa-solid fa-star'"
          :tippyCaption="'Save this as important'"
          :classes="{
            '[&>svg>path]:fill-yellow-400 betterhover:group-hover:[&>svg>path]:fill-yellow-400':
              note.starred,
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
      </Transition>
    </div>
  </div>
</template>

<script>
import Badge from "../UI/Badge.vue";
import Button from "../UI/Button.vue";
import SvgButton from "../UI/SvgButton.vue";
import Input from "../UI/Input.vue";
import PrioritySelect from "../UI/PrioritySelect.vue";

export default {
  components: {
    Badge,
    Button,
    Input,
    PrioritySelect,
    SvgButton,
  },

  props: ["editable", "note", "editMode"],
};
</script>
