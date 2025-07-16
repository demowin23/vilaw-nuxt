<template>
  <div>
    <button
      @click="open = !open"
      class="w-full flex items-center justify-between px-1 py-2 rounded text-[#f58220] font-semibold hover:bg-[#f58220]/10 transition-colors duration-200 focus:outline-none"
    >
      <span>
        <slot name="label">
          {{ label }}
        </slot>
      </span>
      <svg
        :class="['w-4 h-4 ml-2 transition-transform', open ? 'rotate-90' : '']"
        fill="none"
        stroke="#f58220"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 5l7 7-7 7"
        />
      </svg>
    </button>
    <transition name="fade">
      <div v-if="open" class="pl-2 mt-1 space-y-1">
        <slot />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const props = defineProps<{ label: string }>();
const open = ref(false);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
