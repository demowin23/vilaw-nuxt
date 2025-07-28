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
        class="fixed bottom-24 right-6 z-50 bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-[350px] max-w-[95vw] p-0 flex flex-col animate-fade-in"
        style="height: 480px; max-height: 80vh"
      >
        <button
          class="absolute top-2 right-2 text-gray-400 hover:text-[#f58220] text-lg z-10 pointer-events-auto"
          @click="closeChat"
          aria-label="Đóng chat"
        >
          <font-awesome-icon :icon="['fas', 'times']" />
        </button>
        <!-- Header -->
        <div
          class="flex items-center justify-center border-b border-gray-200 dark:border-gray-600 min-h-[40px] relative bg-white dark:bg-gray-800 rounded-t-xl"
        >
          <h2 class="text-base font-bold text-[#f58220] text-center m-0">
            Chat với Luật sư
          </h2>
        </div>
        <!-- Danh sách tin nhắn -->
        <div
          ref="messagesEnd"
          class="flex-1 space-y-2 my-1 px-2 pr-1 h-[250px] overflow-y-auto bg-white dark:bg-gray-800 text-sm"
        >
          <div
            v-for="(msg, idx) in messages"
            :key="idx"
            class="flex flex-col"
            :class="msg.isUser ? 'items-end' : 'items-start'"
          >
            <div
              class="inline-block px-3 py-1.5 rounded-lg mb-1 mx-1"
              :class="
                msg.isUser
                  ? 'bg-[#f58220] text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
              "
            >
              <template v-if="msg.type === 'text'">
                {{ msg.content }}
              </template>
              <template v-else-if="msg.type === 'image'">
                <img
                  :src="msg.content"
                  class="max-w-[120px] max-h-24 rounded-lg"
                />
              </template>
              <template v-else-if="msg.type === 'file'">
                <a
                  :href="msg.content"
                  target="_blank"
                  class="underline text-blue-600 dark:text-blue-400"
                  >Tải file</a
                >
              </template>
            </div>
          </div>
        </div>
        <!-- Nhập tin nhắn và gửi -->
        <form
          class="flex gap-1 items-end mt-1 p-2 bg-white dark:bg-gray-800 rounded-b-xl"
          @submit.prevent="sendMessage"
        >
          <input
            v-model="input"
            type="text"
            placeholder="Nhập tin nhắn..."
            class="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#f58220] bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 text-sm"
            @keydown.enter.exact.prevent="sendMessage"
          />
          <input
            ref="fileInput"
            type="file"
            class="hidden"
            @change="handleFileChange"
          />
          <button
            type="button"
            @click="triggerFileInput"
            class="bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-lg px-2 py-1 transition-colors duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 text-[#f58220]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.586-6.586a4 4 0 10-5.656-5.656l-6.586 6.586a6 6 0 108.486 8.486l6.586-6.586"
              />
            </svg>
          </button>
          <button
            type="submit"
            class="bg-[#f58220] text-white font-bold rounded-lg px-3 py-1 hover:bg-[#e06d00] transition-colors duration-300 text-sm"
          >
            Gửi
          </button>
        </form>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from "vue";
import { useRoute } from "vue-router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faComments, faTimes } from "@fortawesome/free-solid-svg-icons";
library.add(faComments, faTimes);

const open = ref(false);
const route = useRoute();
const isChatPage = computed(() => route.path === "/chat-luat-su");

interface Message {
  type: "text" | "image" | "file";
  content: string;
  isUser: boolean;
}

const messages = ref<Message[]>([
  {
    type: "text",
    content: "Xin chào Luật sư! Tôi muốn hỏi về thủ tục ly hôn.",
    isUser: true,
  },
  {
    type: "text",
    content:
      "Chào bạn! Tôi rất vui được hỗ trợ bạn. Bạn vui lòng cung cấp thêm thông tin về trường hợp của mình?",
    isUser: false,
  },
  {
    type: "text",
    content:
      "Tôi và chồng đã ly thân 2 năm, có 1 con chung 5 tuổi. Chúng tôi đã thống nhất về việc nuôi con.",
    isUser: true,
  },
  {
    type: "text",
    content:
      "Cảm ơn bạn đã chia sẻ. Để tiến hành ly hôn, bạn cần chuẩn bị: giấy đăng ký kết hôn, giấy khai sinh của con, sổ hộ khẩu và các giấy tờ tài sản chung nếu có.",
    isUser: false,
  },
  {
    type: "text",
    content: "Vậy thủ tục sẽ mất bao lâu và chi phí như thế nào ạ?",
    isUser: true,
  },
  {
    type: "text",
    content:
      "Thủ tục ly hôn thuận tình thường mất 1-2 tháng. Chi phí bao gồm: lệ phí tòa án khoảng 300.000đ, phí công chứng hợp đồng ly hôn khoảng 200.000đ. Bạn có muốn tôi hỗ trợ soạn đơn không?",
    isUser: false,
  },
]);
const input = ref("");
const fileInput = ref<HTMLInputElement | null>(null);
const messagesEnd = ref<HTMLElement | null>(null);

function closeChat() {
  open.value = false;
}

function sendMessage() {
  if (input.value.trim() !== "") {
    messages.value.push({ type: "text", content: input.value, isUser: true });
    input.value = "";
    scrollToBottom();
    // Giả lập phản hồi luật sư (demo)
    setTimeout(() => {
      messages.value.push({
        type: "text",
        content: "Luật sư đã nhận được tin nhắn của bạn.",
        isUser: false,
      });
      scrollToBottom();
    }, 800);
  }
}

function triggerFileInput() {
  fileInput.value?.click();
}

function handleFileChange(e: Event) {
  const files = (e.target as HTMLInputElement).files;
  if (!files || files.length === 0) return;
  const file = files[0];
  if (file.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.onload = (ev) => {
      messages.value.push({
        type: "image",
        content: ev.target?.result as string,
        isUser: true,
      });
      scrollToBottom();
    };
    reader.readAsDataURL(file);
  } else {
    // File khác (pdf, doc, ...)
    const url = URL.createObjectURL(file);
    messages.value.push({ type: "file", content: url, isUser: true });
    scrollToBottom();
  }
  // Reset input để có thể upload lại cùng file
  (e.target as HTMLInputElement).value = "";
}

function scrollToBottom() {
  nextTick(() => {
    if (messagesEnd.value) {
      messagesEnd.value.scrollTop = messagesEnd.value.scrollHeight;
    }
  });
}
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

.space-y-2 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.5rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.5rem * var(--tw-space-y-reverse));
}
</style>
