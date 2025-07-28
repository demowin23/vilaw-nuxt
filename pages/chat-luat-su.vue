<template>
  <div
    class="flex flex-col w-full bg-white dark:bg-gray-800 rounded-xl transition-colors duration-300"
    style="height: calc(100vh - 130px)"
  >
    <div class="flex flex-1 min-h-0 h-0">
      <!-- Khu vực chat -->
      <div class="flex-1 flex flex-col min-h-0">
        <div
          class="flex items-center justify-center border-b border-gray-200 dark:border-gray-600 min-h-[48px] relative bg-white dark:bg-gray-800 transition-colors duration-300"
        >
          <h1
            class="text-lg md:text-2xl font-bold text-[#f58220] text-center m-0"
          >
            Chat với Luật sư
          </h1>
          <button
            type="button"
            @click="handleCall"
            class="absolute right-4 bg-[#f58220] hover:bg-[#e06d00] text-white rounded-full p-2 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
          </button>
        </div>
        <div
          class="flex flex-col flex-1 min-h-0 h-0 bg-white dark:bg-gray-800 transition-colors duration-300"
        >
          <!-- Danh sách tin nhắn -->
          <div
            ref="messagesEnd"
            class="flex-1 space-y-3 my-2 pr-2 h-[calc(100vh-130px)] overflow-y-auto"
          >
            <div
              v-for="(msg, idx) in messages"
              :key="idx"
              class="flex flex-col"
              :class="msg.isUser ? 'items-end' : 'items-start'"
            >
              <div
                class="inline-block px-4 py-2 rounded-lg mb-1 mx-2"
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
                    class="max-w-xs max-h-48 rounded-lg"
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
            class="flex gap-2 items-end mt-2 p-2 bg-white dark:bg-gray-800 transition-colors duration-300"
            @submit.prevent="sendMessage"
          >
            <input
              v-model="input"
              type="text"
              placeholder="Nhập tin nhắn..."
              class="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#f58220] bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300"
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
              class="bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-lg px-3 py-2 transition-colors duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-[#f58220]"
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
              class="bg-[#f58220] text-white font-bold rounded-lg px-4 py-2 hover:bg-[#e06d00] transition-colors duration-300"
            >
              Gửi
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted } from "vue";
import { useThemeStore } from "~/stores/theme";

const themeStore = useThemeStore();

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

function handleCall() {
  // Thêm tin nhắn yêu cầu gọi điện
  messages.value.push({
    type: "text",
    content: "Tôi muốn gọi điện thoại với luật sư",
    isUser: true,
  });

  scrollToBottom();

  // Giả lập phản hồi từ luật sư
  setTimeout(() => {
    messages.value.push({
      type: "text",
      content:
        "Luật sư sẽ gọi lại cho bạn trong vòng 5 phút. Vui lòng chuẩn bị sẵn sàng.",
      isUser: false,
    });
    scrollToBottom();
  }, 1000);
}

function scrollToBottom() {
  nextTick(() => {
    if (messagesEnd.value) {
      messagesEnd.value.scrollTop = messagesEnd.value.scrollHeight;
    }
  });
}

onMounted(() => {
  // Khởi tạo theme
  themeStore.initTheme();
});
</script>

<style scoped>
.flex-1 {
  flex: 1 1 0%;
}
.min-h-0 {
  min-height: 0;
}

/* Dark mode scrollbar styling */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 3px;
}

.dark .overflow-y-auto::-webkit-scrollbar-thumb {
  background: #6b7280;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

.dark .overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

/* Smooth transitions for all elements */
* {
  transition: background-color 0.3s ease, color 0.3s ease,
    border-color 0.3s ease;
}

/* Focus states for accessibility */
input:focus,
button:focus {
  outline: 2px solid #f58220;
  outline-offset: 2px;
}

/* Message bubble animations */
.inline-block {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
