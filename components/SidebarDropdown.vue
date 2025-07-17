<template>
  <div>
    <button
      @click="open = !open"
      :class="[
        'w-full flex items-center justify-between px-1 py-2 rounded font-semibold hover:bg-[#f58220]/10 transition-colors duration-200 focus:outline-none',
        isActive ? 'text-[#f58220]' : 'text-[#181818]',
      ]"
    >
      <span>
        <slot name="label">
          {{ label }}
        </slot>
      </span>
      <svg
        :class="[
          'w-4 h-4 ml-2 transition-transform',
          open ? 'rotate-90' : '',
          isActive ? 'stroke-[#f58220]' : 'stroke-[#181818]',
        ]"
        fill="none"
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
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
const props = defineProps<{ label: string; activePaths?: string[] }>();
const open = ref(false);
const route = useRoute();
const isActive = computed(() => {
  if (!props.activePaths) return false;
  return props.activePaths.some((path) => route.path.startsWith(path));
});
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
