<script lang="ts" setup>
import { useRoute } from "vue-router";

const route = useRoute();
const id = route.params.id; // read parameter id (it is reactive) // see https://stackoverflow.com/questions/65284428/how-to-get-params-of-router-in-vue-3#answer-66953246
</script>

<template>
  <h3><strong> I'm post component </strong></h3>
  <p v-if="id"><strong>Post id:</strong> {{ id }}</p>
  <slot />
</template>

<style scoped></style>