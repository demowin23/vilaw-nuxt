<template>
  <div v-if="!isChatPage && isUser">
    <button
      class="fixed bottom-6 right-6 z-50 bg-[#f58220] text-white rounded-full shadow-lg w-16 h-16 flex items-center justify-center text-3xl hover:bg-[#e06d00] transition"
      @click="openChat"
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
            :key="msg.id || idx"
            class="flex flex-col"
            :class="msg.senderRole === 'user' ? 'items-end' : 'items-start'"
          >
            <div
              class="inline-block px-3 py-1.5 rounded-lg mb-1 mx-1"
              :class="
                msg.senderRole === 'user'
                  ? 'bg-[#f58220] text-white'
                  : msg.senderRole === 'lawyer'
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
              "
            >
              <div v-if="msg.senderRole !== 'user'" class="text-[11px] font-semibold mb-0.5">
                {{ msg.senderName }}
              </div>

              <template v-if="msg.messageType === 'text'">
                {{ msg.content }}
              </template>
              <template v-else-if="msg.messageType === 'image'">
                <img
                  :src="msg.fileUrl ? getImageUrl(msg.fileUrl) : msg.content"
                  class="max-w-[140px] max-h-28 rounded-lg"
                />
              </template>
              <template v-else-if="msg.messageType === 'file'">
                <template v-if="isImageFile(msg.fileUrl || msg.fileName)">
                  <img
                    :src="msg.fileUrl ? getImageUrl(msg.fileUrl) : ''"
                    class="max-w-[140px] max-h-28 rounded-lg"
                  />
                </template>
                <template v-else>
                  <a
                    href="#"
                    @click.prevent="downloadFile(msg)"
                    class="underline text-blue-600 dark:text-blue-400"
                  >
                    📎 {{ msg.fileName || (msg.fileUrl ? msg.fileUrl.split('/').pop() : 'Tải file') }}
                  </a>
                </template>
              </template>

              <div class="text-[10px] opacity-70 mt-0.5">
                {{ formatTime(msg.createdAt) }}
              </div>
            </div>
          </div>
        </div>
        <!-- Nhập tin nhắn và gửi -->
        <form
          class="flex gap-1 items-end mt-1 p-2 bg-white dark:bg-gray-800 rounded-b-xl"
          @submit.prevent="handleSendMessage"
        >
          <input
            v-model="input"
            type="text"
            placeholder="Nhập tin nhắn..."
            class="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#f58220] bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 text-sm"
            @keydown.enter.exact.prevent="handleSendMessage"
          />
          <input
            ref="fileInput"
            type="file"
            class="hidden"
            @change="handleFileChange"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.webp,.txt"
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
            :disabled="!input.trim() && !selectedFile"
          >
            Gửi
          </button>
        </form>
        <div v-if="selectedFile" class="px-2 pb-2 -mt-1">
          <div class="flex items-center gap-2 p-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg text-xs">
            <span>📎 {{ selectedFile.name }}</span>
            <button @click="selectedFile = null" class="text-red-500 hover:text-red-700">✕</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faComments, faTimes } from "@fortawesome/free-solid-svg-icons";
library.add(faComments, faTimes);
import { useChat } from "~/composables/useChat";
import { useAuth } from "~/composables/useAuth";
import { getApiConfig, getImageUrl } from "~/utils/config";

const open = ref(false);
const route = useRoute();
const isChatPage = computed(() => route.path === "/chat-luat-su" || route.path === "/chat-luat-su/");
const isClient = ref(false);
const isUser = computed(() => user.value?.role === "user");

interface Message {
  id: number;
  content: string;
  messageType: "text" | "image" | "file";
  senderId: number;
  senderName: string;
  senderRole: "user" | "lawyer" | "admin";
  fileUrl?: string;
  fileName?: string;
  createdAt: string;
  isRead: boolean;
}

const { user, token } = useAuth();
const {
  conversations,
  loading,
  error,
  getConversations,
  createConversation,
  getMessages,
  sendUserMessage,
} = useChat();

const messages = ref<Message[]>([]);
const input = ref("");
const fileInput = ref<HTMLInputElement | null>(null);
const messagesEnd = ref<HTMLElement | null>(null);
const selectedFile = ref<File | null>(null);
const currentConversationId = ref<number | null>(null);
let refreshInterval: NodeJS.Timeout;

function closeChat() {
  open.value = false;
  if (refreshInterval) clearInterval(refreshInterval);
}

async function openChat() {
  open.value = true;
  await loadInitialData();
  if (refreshInterval) clearInterval(refreshInterval);
  refreshInterval = setInterval(async () => {
    if (currentConversationId.value && !loading.value) {
      try {
        const list = await getMessages(currentConversationId.value);
        if (list.length !== messages.value.length) {
          messages.value = list;
          scrollToBottom();
        }
      } catch (err) {
        console.error("Error refreshing messages:", err);
      }
    }
  }, 3000);
}

async function loadInitialData() {
  try {
    await getConversations();
    if (conversations.value.length > 0) {
      await selectConversation(conversations.value[0]);
    } else {
      const response = await createConversation(
        `Tư vấn pháp luật - ${new Date().toLocaleDateString("vi-VN")}`
      );
      await getConversations();
      const newConv = conversations.value.find((c) => c.id === response.data.id);
      if (newConv) await selectConversation(newConv);
    }
  } catch (err) {
    console.error("Error initializing chat:", err);
  }
}

async function selectConversation(conversation: any) {
  currentConversationId.value = conversation.id;
  const list = await getMessages(conversation.id);
  messages.value = list;
  scrollToBottom();
}

function triggerFileInput() {
  fileInput.value?.click();
}

function handleFileChange(e: Event) {
  const files = (e.target as HTMLInputElement).files;
  if (!files || files.length === 0) return;
  const file = files[0];
  if (file.size > 10 * 1024 * 1024) {
    alert("File quá lớn. Vui lòng chọn file nhỏ hơn 10MB.");
    (e.target as HTMLInputElement).value = "";
    return;
  }
  selectedFile.value = file;
  (e.target as HTMLInputElement).value = "";
}

function scrollToBottom() {
  nextTick(() => {
    if (messagesEnd.value) {
      messagesEnd.value.scrollTop = messagesEnd.value.scrollHeight;
    }
  });
}

function isImageFile(pathOrName?: string) {
  if (!pathOrName) return false;
  const lower = pathOrName.toLowerCase();
  return (
    lower.endsWith(".png") ||
    lower.endsWith(".jpg") ||
    lower.endsWith(".jpeg") ||
    lower.endsWith(".gif") ||
    lower.endsWith(".webp") ||
    lower.endsWith(".bmp") ||
    lower.endsWith(".jfif") ||
    lower.endsWith(".svg")
  );
}

async function handleSendMessage() {
  if ((!input.value.trim() && !selectedFile.value) || !currentConversationId.value) return;

  const messageContent = input.value;
  const messageFile = selectedFile.value;
  const isImage = messageFile && messageFile.type && messageFile.type.startsWith("image/");

  input.value = "";
  selectedFile.value = null;

  const newMessage: Message = {
    id: Date.now(),
    content: messageFile ? (isImage ? URL.createObjectURL(messageFile) : messageContent) : messageContent,
    messageType: messageFile ? (isImage ? "image" : "file") : "text",
    senderId: user.value?.id || 0,
    senderName: user.value?.fullName || "Người dùng",
    senderRole: "user",
    fileUrl: messageFile && !isImage ? URL.createObjectURL(messageFile) : undefined,
    fileName: messageFile?.name,
    createdAt: new Date().toISOString(),
    isRead: false,
  };

  messages.value.push(newMessage);
  scrollToBottom();

  try {
    await sendUserMessage(currentConversationId.value, messageContent, messageFile || undefined);
    const list = await getMessages(currentConversationId.value);
    messages.value = list;
    scrollToBottom();
  } catch (err) {
    console.error("Error sending message:", err);
    messages.value = messages.value.filter((m) => m.id !== newMessage.id);
    input.value = messageContent;
    selectedFile.value = messageFile;
  }
}

async function downloadFile(msg: Message) {
  try {
    const fileName = msg.fileName || (msg.fileUrl ? msg.fileUrl.split('/').pop() || '' : '');
    if (!fileName) return;

    if (!token.value) {
      alert("Bạn cần đăng nhập để tải tệp tin.");
      return;
    }

    const { BASE_URL } = getApiConfig();
    const response = await fetch(`${BASE_URL}/chat/download/${encodeURIComponent(fileName)}`,
      { method: 'GET', headers: { Authorization: `Bearer ${token.value}` } });
    if (!response.ok) throw new Error('Failed to download file');
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error('Download error:', err);
    alert('Tải file thất bại. Vui lòng thử lại.');
  }
}

const formatTime = (date: string) => {
  if (!date) return "";
  const dt = new Date(date);
  const now = new Date();
  const sameDay =
    dt.getFullYear() === now.getFullYear() &&
    dt.getMonth() === now.getMonth() &&
    dt.getDate() === now.getDate();
  const timePart = dt.toLocaleTimeString("vi-VN", { hour: '2-digit', minute: '2-digit' });
  if (sameDay) return timePart;
  const datePart = dt.toLocaleDateString("vi-VN", { day: '2-digit', month: '2-digit', year: 'numeric' });
  return `${timePart} ${datePart}`;
};

onMounted(() => {
  isClient.value = true;
});

onUnmounted(() => {
  if (refreshInterval) clearInterval(refreshInterval);
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

.space-y-2 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.5rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.5rem * var(--tw-space-y-reverse));
}
</style>
