<script lang="ts" setup>
import { ref } from "vue";

const props = defineProps<{ block: { name: string } }>();
const emit = defineEmits(["pass-post"]);

function pushPost(emittedValue: unknown) {
  console.log("emittedValue: ", emittedValue);
  emit("pass-post", emittedValue);
}

const open = ref(false);
</script>

<template>
  <button @click="open = true">{{ block?.name }}</button>
  <div v-if="open" class="modal">
    <div class="modal-content">
      <button class="close-btn" @click="open = false">
        <span class="close">&times;</span>
      </button>
      <!--      <CreatePost @push-post="pushPost" />-->
      <slot></slot>
    </div>
  </div>
</template>
<style scoped>
.modal {
  position: fixed;
  left: 0;
  top: 0;

  z-index: 5000;

  width: 100vw;
  height: 100vh;

  background: rgba(0, 0, 0, 0.2);

  display: grid;
  place-items: center;
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  width: 50%; /* Could be more or less, depending on screen size */
  position: relative;
}

/* The Close Button */
.close-btn {
  position: absolute;
  right: 40px;
  top: 67px;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>