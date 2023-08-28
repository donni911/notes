<template>
  <section class="flex items-center flex-col h-full pt-[10%]">
    <div class="mb-2">
      <h1 class="text-2xl lg:text-4xl text-center mb-4">
        Welcome to <br />
        <b> Adventurer Notes</b>
      </h1>
      <p class="text-center mb-2">To get started, please login</p>
    </div>
    <form
      class="max-w-[350px] w-full gap-4 flex flex-col"
      @submit.prevent="handleLoginUser"
    >
      <div>
        <Input
          v-model="userRegisterInfo.email"
          placeholder="Email"
          :classes="'shadow-md rounded-full px-4 py-3 w-full'"
          type="email"
        />
        <p
          class="text-primary pt-1 pl-4"
          v-if="errorMessages && errorMessages.email?.message"
        >
          {{ errorMessages.email.message }}
        </p>
      </div>
      <div>
        <Input
          v-model="userRegisterInfo.password"
          placeholder="Password"
          :classes="'shadow-md rounded-full px-4 py-3 w-full'"
          :type="isPasswordVisible ? 'text' : 'password'"
          ref="password"
        />
        <p
          class="text-primary pt-1 pl-4"
          v-if="errorMessages && errorMessages.password?.message"
        >
          {{ errorMessages.password.message }}
        </p>
      </div>
      <div class="flex items-center justify-end">
        <input
          id="checked-checkbox"
          type="checkbox"
          class="w-4 h-4"
          @click="togglePasswordVisibility"
        />
        <label
          for="checked-checkbox"
          class="ml-2 text-sm text-gray-900 dark:text-gray-300 select-none"
          >Show Password</label
        >
      </div>

      <LoadingButton :status="isLoading" :text="'Login'" />

      <p>
        Already have an account?
        <router-link class="text-primary" to="/register"
          >Click to register</router-link
        >
      </p>
    </form>
  </section>
</template>

<script>
import Input from "../../components/UI/Input.vue";
import LoadingButton from "./UI/LoadingButton.vue";
import { loginUser } from "../../services/userApi.js";

import { mapActions } from "pinia";
import { userSettingsStore } from "../../store/userSettings.js";

export default {
  data() {
    return {
      userRegisterInfo: {
        email: "",
        password: "",
      },

      isLoading: false,

      errorMessages: "",
      isPasswordVisible: false,
    };
  },

  computed: {
    isFormIncomplete() {
      return (
        !this.userRegisterInfo.name ||
        !this.userRegisterInfo.email ||
        !this.userRegisterInfo.password
      );
    },
  },

  methods: {
    ...mapActions(userSettingsStore, ["setUser", "getUserDetails"]),

    async handleLoginUser() {
      this.isLoading = true;

      try {
        const response = await loginUser(this.userRegisterInfo);
        let token = response.data.token;

        if (token) {
          this.setUser(token);
          this.$router.push("/");
          this.getUserDetails();
        }
      } catch (err) {
        this.errorMessages = err.response.data.errors;
      } finally {
        this.isLoading = false;
      }
    },

    togglePasswordVisibility() {
      this.isPasswordVisible = !this.isPasswordVisible;
    },
  },

  components: {
    Input,
    LoadingButton,
  },
};
</script>
