<template>
  <div v-if="!isChatPage">
    <button
      class="fixed bottom-6 right-6 z-50 bg-[#f58220] text-white rounded-full shadow-lg w-16 h-16 flex items-center justify-center text-3xl hover:bg-[#e06d00] transition"
      @click="open = true"
      aria-label="Chat với luật sư"
    >
      <font-awesome-icon :icon="['fas', 'comments']" />
    </button>
    <transition name="fade">
      <div
        v-if="open"
        class="fixed bottom-24 right-6 z-50 bg-white rounded-xl shadow-2xl w-80 max-w-full p-6 flex flex-col items-center animate-fade-in"
      >
        <button
          class="absolute top-2 right-2 text-gray-400 hover:text-[#f58220] text-xl"
          @click="open = false"
          aria-label="Đóng chat"
        >
          <font-awesome-icon :icon="['fas', 'times']" />
        </button>
        <h2 class="text-xl font-bold text-[#f58220] mb-2">Chat với Luật sư</h2>
        <p class="mb-4 text-center">
          Liên hệ với luật sư để được tư vấn pháp luật trực tuyến.
        </p>
        <button
          class="px-6 py-3 bg-[#f58220] text-white font-bold rounded-lg shadow hover:bg-[#e06d00] transition"
        >
          Tư vấn ngay
        </button>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faComments, faTimes } from "@fortawesome/free-solid-svg-icons";
library.add(faComments, faTimes);
const open = ref(false);
const route = useRoute();
const isChatPage = computed(() => route.path === "/chat-luat-su");
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
