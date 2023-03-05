<template>
  <nav class="mb-auto">
    <ul>
      <ButtonLink
        @click="$emit('clickEvent')"
        v-for="item in menuItems"
        :key="item"
        :item="item"
      />
    </ul>
  </nav>
</template>

<script>
import ButtonLink from "./ButtonLink.vue";
export default {
  components: { ButtonLink },
  inject: ["menuItems"],
};
</script>
