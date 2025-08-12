<template>
  <ClientOnly>
    <div class="admin-chat">
      <!-- Chỉ hiển thị sidebar cho luật sư và admin -->
      <div v-if="isLawyerOrAdmin" class="chat-container">
        <!-- Sidebar với danh sách cuộc trò chuyện -->
        <div class="chat-sidebar">
          <div class="sidebar-header">
            <h3>Cuộc trò chuyện</h3>
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
                <div class="user-info">
                  <span class="text-xl text-gray-500 font-bold">{{
                    conversation.userName
                  }}</span>
                </div>
                <div class="conversation-preview">
                  {{ conversation.lastMessage }}
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
                <div class="conversation-details">
                  <div class="message-count">
                    💬 {{ conversation.totalMessages || 0 }} tin nhắn
                  </div>
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
              Chọn một cuộc trò chuyện từ danh sách bên trái để bắt đầu chat
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
                  <div class="user-contact">
                    <span class="user-name">{{
                      selectedConversation.userName
                    }}</span>
                    <span
                      v-if="selectedConversation.userPhone"
                      class="user-phone"
                    >
                      📞 {{ selectedConversation.userPhone }}
                    </span>
                  </div>
                  <div class="conversation-stats">
                    <span class="message-count"
                      >💬 {{ selectedConversation.totalMessages || 0 }} tin
                      nhắn</span
                    >
                    <span
                      v-if="selectedConversation.unreadCount > 0"
                      class="unread-count"
                    >
                      🔔 {{ selectedConversation.unreadCount }} tin nhắn chưa
                      đọc
                    </span>
                  </div>
                </div>
              </div>
              <div class="chat-actions">
                <button
                  @click="refreshCurrentConversation"
                  class="action-btn refresh-conversation-btn"
                  title="Làm mới cuộc trò chuyện"
                >
                  🔄
                </button>
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

      <!-- Hiển thị thông báo cho user thường -->
      <div v-else class="access-denied">
        <div class="access-denied-content">
          <div class="access-denied-icon">🚫</div>
          <h3>Không có quyền truy cập</h3>
          <p>Trang này chỉ dành cho luật sư và quản trị viên.</p>
          <NuxtLink to="/" class="back-home-btn"> Về trang chủ </NuxtLink>
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
  layout: "admin",
  middleware: "auth",
});

const { user, token } = useAuth();
const {
  conversations,
  selectedConversation,
  loading,
  error,
  getAllConversations,
  sendMessage,
  selectConversation,
  markAsRead,
  getConversationDetail,
} = useChat();

// Reactive data
const newMessage = ref("");
const messagesContainer = ref(null);
const showQuickResponseModal = ref(false);
const selectedFile = ref(null);
const fileInput = ref(null);

// Kiểm tra quyền truy cập
const isLawyerOrAdmin = computed(() => {
  return user.value && ["lawyer", "admin"].includes(user.value.role);
});

// Quick responses
const quickResponses = ref([
  {
    id: 1,
    text: "Cảm ơn bạn đã liên hệ. Chúng tôi sẽ xử lý yêu cầu của bạn sớm nhất.",
  },
  { id: 2, text: "Xin chào! Tôi có thể giúp gì cho bạn?" },
  { id: 3, text: "Bạn có thể cung cấp thêm thông tin về vấn đề này không?" },
  {
    id: 4,
    text: "Chúng tôi đang xử lý yêu cầu của bạn. Vui lòng chờ trong giây lát.",
  },
  {
    id: 5,
    text: "Cảm ơn bạn đã phản hồi. Chúng tôi sẽ cập nhật thông tin sớm nhất.",
  },
  {
    id: 6,
    text: "Bạn có thể kiểm tra lại thông tin và cho chúng tôi biết kết quả.",
  },
]);

// Methods
const refreshConversations = async () => {
  try {
    // Store current selected conversation details
    const currentSelectedId = selectedConversation.value?.id;
    const currentMessages = selectedConversation.value?.messages || [];

    await getAllConversations();

    // Restore selected conversation with its detailed messages
    if (currentSelectedId && selectedConversation.value) {
      const updatedConversation = conversations.value.find(
        (c) => c.id === currentSelectedId
      );
      if (updatedConversation) {
        // Merge basic info from updated conversation but keep detailed messages
        selectedConversation.value = {
          ...updatedConversation,
          messages: currentMessages, // Keep the detailed messages
        };

        // Also update the conversation in the list to keep it in sync
        const conversationIndex = conversations.value.findIndex(
          (c) => c.id === currentSelectedId
        );
        if (conversationIndex !== -1) {
          conversations.value[conversationIndex] = {
            ...updatedConversation,
            messages: currentMessages,
          };
        }
      }
    }
  } catch (err) {
    console.error("Error loading conversations:", err);
  }
};

const handleSelectConversation = async (conversation) => {
  try {
    // Get detailed conversation information
    const { conversation: detailedConversation, messages } =
      await getConversationDetail(conversation.id);

    // Set the detailed conversation as selected
    selectedConversation.value = detailedConversation;
    selectedConversation.value.messages = messages;

    // Mark as read
    await markAsRead(conversation.id);
    selectedConversation.value.unreadCount = 0;

    scrollToBottom();

    // Start auto-refresh for this conversation detail
    startDetailRefresh();
  } catch (err) {
    console.error("Error selecting conversation:", err);
  }
};

// Function to manually refresh current conversation
const refreshCurrentConversation = async () => {
  if (selectedConversation.value) {
    try {
      const { conversation: updatedConversation, messages } =
        await getConversationDetail(selectedConversation.value.id);
      selectedConversation.value = updatedConversation;
      selectedConversation.value.messages = messages;
      scrollToBottom();
    } catch (err) {
      console.error("Error refreshing current conversation:", err);
    }
  }
};

const handleSendMessage = async () => {
  if (!newMessage.value.trim() && !selectedFile.value) return;
  if (!selectedConversation.value) return;

  const messageContent = newMessage.value;
  const messageFile = selectedFile.value;
  const isImage = messageFile && messageFile.type && messageFile.type.startsWith("image/");

  // Clear input immediately for better UX
  newMessage.value = "";
  selectedFile.value = null;

  // Add message to UI immediately (optimistic update)
  const newMessageObj = {
    id: Date.now(), // Temporary ID
    content: messageFile ? (isImage ? URL.createObjectURL(messageFile) : messageContent) : messageContent,
    messageType: messageFile ? (isImage ? "image" : "file") : "text",
    senderId: user.value?.id || 0,
    senderName: user.value?.fullName || "Admin",
    senderType: user.value?.role === "admin" ? "admin" : "lawyer",
    fileUrl: messageFile && !isImage ? URL.createObjectURL(messageFile) : undefined,
    fileName: messageFile?.name,
    createdAt: new Date().toISOString(),
    isRead: false,
  };

  // Add to selected conversation messages
  if (selectedConversation.value) {
    selectedConversation.value.messages.push(newMessageObj);
  }
  scrollToBottom();

  try {
    // Send message to server
    await sendMessage(
      selectedConversation.value.id,
      messageContent,
      messageFile
    );

    // Refresh only the current conversation detail instead of all conversations
    if (selectedConversation.value) {
      const { conversation: updatedConversation, messages } =
        await getConversationDetail(selectedConversation.value.id);
      selectedConversation.value = updatedConversation;
      selectedConversation.value.messages = messages;
    }

    scrollToBottom();
  } catch (err) {
    console.error("Error sending message:", err);
    // Remove the optimistic message if sending failed
    if (selectedConversation.value) {
      selectedConversation.value.messages =
        selectedConversation.value.messages.filter(
          (msg) => msg.id !== newMessageObj.id
        );
    }
    // Restore the input
    newMessage.value = messageContent;
    selectedFile.value = messageFile;
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
    // reset input so the same file can be selected again
    event.target.value = "";
  }
};

// Helpers
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
    setTimeout(() => {
      if (messagesContainer.value) {
        messagesContainer.value.scrollTop =
          messagesContainer.value.scrollHeight;
      }
    }, 100); // Small delay to ensure DOM is updated
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
  if (process.client && isLawyerOrAdmin.value) {
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

// Auto refresh conversations and current conversation detail
let refreshInterval;
let detailRefreshInterval;

onMounted(() => {
  if (process.client && isLawyerOrAdmin.value) {
    // Refresh conversations list every 10 seconds
    refreshInterval = setInterval(async () => {
      if (!loading.value) {
        try {
          await refreshConversations();
        } catch (err) {
          console.error("Error auto-refreshing conversations:", err);
        }
      }
    }, 3000);
  }
});

// Function to start auto-refresh for conversation detail
const startDetailRefresh = () => {
  // Clear existing interval if any
  if (detailRefreshInterval) {
    clearInterval(detailRefreshInterval);
  }

  // Start new interval for conversation detail
  detailRefreshInterval = setInterval(async () => {
    if (!loading.value && selectedConversation.value?.id) {
      try {
        const { conversation: updatedConversation, messages } =
          await getConversationDetail(selectedConversation.value.id);

        // Update selected conversation with new messages
        selectedConversation.value = updatedConversation;
        selectedConversation.value.messages = messages;

        // Also update in conversations list
        const conversationIndex = conversations.value.findIndex(
          (c) => c.id === selectedConversation.value.id
        );
        if (conversationIndex !== -1) {
          conversations.value[conversationIndex] = {
            ...updatedConversation,
            messages: messages,
          };
        }

        // Scroll to bottom if new messages
        scrollToBottom();
      } catch (err) {
        console.error("Error auto-refreshing conversation detail:", err);
      }
    }
  }, 3000);
};

onUnmounted(() => {
  if (refreshInterval) {
    clearInterval(refreshInterval);
  }
  if (detailRefreshInterval) {
    clearInterval(detailRefreshInterval);
  }
});
</script>

<style scoped>
.admin-chat {
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.chat-container {
  display: flex;
  height: 100%;
  background: var(--bg-page);
  overflow: hidden;
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
  background: var(--primary-color);
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.sidebar-header h3 {
  margin: 0;
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
}

.refresh-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 6px;
  transition: all 0.3s ease;
  color: white;
}

.refresh-btn:hover {
  background: rgba(255, 255, 255, 0.3);
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
  transition: all 0.3s ease;
}

.conversation-item:hover {
  background: var(--bg-hover);
  transform: translateX(4px);
}

.conversation-item.active {
  background: var(--primary-light);
  border-right: 4px solid var(--primary-color);
  box-shadow: 0 2px 8px rgba(245, 130, 32, 0.2);
}

.conversation-avatar {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: var(--primary-color);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.1rem;
  margin-right: 1rem;
  box-shadow: 0 2px 8px rgba(245, 130, 32, 0.3);
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
  background: var(--danger-color);
  color: white;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: bold;
  box-shadow: 0 2px 6px rgba(239, 68, 68, 0.4);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

.conversation-type {
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.lawyer-assigned {
  color: var(--success-color);
}

.general-conversation {
  color: var(--info-color);
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
  height: 100%;
  overflow: hidden;
}

.chat-header {
  padding: 1rem;
  border-bottom: 1px solid var(--border-color);
  background: var(--primary-color);
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
}

.user-status {
  font-size: 0.8rem;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
}

.user-status.active {
  background: rgba(16, 185, 129, 0.2);
  color: #10b981;
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.user-status.pending {
  background: rgba(245, 158, 11, 0.2);
  color: #f59e0b;
  border: 1px solid rgba(245, 158, 11, 0.3);
}

.user-status.resolved {
  background: rgba(59, 130, 246, 0.2);
  color: #3b82f6;
  border: 1px solid rgba(59, 130, 246, 0.3);
}

.conversation-type-badge {
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.lawyer-assigned {
  color: var(--success-color);
}

.general-conversation {
  color: var(--info-color);
}

.chat-actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.refresh-conversation-btn {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.refresh-conversation-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-1px);
}

.resolve-btn {
  background: var(--success-color);
  color: white;
}

.resolve-btn:hover {
  background: #059669;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  background: var(--bg-page);
  height: 0; /* Force flex to calculate height properly */
  min-height: 0; /* Allow flex item to shrink */
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
  align-self: flex-start;
}

.message-lawyer {
  align-self: flex-end;
  flex-direction: row-reverse;
}

.message-admin {
  align-self: flex-end;
  flex-direction: row-reverse;
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
  background: var(--primary-color);
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
  background: var(--bg-card);
  color: var(--text-primary);
  border-color: var(--border-color);
}

.message-lawyer .message-content {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.message-admin .message-content {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
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
  padding: 1rem;
  border: 2px solid var(--border-color);
  border-radius: 12px;
  resize: none;
  font-family: inherit;
  background: var(--bg-card);
  color: var(--text-primary);
  font-size: 1rem;
  transition: all 0.3s ease;
}

.message-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(245, 130, 32, 0.1);
}

.input-actions {
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;
}

.quick-response-btn {
  padding: 0.6rem 1.2rem;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(245, 130, 32, 0.2);
}

.quick-response-btn:hover {
  background: var(--primary-dark);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(245, 130, 32, 0.3);
}

.file-btn {
  padding: 0.6rem 1.2rem;
  background: var(--warning-color);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(245, 158, 11, 0.2);
}

.file-btn:hover {
  background: #d97706;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
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
  padding: 0.6rem 1.5rem;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(245, 130, 32, 0.2);
}

.send-btn:hover:not(:disabled) {
  background: var(--primary-dark);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(245, 130, 32, 0.3);
}

.send-btn:disabled {
  background: #cbd5e0;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
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

/* Conversation type styles */
.conversation-type {
  margin-top: 0.5rem;
  font-size: 0.8rem;
}

.conversation-type-badge {
  margin-top: 0.5rem;
  font-size: 0.8rem;
}

.lawyer-assigned {
  color: var(--success-color);
  background: var(--success-light);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
}

.general-conversation {
  color: var(--info-color);
  background: var(--info-light);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
}

/* Message type styles */
.message-lawyer {
  align-self: flex-end;
}

.message-lawyer .message-avatar {
  background: var(--info-color);
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

/* Access denied styles */
.access-denied {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-page);
}

.access-denied-content {
  text-align: center;
  padding: 2rem;
  background: var(--bg-card);
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 400px;
}

.access-denied-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.access-denied-content h3 {
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.access-denied-content p {
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

.back-home-btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: var(--primary-color);
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 500;
  transition: background-color 0.2s;
}

.back-home-btn:hover {
  background: var(--primary-dark);
}

/* Conversation details styles */
.conversation-details {
  margin-top: 0.5rem;
  font-size: 0.8rem;
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 0.5rem;
}

.user-name {
  font-weight: 600;
  color: #fff;
}

.user-phone {
  color: #fff;
  font-size: 0.75rem;
}
.message-count {
  color: var(--info-color);
  font-size: 0.75rem;
}

.user-contact {
  margin-top: 0.5rem;
  font-size: 0.8rem;
}

.conversation-stats {
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.75rem;
}

.unread-count {
  color: var(--warning-color);
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
