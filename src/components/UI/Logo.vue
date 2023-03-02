<template>
  <router-link :to="{ name: 'notes' }">
    <div class="flex items-center px-3 mb-4">
      <div
        class="mr-4 [&>svg]:w-5 [&>svg]:h-5 [&>svg>path]:fill-primary flex flex-center"
      >
        <font-awesome-icon icon="fa-solid fa-note-sticky " />
      </div>
      <span>EXPLORER NOTES</span>
    </div>
  </router-link>
</template>
