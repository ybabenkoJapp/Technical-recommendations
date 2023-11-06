<script lang="ts" setup>
import { ref } from "vue";

const valid = ref(false);
const title = ref("");
const body = ref("");
const nameRules = [
  (value) => {
    if (value) return true;

    return "Name is required.";
  },
  (value) => {
    if (value?.length <= 10) return true;

    return "Name must be less than 10 characters.";
  },
];
</script>

<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col>
          <v-text-field
            v-model="title"
            :counter="10"
            :rules="nameRules"
            hide-details
            label="Post title"
            required
          ></v-text-field>
        </v-col>

        <v-col>
          <v-text-field
            v-model="body"
            :counter="10"
            :rules="nameRules"
            hide-details
            label="Post body"
            required
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>