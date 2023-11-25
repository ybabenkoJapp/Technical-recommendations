<script lang="ts" setup>
const props = defineProps<{ show: boolean }>();
</script>

<template>
  <Teleport to="body">
    <div v-if="show" class="modal-wrapper">
      <div class="inner d-flex justify-center">
        <div
          ref="modal"
          aria-modal="true"
          class="modal w-50 rounded-xl overflow-hidden bg-white position-relative"
          role="dialog"
        >
          <button
            class="close-btn position-absolute"
            @click="$emit('update:show', false)"
          >
            <span class="close">&times;</span>
          </button>
          <slot />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.modal-wrapper {
  position: fixed;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.8);
  overflow-y: auto;
  inset: 0;
}

.inner {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.modal {
  padding: 32px;
  height: max-content;
}

.close-btn {
  top: 32px;
  right: 32px;
}
</style>
