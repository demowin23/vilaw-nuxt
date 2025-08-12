<template>
  <ClientOnly>
    <div class="lawyer-chat">
      <div class="chat-container">
        <!-- Sidebar với danh sách cuộc trò chuyện -->
        <div class="chat-sidebar">
          <div class="sidebar-header">
            <h3>Cuộc trò chuyện chung</h3>
            <button @click="refreshConversations" class="refresh-btn">
              🔄
            </button>
          </div>

          <div class="conversation-list">
            <div
              v-for="conversation in conversations"
              :key="conversation.id"
              @click="handleSelectConversation(conversation)"
              class="conversation-item"
              :class="{ active: selectedConversation?.id === conversation.id }"
            >
              <div class="conversation-avatar">
                {{ conversation.userName?.charAt(0) || "U" }}
              </div>
              <div class="conversation-info">
                <div class="conversation-name">
                  {{ conversation.title || "Cuộc trò chuyện" }}
                </div>
                <div class="conversation-preview">
                  {{ conversation.lastMessage || "Chưa có tin nhắn" }}
                </div>
                <div class="conversation-meta">
                  <span class="conversation-time">
                    {{ formatTime(conversation.lastMessageTime) }}
                  </span>
                  <span
                    v-if="conversation.unreadCount > 0"
                    class="unread-badge"
                  >
                    {{ conversation.unreadCount }}
                  </span>
                </div>
                <div class="conversation-type">
                  <span class="general-conversation">
                    🌐 Cuộc trò chuyện chung
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Khu vực chat chính -->
        <div class="chat-main">
          <div v-if="!selectedConversation" class="no-conversation">
            <div class="no-conversation-icon">💬</div>
            <h3>Chọn cuộc trò chuyện</h3>
            <p>
              Chọn một cuộc trò chuyện từ danh sách bên trái để bắt đầu trả lời
            </p>
          </div>

          <div v-else class="chat-area">
            <!-- Header cuộc trò chuyện -->
            <div class="chat-header">
              <div class="chat-user-info">
                <div class="user-avatar">
                  {{ selectedConversation.userName?.charAt(0) || "U" }}
                </div>
                <div class="user-details">
                  <h4>{{ selectedConversation.title || "Cuộc trò chuyện" }}</h4>
                  <span
                    class="user-status"
                    :class="selectedConversation.status"
                  >
                    {{ getStatusText(selectedConversation.status) }}
                  </span>
                  <div class="conversation-type-badge">
                    <span class="general-conversation">
                      🌐 Cuộc trò chuyện chung - Bạn có thể trả lời
                    </span>
                  </div>
                </div>
              </div>
              <div class="chat-actions">
                <button
                  @click="handleMarkAsResolved"
                  class="action-btn resolve-btn"
                >
                  ✅ Giải quyết
                </button>
              </div>
            </div>

            <!-- Khu vực tin nhắn -->
            <div class="messages-container" ref="messagesContainer">
              <div class="messages-list">
                <div
                  v-for="message in selectedConversation.messages"
                  :key="message.id"
                  class="message"
                  :class="{
                    'message-user': isUserMessage(message),
                    'message-lawyer': isLawyerMessage(message),
                    'message-admin': isAdminMessage(message),
                  }"
                >
                  <div class="message-avatar">
                    {{ getMessageAvatar(message) }}
                  </div>
                  <div class="message-content">
                    <div class="message-header">
                      <span class="sender-name">{{ message.senderName }}</span>
                      <span class="message-time">{{
                        formatTime(message.createdAt)
                      }}</span>
                    </div>
                    <div class="message-text">
                      <template v-if="message.messageType === 'text'">
                        {{ message.content }}
                      </template>
                      <template v-else-if="message.messageType === 'image'">
                        <img
                          :src="message.content || (message.fileUrl ? getImageUrl(message.fileUrl) : '')"
                          class="message-image"
                        />
                      </template>
                      <template v-else-if="message.messageType === 'file'">
                        <template v-if="isImageFile(message.fileUrl || message.fileName)">
                          <img
                            :src="message.fileUrl ? getImageUrl(message.fileUrl) : ''"
                            class="message-image"
                          />
                        </template>
                        <template v-else>
                          <a
                            href="#"
                            @click.prevent="downloadFile(message)"
                            class="file-link"
                          >
                            📎 {{ message.fileName || (message.fileUrl ? message.fileUrl.split('/').pop() : 'Tải file') }}
                          </a>
                        </template>
                      </template>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Khu vực nhập tin nhắn -->
            <div class="message-input-area">
              <div class="input-container">
                <textarea
                  v-model="newMessage"
                  @keydown.enter.prevent="handleSendMessage"
                  placeholder="Nhập tin nhắn trả lời..."
                  class="message-input"
                  rows="3"
                ></textarea>
                <div class="input-actions">
                  <button @click="triggerFileInput" class="file-btn">
                    📎 File
                  </button>
                  <button @click="sendQuickResponse" class="quick-response-btn">
                    💬 Phản hồi nhanh
                  </button>
                  <button
                    @click="handleSendMessage"
                    class="send-btn"
                    :disabled="!newMessage.trim() && !selectedFile"
                  >
                    Gửi
                  </button>
                </div>
                <input
                  ref="fileInput"
                  type="file"
                  class="hidden"
                  @change="handleFileChange"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.webp,.txt"
                />
                <div v-if="selectedFile" class="selected-file">
                  📎 {{ selectedFile.name }}
                  <button @click="selectedFile = null" class="remove-file-btn">
                    ✕
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal phản hồi nhanh -->
      <div
        v-if="showQuickResponseModal"
        class="modal-overlay"
        @click="closeQuickResponseModal"
      >
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h3>Phản hồi nhanh</h3>
            <button @click="closeQuickResponseModal" class="close-btn">
              ✕
            </button>
          </div>
          <div class="quick-responses">
            <button
              v-for="response in quickResponses"
              :key="response.id"
              @click="selectQuickResponse(response)"
              class="quick-response-item"
            >
              {{ response.text }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup>
import { useChat } from "~/composables/useChat";
import { useAuth } from "~/composables/useAuth";
import { getApiConfig, getImageUrl } from "~/utils/config";

definePageMeta({
  layout: "default",
  middleware: "auth",
});

const { user, token } = useAuth();
const {
  conversations,
  selectedConversation,
  loading,
  error,
  getConversations,
  sendMessage,
  selectConversation,
  markAsRead,
} = useChat();

// Reactive data
const newMessage = ref("");
const messagesContainer = ref(null);
const showQuickResponseModal = ref(false);
const selectedFile = ref(null);
const fileInput = ref(null);

// Quick responses for lawyers
const quickResponses = ref([
  {
    id: 1,
    text: "Xin chào! Tôi có thể giúp gì cho bạn?",
  },
  { id: 2, text: "Bạn có thể cung cấp thêm thông tin về vấn đề này không?" },
  { id: 3, text: "Tôi hiểu vấn đề của bạn. Hãy để tôi tư vấn chi tiết." },
  {
    id: 4,
    text: "Theo quy định pháp luật hiện hành, vấn đề này được xử lý như sau:",
  },
  {
    id: 5,
    text: "Bạn có thể tham khảo thêm các quy định tại Điều luật tương ứng.",
  },
  {
    id: 6,
    text: "Nếu cần hỗ trợ thêm, bạn có thể liên hệ trực tiếp với tôi.",
  },
]);

// Methods
const refreshConversations = async () => {
  try {
    await getConversations();
  } catch (err) {
    console.error("Error loading conversations:", err);
  }
};

const handleSelectConversation = async (conversation) => {
  try {
    await selectConversation(conversation);
    scrollToBottom();
  } catch (err) {
    console.error("Error selecting conversation:", err);
  }
};

const handleSendMessage = async () => {
  if (!newMessage.value.trim() && !selectedFile.value) return;
  if (!selectedConversation.value) return;

  try {
    await sendMessage(
      selectedConversation.value.id,
      newMessage.value,
      selectedFile.value
    );
    newMessage.value = "";
    selectedFile.value = null;
    // Refresh messages
    await refreshConversations();
    scrollToBottom();
  } catch (err) {
    console.error("Error sending message:", err);
  }
};

const sendQuickResponse = () => {
  showQuickResponseModal.value = true;
};

const selectQuickResponse = (response) => {
  newMessage.value = response.text;
  showQuickResponseModal.value = false;
};

const closeQuickResponseModal = () => {
  showQuickResponseModal.value = false;
};

const handleMarkAsResolved = async () => {
  if (selectedConversation.value) {
    try {
      // Update conversation status
      selectedConversation.value.status = "resolved";
      // You might want to call an API to update the status
    } catch (err) {
      console.error("Error marking as resolved:", err);
    }
  }
};

const triggerFileInput = () => {
  if (process.client && fileInput.value) {
    fileInput.value.click();
  }
};

const handleFileChange = (event) => {
  if (process.client && event.target.files?.[0]) {
    const file = event.target.files[0];
    if (file.size > 10 * 1024 * 1024) {
      alert("File quá lớn. Vui lòng chọn file nhỏ hơn 10MB.");
      event.target.value = "";
      return;
    }
    selectedFile.value = file;
    event.target.value = "";
  }
};

const isImageFile = (pathOrName) => {
  if (!pathOrName) return false;
  const lower = String(pathOrName).toLowerCase();
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
};

const downloadFile = async (message) => {
  try {
    const fileName = message.fileName || (message.fileUrl ? message.fileUrl.split("/").pop() || "" : "");
    if (!fileName) return;

    if (!token.value) {
      alert("Bạn cần đăng nhập để tải tệp tin.");
      return;
    }

    const { BASE_URL } = getApiConfig();
    const response = await fetch(`${BASE_URL}/chat/download/${encodeURIComponent(fileName)}`,
      { method: "GET", headers: { Authorization: `Bearer ${token.value}` } });

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
};

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  });
};

const formatTime = (date) => {
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

const getStatusText = (status) => {
  const statusMap = {
    active: "Đang hoạt động",
    pending: "Chờ phản hồi",
    resolved: "Đã giải quyết",
  };
  return statusMap[status] || "Không xác định";
};

// Message type checks
const isUserMessage = (message) => {
  return message.senderType === "user";
};

const isLawyerMessage = (message) => {
  return message.senderType === "lawyer";
};

const isAdminMessage = (message) => {
  return message.senderType === "admin";
};

const getMessageAvatar = (message) => {
  if (isUserMessage(message)) {
    return message.senderName?.charAt(0) || "U";
  } else if (isLawyerMessage(message)) {
    return "👨‍💼";
  } else if (isAdminMessage(message)) {
    return "👨‍💻";
  }
  return "?";
};

// Lifecycle
onMounted(async () => {
  if (process.client) {
    await refreshConversations();
  }
});

// Watch for new messages
watch(
  () => selectedConversation.value?.messages,
  () => {
    scrollToBottom();
  },
  { deep: true }
);

// Auto refresh conversations every 30 seconds
let refreshInterval;
onMounted(() => {
  if (process.client) {
    refreshInterval = setInterval(refreshConversations, 30000);
  }
});

onUnmounted(() => {
  if (refreshInterval) {
    clearInterval(refreshInterval);
  }
});
</script>

<style scoped>
.lawyer-chat {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.chat-container {
  display: flex;
  height: calc(100vh - 80px);
  background: var(--bg-page);
}

.chat-sidebar {
  width: 350px;
  background: var(--bg-card);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  padding: 1rem;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.sidebar-header h3 {
  margin: 0;
  color: var(--text-primary);
}

.refresh-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 6px;
  transition: background-color 0.2s;
}

.refresh-btn:hover {
  background: var(--bg-hover);
}

.conversation-list {
  flex: 1;
  overflow-y: auto;
}

.conversation-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid var(--border-color);
  cursor: pointer;
  transition: background-color 0.2s;
}

.conversation-item:hover {
  background: var(--bg-hover);
}

.conversation-item.active {
  background: var(--primary-light);
  border-right: 3px solid var(--primary-color);
}

.conversation-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--primary-color);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: 1rem;
}

.conversation-info {
  flex: 1;
  min-width: 0;
}

.conversation-name {
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}

.conversation-preview {
  color: var(--text-secondary);
  font-size: 0.9rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 0.25rem;
}

.conversation-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.conversation-time {
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.unread-badge {
  background: var(--primary-color);
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: bold;
}

.conversation-type {
  margin-top: 0.5rem;
  font-size: 0.8rem;
}

.general-conversation {
  color: var(--info-color);
  background: var(--info-light);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
}

.chat-main {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.no-conversation {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
}

.no-conversation-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.no-conversation h3 {
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.chat-area {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.chat-header {
  padding: 1rem;
  border-bottom: 1px solid var(--border-color);
  background: var(--bg-card);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.chat-user-info {
  display: flex;
  align-items: center;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--primary-color);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: 1rem;
}

.user-details h4 {
  margin: 0 0 0.25rem 0;
  color: var(--text-primary);
}

.user-status {
  font-size: 0.8rem;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
}

.user-status.active {
  background: var(--success-light);
  color: var(--success-color);
}

.user-status.pending {
  background: var(--warning-light);
  color: var(--warning-color);
}

.user-status.resolved {
  background: var(--info-light);
  color: var(--info-color);
}

.conversation-type-badge {
  margin-top: 0.5rem;
  font-size: 0.8rem;
}

.chat-actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s;
}

.resolve-btn {
  background: var(--success-color);
  color: white;
}

.resolve-btn:hover {
  background: var(--success-dark);
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  background: var(--bg-page);
}

.messages-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.message {
  display: flex;
  gap: 0.75rem;
  max-width: 70%;
}

.message-user {
  align-self: flex-end;
  flex-direction: row-reverse;
}

.message-lawyer {
  align-self: flex-start;
}

.message-admin {
  align-self: flex-start;
}

.message-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--primary-color);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.8rem;
  flex-shrink: 0;
}

.message-user .message-avatar {
  background: var(--text-secondary);
}

.message-lawyer .message-avatar {
  background: var(--info-color);
}

.message-admin .message-avatar {
  background: var(--primary-color);
}

.message-content {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 0.75rem;
  position: relative;
}

.message-user .message-content {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.message-lawyer .message-content {
  background: var(--info-light);
  color: var(--info-dark);
  border-color: var(--info-color);
}

.message-admin .message-content {
  background: var(--bg-page);
  color: var(--text-primary);
  border-color: var(--border-color);
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 0.8rem;
}

.sender-name {
  font-weight: 600;
  color: var(--text-primary);
}

.message-time {
  font-size: 0.75rem;
  opacity: 0.7;
}

.message-text {
  line-height: 1.4;
}

.message-input-area {
  padding: 1rem;
  border-top: 1px solid var(--border-color);
  background: var(--bg-card);
}

.input-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.message-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  resize: none;
  font-family: inherit;
  background: var(--bg-page);
  color: var(--text-primary);
}

.message-input:focus {
  outline: none;
  border-color: var(--primary-color);
}

.input-actions {
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;
}

.quick-response-btn {
  padding: 0.5rem 1rem;
  background: var(--info-color);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s;
}

.quick-response-btn:hover {
  background: var(--info-dark);
}

.file-btn {
  padding: 0.5rem 1rem;
  background: var(--warning-color);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s;
}

.file-btn:hover {
  background: var(--warning-dark);
}

.selected-file {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: var(--bg-hover);
  border-radius: 6px;
  margin-top: 0.5rem;
  font-size: 0.9rem;
}

.remove-file-btn {
  background: var(--danger-color);
  color: white;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  cursor: pointer;
  font-size: 0.8rem;
}

.remove-file-btn:hover {
  background: var(--danger-dark);
}

.file-link {
  color: var(--primary-color);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.file-link:hover {
  text-decoration: underline;
}

.message-image {
  max-width: 200px;
  max-height: 200px;
  border-radius: 8px;
  margin-top: 0.5rem;
}

.send-btn {
  padding: 0.5rem 1.5rem;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.send-btn:hover:not(:disabled) {
  background: var(--primary-dark);
}

.send-btn:disabled {
  background: var(--text-light);
  cursor: not-allowed;
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: var(--bg-card);
  border-radius: 12px;
  padding: 1.5rem;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.modal-header h3 {
  margin: 0;
  color: var(--text-primary);
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 6px;
  transition: background-color 0.2s;
}

.close-btn:hover {
  background: var(--bg-hover);
}

.quick-responses {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.quick-response-item {
  padding: 0.75rem;
  background: var(--bg-page);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s;
}

.quick-response-item:hover {
  background: var(--bg-hover);
  border-color: var(--primary-color);
}

@media (max-width: 768px) {
  .chat-container {
    flex-direction: column;
  }

  .chat-sidebar {
    width: 100%;
    height: 200px;
  }

  .message {
    max-width: 85%;
  }
}
</style>
