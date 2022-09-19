<script setup>
defineEmits(["close-modal"]);
defineProps({
  modalActive: {
    type: Boolean,
    default: false,
  },
  closeButtonVisible: {
    type: Boolean,
    default: true,
  },
  classPanel: {
    type: String,
    default: '',
  }
});
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-outer">
      <div v-show="modalActive"
        class="absolute w-full bg-black bg-opacity-30 h-screen top-0 left-0 z-45 flex justify-center px-8">
        <Transition name="modal-inner">
          <!-- mt-32 -->
          <div v-if="modalActive" class="p-4 bg-white self-center max-w-screen-md rounded-lg" :class="classPanel">
            <slot />
            <Button customColor="teal" class="mt-2" @click="$emit('close-modal')" v-show="closeButtonVisible">
              Close
            </Button>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-outer-enter-active,
.modal-outer-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-outer-enter-from,
.modal-outer-leave-to {
  opacity: 0;
}

.modal-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}

.modal-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.modal-inner-leave-to {
  transform: scale(0.8);
}
</style>