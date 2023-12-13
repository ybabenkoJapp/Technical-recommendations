<script lang="ts" setup>
import { ref, watchEffect } from "vue";
import { useAuthStore } from "@/stores";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const username = ref("");
const password = ref("");
const router = useRouter();

const login = async () => {
  // Hardcoded user credentials
  const hardcodedUser = {
    username: "editor",
    password: "admin",
  };

  try {
    if (
      username.value === hardcodedUser.username &&
      password.value === hardcodedUser.password
    ) {
      authStore.setCurrentUser(username.value);
      authStore.setAuthenticated(true);
      // Redirect to home or user page
      await router.push({
        name: "users",
      });
    } else {
      await authStore.login(username.value);
      await router.push({
        name: "home",
      });
    }
  } catch (error) {
    console.error(error);
    setUsernameError("Invalid credentials");
    setPasswordError("Invalid credentials");
  }
};

const usernameErrorMessages = ref<string[]>([]);
const passwordErrorMessages = ref<string[]>([]);

const validateUsername = () => {
  usernameErrorMessages.value = [];
  if (!username.value) {
    usernameErrorMessages.value.push("Username is required");
  }
};

const validatePassword = () => {
  passwordErrorMessages.value = [];
  if (!password.value) {
    passwordErrorMessages.value.push("Password is required");
  }
};

watchEffect(() => {
  validateUsername();
  validatePassword();
});

// track end input paste data
const setUsernameError = (message: string) => {
  usernameErrorMessages.value = [message];
};

const setPasswordError = (message: string) => {
  passwordErrorMessages.value = [message];
};

// add simple validation for email and password minimal password length
</script>

<template>
  <v-container class="h-screen justify-center align-center d-flex" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" md="6" sm="8">
        <v-card>
          <v-card-title class="text-h5">Login</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="login">
              <v-text-field
                v-model="username"
                :error-messages="usernameErrorMessages"
                label="Username"
                required
              ></v-text-field>
              <v-text-field
                v-model="password"
                :error-messages="passwordErrorMessages"
                label="Password"
                required
                type="password"
              ></v-text-field>
              <v-btn color="primary" type="submit">Login</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>