<template>
  <teleport to="body">
    <div v-if="is_open"
      class="fixed top-0 bottom-0 w-screen h-screen z-50 backdrop-blur-sm flex items-center justify-center backdrop-brightness-[.3] animate__animated animate__fadeIn animate__faster">
      <div class="bg-white rounded-md relative animate__animated animate__fadeInDown animate__faster">
        <div @click="emit('close-modal')"
          class="absolute right-2 top-1 p-1 pl-2 pr-2  font-bold text-xl text-[var(--red)] cursor-pointer hover:bg-[var(--red)] hover:text-white hover:rounded-full">
          x
        </div>
        <slot />
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
export interface ModalState<States> {
  is_open: boolean;
  state: States
}

defineProps({
  is_open: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(["close-modal"]);
</script>
