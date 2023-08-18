<template>
  <router-link :to="{ name: 'notes' }">
    <div class="flex items-center px-3 mb-4">
      <div
        class="mr-4 [&>svg]:w-5 [&>svg]:h-5 [&>svg>path]:fill-primary transition-colors dark:[&>svg>path]:fill-dark-text flex flex-center"
      >
        <font-awesome-icon icon="fa-solid fa-note-sticky " />
      </div>
      <span class="dark:text-dark-text">EXPLORER NOTES</span>
    </div>
  </router-link>
</template>
