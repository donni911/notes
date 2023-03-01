<template>
  <button
    @click="$emit('clickEvent')"
    class="flex items-center justify-center [&>svg]:w-full [&>svg]:h-full transition active:scale-90"
  >
    <slot> Button</slot>
  </button>
</template>
