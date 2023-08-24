<template>
  <section class="flex items-center flex-col h-full pt-[10%]">
    <div class="mb-2">
      <h1 class="text-2xl lg:text-4xl text-center mb-4">
        Welcome to <br />
        <b> Adventurer Notes</b>
      </h1>
      <p class="text-center mb-2">To get started, please sign up</p>
    </div>
    <form
      class="max-w-[350px] w-full gap-4 flex flex-col"
      @submit.prevent="handleRegisterUser"
    >
      <div>
        <Input
          v-model="userRegisterInfo.name"
          placeholder="Name"
          :classes="'shadow-md rounded-full px-4 py-3 w-full'"
        />
        <p
          class="text-primary pt-1 pl-4"
          v-if="errorMessages && errorMessages.name?.message"
        >
          {{ errorMessages.name.message }}
        </p>
      </div>
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
      <button
        type="submit"
        class="bg-primary select-none text-white px-2 py-4 rounded-full active:scale-95 cursor-pointer hover:bg-secondary transition-all"
        :class="{ 'flex justify-center': isLoading }"
      >
        <div v-if="isLoading" role="status">
          <svg
            aria-hidden="true"
            class="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-primary"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
        <span v-else>Sign Up</span>
      </button>

      <p>
        Already have an account?
        <router-link class="text-primary" to="/login"
          >Click to login</router-link
        >
      </p>
    </form>
  </section>
</template>

<script>
import Input from "../../components/UI/Input.vue";
import { createUser } from "../../services/userApi.js";

import { mapActions } from "pinia";
import { userSettingsStore } from "../../store/userSettings.js";

export default {
  data() {
    return {
      userRegisterInfo: {
        name: "",
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

    async handleRegisterUser() {
      this.isLoading = true;

      try {
        const response = await createUser(this.userRegisterInfo);
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
  },
};
</script>
