<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="modalStore.isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @click="handleBackdropClick"
      >
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        ></div>

        <!-- Modal Content -->
        <div
          class="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          @click.stop
        >
          <!-- Close Button -->
          <button
            @click="modalStore.closeModal()"
            class="absolute top-4 right-4 z-10 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
          >
            <svg
              class="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>

          <!-- Content -->
          <div class="p-8">
            <!-- Logo -->
            <div class="flex justify-center mb-6">
              <div class="relative">
                <div
                  class="bg-orange-500 text-white px-4 py-2 rounded-full font-bold text-xl"
                >
                  <span class="text-sm">vilaw.net.vn</span>
                </div>
                <div
                  class="absolute -top-1 -right-1 w-3 h-3 bg-orange-400 rounded-full"
                ></div>
                <div
                  class="absolute -bottom-1 -left-1 w-2 h-2 bg-orange-300 rounded-full"
                ></div>
              </div>
            </div>

            <!-- Message -->
            <div class="text-center mb-8">
              <p class="text-gray-700 text-lg leading-relaxed">
                {{ modalStore.message }}
              </p>
            </div>

            <!-- Title -->
            <h2 class="text-2xl font-bold text-gray-800 mb-6 text-left">
              {{ modalStore.title }}
            </h2>

            <!-- Packages Grid -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div
                v-for="pkg in modalStore.packages"
                :key="pkg.id"
                class="bg-gray-50 rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300"
              >
                <!-- Package Header -->
                <div class="bg-orange-500 text-white px-4 py-3">
                  <h3 class="font-semibold text-center">{{ pkg.name }}</h3>
                </div>

                <!-- Package Content -->
                <div class="p-4 bg-white">
                  <p
                    class="text-gray-700 text-sm leading-relaxed mb-4 min-h-[80px]"
                  >
                    {{ pkg.description }}
                  </p>

                  <div class="text-center mb-4">
                    <span class="text-orange-500 font-bold text-lg">{{
                      pkg.price
                    }}</span>
                  </div>

                  <button
                    @click="modalStore.handlePackageClick(pkg.id)"
                    class="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
                  >
                    {{ pkg.buttonText }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Disclaimer -->
            <div v-if="modalStore.disclaimer" class="text-left">
              <p class="text-gray-600 text-sm italic">
                {{ modalStore.disclaimer }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { useModalStore } from "~/stores/modal";

const modalStore = useModalStore();

const handleBackdropClick = () => {
  modalStore.closeModal();
};

// Close modal when pressing Escape key
onMounted(() => {
  const handleEscape = (event: KeyboardEvent) => {
    if (event.key === "Escape" && modalStore.isOpen) {
      modalStore.closeModal();
    }
  };

  document.addEventListener("keydown", handleEscape);

  onUnmounted(() => {
    document.removeEventListener("keydown", handleEscape);
  });
});
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.modal-enter-to,
.modal-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
