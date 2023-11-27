<script lang="ts" setup>
import { useRoute } from "vue-router";
import Form from "@/components/Form.vue";

const route = useRoute();
const id = route.params.id; // read parameter id (it is reactive) // see https://stackoverflow.com/questions/65284428/how-to-get-params-of-router-in-vue-3#answer-66953246
</script>

<template>
  <div class="post-container">
    <h2 class="post-title">Create Post</h2>
    <Form />
  </div>
</template>