<template>
  <div>
    <ul>
      <ButtonLink
        :item="{
          linkName: 'settings',
          name: 'Settings',
          icon: 'fa-solid fa-gear',
        }"
      />
      <ButtonLink
        :item="{
          icon: 'fa-solid fa-code-branch',
        }"
      >
        <a
          href="https://github.com/donni911/notes"
          class="before:absolute before:content-[''] before:inset-0 mx-4 dark:text-dark-text transition-colors"
          >Repository</a
        >
      </ButtonLink>
    </ul>
  </div>
</template>

<script>
import ButtonLink from "./ButtonLink.vue";
export default {
  components: { ButtonLink },
};
</script>
