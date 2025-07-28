<template>
  <Transition
    enter-active-class="transition ease-out duration-300"
    enter-from-class="transform opacity-0 scale-95"
    enter-to-class="transform opacity-100 scale-100"
    leave-active-class="transition ease-in duration-200"
    leave-from-class="transform opacity-100 scale-100"
    leave-to-class="transform opacity-0 scale-95"
  >
    <div v-if="show" class="fixed top-4 right-4 z-50 max-w-sm w-full">
      <div
        :class="[
          'rounded-lg shadow-lg p-4 border-l-4',
          type === 'success'
            ? 'bg-green-50 border-green-400 text-green-800 dark:bg-green-900/20 dark:border-green-500 dark:text-green-300'
            : type === 'error'
            ? 'bg-red-50 border-red-400 text-red-800 dark:bg-red-900/20 dark:border-red-500 dark:text-red-300'
            : type === 'warning'
            ? 'bg-yellow-50 border-yellow-400 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-500 dark:text-yellow-300'
            : 'bg-blue-50 border-blue-400 text-blue-800 dark:bg-blue-900/20 dark:border-blue-500 dark:text-blue-300',
        ]"
      >
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <!-- Success Icon -->
            <svg
              v-if="type === 'success'"
              class="h-5 w-5 text-green-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              />
            </svg>

            <!-- Error Icon -->
            <svg
              v-else-if="type === 'error'"
              class="h-5 w-5 text-red-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clip-rule="evenodd"
              />
            </svg>

            <!-- Warning Icon -->
            <svg
              v-else-if="type === 'warning'"
              class="h-5 w-5 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>

            <!-- Info Icon -->
            <svg
              v-else
              class="h-5 w-5 text-blue-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd"
              />
            </svg>
          </div>

          <div class="ml-3 flex-1">
            <p class="text-sm font-medium">
              {{ title }}
            </p>
            <p v-if="message" class="mt-1 text-sm opacity-90">
              {{ message }}
            </p>
          </div>

          <div class="ml-4 flex-shrink-0 flex">
            <button
              @click="close"
              class="inline-flex text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none focus:text-gray-600 dark:focus:text-gray-300 transition-colors duration-200"
            >
              <span class="sr-only">Đóng</span>
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
interface Props {
  show: boolean;
  type: "success" | "error" | "warning" | "info";
  title: string;
  message?: string;
  duration?: number;
}

const props = withDefaults(defineProps<Props>(), {
  duration: 5000,
});

const emit = defineEmits<{
  close: [];
}>();

const close = () => {
  emit("close");
};

// Auto close after duration
watch(
  () => props.show,
  (newShow) => {
    if (newShow && props.duration > 0) {
      setTimeout(() => {
        close();
      }, props.duration);
    }
  }
);
</script>
