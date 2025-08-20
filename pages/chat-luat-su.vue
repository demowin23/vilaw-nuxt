<template>
  <ClientOnly>
    <div
      class="flex flex-col w-full bg-white dark:bg-gray-800 rounded-xl transition-colors duration-300"
      style="height: calc(100vh - 130px)"
      v-if="user?.role === 'user'"
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
            <!-- Welcome Screen for New Users -->
            <div
              v-if="showWelcomeScreen"
              class="flex-1 flex items-center justify-center"
            >
              <div
                class="bg-white dark:bg-gray-700 rounded-lg p-6 max-w-md w-full mx-4"
              >
                <h3 class="text-lg font-semibold mb-4 text-center">
                  Bắt đầu tư vấn pháp luật
                </h3>
                <div class="text-center mb-6">
                  <p class="text-gray-600 dark:text-gray-400 mb-4">
                    Tạo cuộc trò chuyện chung và bất kỳ luật sư nào cũng có thể
                    trả lời bạn
                  </p>
                  <div
                    class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-4"
                  >
                    <h4
                      class="font-semibold text-blue-800 dark:text-blue-200 mb-2"
                    >
                      🌐 Cuộc trò chuyện chung
                    </h4>
                    <ul
                      class="text-sm text-blue-700 dark:text-blue-300 space-y-1"
                    >
                      <li>• Không cần chọn luật sư cụ thể</li>
                      <li>• Tin nhắn tự động gửi đến tất cả luật sư</li>
                      <li>• Bất kỳ luật sư nào cũng có thể trả lời</li>
                      <li>• Phản hồi nhanh chóng</li>
                    </ul>
                  </div>
                </div>
                <button
                  @click="startNewConversation"
                  class="w-full bg-[#f58220] hover:bg-[#e06d00] text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                >
                  Bắt đầu tư vấn
                </button>
              </div>
            </div>

            <!-- Danh sách tin nhắn -->
            <div
              v-else
              ref="messagesEnd"
              class="flex-1 space-y-3 my-2 pr-2 h-[calc(100vh-130px)] overflow-y-auto"
            >
              <div
                v-for="(msg, idx) in messages"
                :key="msg.id"
                class="flex flex-col"
                :class="msg.senderRole === 'user' ? 'items-end' : 'items-start'"
              >
                <div
                  class="inline-block px-4 py-2 rounded-lg mb-1 mx-2 max-w-xs md:max-w-md"
                  :class="
                    msg.senderRole === 'user'
                      ? 'bg-[#f58220] text-white'
                      : msg.senderRole === 'lawyer'
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                  "
                >
                  <!-- Message Header -->
                  <div
                    v-if="msg.senderRole !== 'user'"
                    class="text-xs font-semibold mb-1"
                  >
                    {{ msg.senderName }}
                  </div>

                  <!-- Message Content -->
                  <template v-if="msg.messageType === 'text'">
                    {{ msg.content }}
                  </template>
                  <template v-else-if="msg.messageType === 'image'">
                    <img
                      :src="
                        msg.fileUrl ? getImageUrl(msg.fileUrl) : msg.content
                      "
                      class="max-w-xs max-h-48 rounded-lg"
                    />
                  </template>
                  <template v-else-if="msg.messageType === 'file'">
                    <template v-if="isImageFile(msg.fileUrl || msg.fileName)">
                      <img
                        :src="msg.fileUrl ? getImageUrl(msg.fileUrl) : ''"
                        class="max-w-xs max-h-48 rounded-lg"
                      />
                    </template>
                    <template v-else>
                      <a
                        href="#"
                        @click.prevent="downloadFile(msg)"
                        class="underline text-blue-600 dark:text-blue-400"
                      >
                        📎
                        {{
                          msg.fileName ||
                          (msg.fileUrl
                            ? msg.fileUrl.split("/").pop()
                            : "Tải file")
                        }}
                      </a>
                    </template>
                  </template>

                  <!-- Message Time -->
                  <div class="text-xs opacity-70 mt-1">
                    {{ formatTime(msg.createdAt) }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Nhập tin nhắn và gửi -->
            <form
              v-if="!showWelcomeScreen"
              class="flex gap-2 items-end mt-2 p-2 bg-white dark:bg-gray-800 transition-colors duration-300"
              @submit.prevent="handleSendMessage"
            >
              <input
                v-model="input"
                type="text"
                placeholder="Nhập tin nhắn..."
                class="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#f58220] bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300"
                @keydown.enter.exact.prevent="handleSendMessage"
              />
              <input
                ref="fileInput"
                type="file"
                class="hidden"
                @change="handleFileChange"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.webp,.txt"
                v-if="isClient"
              />
              <button
                type="button"
                @click="triggerFileInput"
                class="bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-lg px-3 py-2 transition-colors duration-300"
                v-if="isClient"
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
                :disabled="!input.trim() && !selectedFile"
              >
                Gửi
              </button>
            </form>

            <!-- Selected file display -->
            <div v-if="selectedFile && !showWelcomeScreen" class="px-2 pb-2">
              <div
                class="flex items-center gap-2 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg"
              >
                <span class="text-sm">📎 {{ selectedFile.name }}</span>
                <button
                  @click="selectedFile = null"
                  class="text-red-500 hover:text-red-700 text-sm"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="flex-1 flex items-center justify-center">
      <div class="text-center">
        <p class="text-gray-600 dark:text-gray-400">
          Vui lòng đăng nhập để sử dụng tính năng này
        </p>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted, onUnmounted } from "vue";
import { useThemeStore } from "~/stores/theme";
import { useChat } from "~/composables/useChat";
import { useAuth } from "~/composables/useAuth";
import { getApiConfig, getImageUrl } from "~/utils/config";

// Ensure we're on the client side
const isClient = ref(false);

const themeStore = useThemeStore();
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

const messages = ref<Message[]>([]);
const input = ref("");
const fileInput = ref<any>(null);
const messagesEnd = ref<any>(null);
const selectedFile = ref<any>(null);
const currentConversationId = ref<number | null>(null);
const showWelcomeScreen = ref(false);

// Load initial data
const loadInitialData = async () => {
  try {
    await getConversations();

    // If user has existing conversations, select the first one
    if (conversations.value.length > 0) {
      await selectConversation(conversations.value[0]);
      showWelcomeScreen.value = false;
    } else {
      // Show welcome screen for new conversation
      showWelcomeScreen.value = true;
    }
  } catch (err) {
    console.error("Error loading initial data:", err);
  }
};

const selectConversation = async (conversation: any) => {
  currentConversationId.value = conversation.id;
  const messagesList = await getMessages(conversation.id);
  messages.value = messagesList;
  scrollToBottom();
};

// Function to manually refresh messages
const refreshMessages = async () => {
  if (currentConversationId.value) {
    try {
      const messagesList = await getMessages(currentConversationId.value);
      messages.value = messagesList;
      scrollToBottom();
    } catch (err) {
      console.error("Error refreshing messages:", err);
    }
  }
};

const startNewConversation = async () => {
  try {
    const response = await createConversation(
      `Tư vấn pháp luật - ${new Date().toLocaleDateString("vi-VN")}`
    );

    // Refresh conversations and select the new one
    await getConversations();
    const newConversation = conversations.value.find(
      (c) => c.id === response.data.id
    );
    if (newConversation) {
      await selectConversation(newConversation);
    }
    showWelcomeScreen.value = false;
  } catch (err) {
    console.error("Error creating conversation:", err);
  }
};

async function handleSendMessage() {
  if (
    (!input.value.trim() && !selectedFile.value) ||
    !currentConversationId.value
  )
    return;

  const messageContent = input.value;
  const messageFile = selectedFile.value;
  const isImage =
    messageFile && messageFile.type && messageFile.type.startsWith("image/");

  // Clear input immediately for better UX
  input.value = "";
  selectedFile.value = null;

  // Add message to UI immediately (optimistic update)
  const newMessage: Message = {
    id: Date.now(), // Temporary ID
    content: messageFile
      ? isImage
        ? URL.createObjectURL(messageFile)
        : messageContent
      : messageContent,
    messageType: messageFile ? (isImage ? "image" : "file") : "text",
    senderId: user.value?.id || 0,
    senderName: user.value?.fullName || "Người dùng",
    senderRole: "user",
    fileUrl:
      messageFile && !isImage ? URL.createObjectURL(messageFile) : undefined,
    fileName: messageFile?.name,
    createdAt: new Date().toISOString(),
    isRead: false,
  };

  messages.value.push(newMessage);
  scrollToBottom();

  try {
    // Send message to server
    await sendUserMessage(
      currentConversationId.value,
      messageContent,
      messageFile
    );

    // Refresh messages from server to get the real message with correct ID
    const messagesList = await getMessages(currentConversationId.value);
    messages.value = messagesList;
    scrollToBottom();
  } catch (err) {
    console.error("Error sending message:", err);
    // Remove the optimistic message if sending failed
    messages.value = messages.value.filter((msg) => msg.id !== newMessage.id);
    // Restore the input
    input.value = messageContent;
    selectedFile.value = messageFile;
  }
}

function triggerFileInput() {
  if (fileInput.value) {
    fileInput.value.click();
  }
}

function handleFileChange(e: Event) {
  const target = e.target as any;
  const files = target?.files;
  if (!files || files.length === 0) return;
  const file = files[0];

  // Check file size (10MB limit)
  if (file.size > 10 * 1024 * 1024) {
    alert("File quá lớn. Vui lòng chọn file nhỏ hơn 10MB.");
    return;
  }

  selectedFile.value = file;
  // Reset input để có thể upload lại cùng file
  target.value = "";
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

function handleCall() {
  if (!currentConversationId.value) {
    alert("Vui lòng bắt đầu cuộc trò chuyện trước.");
    return;
  }

  // Thêm tin nhắn yêu cầu gọi điện
  messages.value.push({
    id: Date.now(),
    content: "Tôi muốn gọi điện thoại với luật sư",
    messageType: "text",
    senderId: user.value?.id || 0,
    senderName: user.value?.fullName || "Người dùng",
    senderRole: "user",
    createdAt: new Date().toISOString(),
    isRead: false,
  });

  scrollToBottom();

  // Giả lập phản hồi từ luật sư
  setTimeout(() => {
    messages.value.push({
      id: Date.now() + 1,
      content:
        "Luật sư sẽ gọi lại cho bạn trong vòng 5 phút. Vui lòng chuẩn bị sẵn sàng.",
      messageType: "text",
      senderId: 0,
      senderName: "Luật sư",
      senderRole: "lawyer",
      createdAt: new Date().toISOString(),
      isRead: false,
    });
    scrollToBottom();
  }, 1000);
}

function scrollToBottom() {
  nextTick(() => {
    setTimeout(() => {
      if (messagesEnd.value) {
        messagesEnd.value.scrollTop = messagesEnd.value.scrollHeight;
      }
    }, 100); // Small delay to ensure DOM is updated
  });
}

// Download file via authorized API call
async function downloadFile(msg: Message) {
  try {
    const fileName =
      msg.fileName || (msg.fileUrl ? msg.fileUrl.split("/").pop() || "" : "");
    if (!fileName) return;

    if (!token.value) {
      alert("Bạn cần đăng nhập để tải tệp tin.");
      return;
    }

    const { BASE_URL } = getApiConfig();
    const response = await fetch(
      `${BASE_URL}/chat/download/${encodeURIComponent(fileName)}`,
      { method: "GET", headers: { Authorization: `Bearer ${token.value}` } }
    );

    if (!response.ok) {
      throw new Error("Failed to download file");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error("Download error:", err);
    alert("Tải file thất bại. Vui lòng thử lại.");
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

  const timePart = dt.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (sameDay) return timePart;

  const datePart = dt.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return `${timePart} ${datePart}`;
};

// Auto refresh messages every 5 seconds (more frequent)
let refreshInterval: NodeJS.Timeout;

onMounted(async () => {
  // Set client flag
  isClient.value = true;

  // Khởi tạo theme
  themeStore.initTheme();

  // Load initial data
  await loadInitialData();

  // Set up auto refresh every 5 seconds
  refreshInterval = setInterval(async () => {
    if (currentConversationId.value && !loading.value) {
      try {
        const messagesList = await getMessages(currentConversationId.value);
        // Only update if there are new messages
        if (messagesList.length !== messages.value.length) {
          messages.value = messagesList;
          scrollToBottom();
        }
      } catch (err) {
        console.error("Error refreshing messages:", err);
      }
    }
  }, 3000); // Reduced from 10 seconds to 5 seconds
});

onUnmounted(() => {
  if (refreshInterval) {
    clearInterval(refreshInterval);
  }
});

// Set page SEO
useHead({
  title: "Chat với luật sư - Tư vấn pháp luật trực tuyến",
  meta: [
    {
      name: "description",
      content:
        "Chat trực tiếp với luật sư chuyên nghiệp để được tư vấn pháp luật miễn phí. Hỗ trợ giải đáp các vấn đề pháp lý 24/7 với đội ngũ luật sư giàu kinh nghiệm.",
    },
    {
      name: "keywords",
      content:
        "chat luật sư, tư vấn pháp luật trực tuyến, hỏi đáp pháp luật, luật sư online, tư vấn pháp lý miễn phí",
    },
  ],
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
