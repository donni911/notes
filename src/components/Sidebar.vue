<template>
  <section class="pt-4 pb-2 px-4 w-[255px] h-full flex flex-col">
    <router-link :to="{ name: 'home' }">
      <div class="flex items-center">
        <div class="mr-4">
          <font-awesome-icon icon="fa-solid fa-user " />
        </div>
        <span>Notes App</span>
      </div>
    </router-link>
    <nav class="mb-auto">
      <ul>
        <li v-for="item in menuItems" :key="item">
          <router-link :to="{ name: item.linkName }">{{
            item.name
          }}</router-link>
        </li>
      </ul>
    </nav>

    <div class="">
      <ul>
        <li>
          <router-link :to="{ name: 'settings' }">Settings</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'settings' }"
            ><font-awesome-icon
              icon="fa-solid fa-code-branch"
            />Repository</router-link
          >
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    menuItems: {
      type: Array,
      required: true,
    },
  },
};
</script>
