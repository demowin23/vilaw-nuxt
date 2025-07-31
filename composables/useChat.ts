import { ref } from 'vue'
import { getApiConfig } from '~/utils/config'

interface Message {
  id: number
  content: string
  messageType: 'text' | 'file' | 'image'
  senderId: number
  senderName: string
  senderRole: 'user' | 'lawyer' | 'admin'
  senderPhone?: string
  fileUrl?: string
  fileName?: string
  createdAt: string
  isRead: boolean
}

interface Conversation {
  id: number
  title: string
  userId: number
  userName: string
  userPhone?: string
  lawyerId?: number | null // NULL cho cuộc trò chuyện chung
  lawyerName?: string
  status: 'active' | 'pending' | 'resolved'
  lastMessage?: string
  lastMessageTime?: string
  unreadCount: number
  totalMessages?: number
  messages: Message[]
  createdAt: string
  updatedAt: string
}

interface Lawyer {
  id: number
  name: string
  email: string
  avatar?: string
  isOnline: boolean
  specialization?: string
}

export const useChat = () => {
  const conversations = ref<Conversation[]>([])
  const selectedConversation = ref<Conversation | null>(null)
  const lawyers = ref<Lawyer[]>([])
  const loading = ref(false)
  const error = ref<Error | null>(null)

  // Helper function để tạo headers với token
  const createHeaders = (includeAuth = true, isFormData = false) => {
    const headers: Record<string, string> = {}
    if (!isFormData) {
      headers['Content-Type'] = 'application/json'
    }
    if (includeAuth) {
      const token = localStorage.getItem('auth_token')
      if (token) {
        headers['Authorization'] = `Bearer ${token}`
      }
    }
    return headers
  }

  // Helper function để handle API calls
  const apiCall = async <T>(url: string, options: RequestInit = {}, isFormData = false): Promise<T> => {
    const headers = createHeaders(true, isFormData)
    const response = await fetch(`${getApiConfig().BASE_URL}${url}`, {
      ...options,
      headers,
    })
    const data = await response.json()
    if (!response.ok) {
      const error = new Error(data.error || data.message || 'Có lỗi xảy ra')
      ;(error as any).response = { data, status: response.status }
      throw error
    }
    return data
  }

  // 1. Lấy tất cả cuộc trò chuyện (cho luật sư và admin)
  const getAllConversations = async (page = 1, limit = 20, status = 'active') => {
    loading.value = true
    error.value = null
    try {
      const response: any = await apiCall(`/chat/all-conversations?page=${page}&limit=${limit}&status=${status}`)
      conversations.value = response.data.map((conv: any) => ({
        id: conv.id,
        title: conv.title,
        userId: conv.user_id,
        userName: conv.user_name,
        userPhone: conv.user_phone,
        lawyerId: conv.lawyer_id, // NULL cho cuộc trò chuyện chung
        lawyerName: conv.lawyer_name,
        status: conv.status,
        lastMessage: conv.last_message,
        lastMessageTime: conv.last_message_time,
        unreadCount: conv.unread_count || 0,
        totalMessages: conv.total_messages || 0,
        messages: conv.messages || [],
        createdAt: conv.created_at,
        updatedAt: conv.updated_at
      }))
      return response
    } catch (err: any) {
      error.value = err
      throw err
    } finally {
      loading.value = false
    }
  }

  // 2. Lấy chi tiết cuộc trò chuyện (cho luật sư và admin)
  const getConversationDetail = async (conversationId: number) => {
    loading.value = true
    error.value = null
    try {
      const response: any = await apiCall(`/chat/conversations/${conversationId}/detail`)
      
      const conversation: Conversation = {
        id: response.data.conversation.id,
        title: response.data.conversation.title,
        userId: response.data.conversation.user.id,
        userName: response.data.conversation.user.name,
        userPhone: response.data.conversation.user.phone,
        lawyerId: response.data.conversation.lawyer_id,
        lawyerName: response.data.conversation.lawyer_name,
        status: response.data.conversation.status,
        lastMessage: response.data.messages.at(-1).content,
        lastMessageTime: response.data.conversation.last_message_time,
        unreadCount: response.data.conversation.unread_count || 0,
        totalMessages: response.data.messages.length || 0,
        messages: response.data.messages.map((msg: any) => ({
          id: msg.id,
          content: msg.content,
          messageType: msg.message_type || 'text',
          senderId: msg.sender_id,
          senderName: msg.sender_name,
          senderType: msg.sender_role === 'user' ? 'user' : msg.sender_role === 'lawyer' ? 'lawyer' : 'admin',
          senderRole: msg.sender_role,
          senderPhone: msg.sender_phone,
          fileUrl: msg.file_url,
          fileName: msg.file_name,
          createdAt: msg.created_at,
          isRead: msg.is_read
        })),
        createdAt: response.data.conversation.created_at,
        updatedAt: response.data.conversation.updated_at
      }
      
      return { conversation, messages: conversation.messages }
    } catch (err: any) {
      error.value = err
      throw err
    } finally {
      loading.value = false
    }
  }

  // 3. Gửi tin nhắn (Người dùng hoặc Luật sư)
  const sendMessage = async (conversationId: number, content: string, file?: File) => {
    try {
      if (file) {
        // Gửi tin nhắn với file
        const formData = new FormData()
        formData.append('content', content)
        formData.append('messageType', 'file')
        formData.append('file', file)

        const response: any = await apiCall(`/chat/conversations/${conversationId}/messages`, {
          method: 'POST',
          body: formData
        }, true)
        return response
      } else {
        // Gửi tin nhắn text
        const response: any = await apiCall(`/chat/conversations/${conversationId}/messages`, {
          method: 'POST',
          body: JSON.stringify({
            content: content,
            messageType: 'text'
          })
        })
        return response
      }
    } catch (err: any) {
      error.value = err
      throw err
    }
  }

  // 4. Lấy danh sách luật sư
  const getLawyers = async () => {
    loading.value = true
    error.value = null
    try {
      const response: any = await apiCall('/chat/lawyers')
      lawyers.value = response.data.map((lawyer: any) => ({
        id: lawyer.id,
        name: lawyer.name,
        email: lawyer.email,
        avatar: lawyer.avatar,
        isOnline: lawyer.is_online,
        specialization: lawyer.specialization
      }))
      return response
    } catch (err: any) {
      error.value = err
      throw err
    } finally {
      loading.value = false
    }
  }

  // 5. Cập nhật trạng thái online (Luật sư)
  const updateOnlineStatus = async (isOnline: boolean) => {
    try {
      const response: any = await apiCall('/chat/online-status', {
        method: 'PUT',
        body: JSON.stringify({ isOnline })
      })
      return response
    } catch (err: any) {
      error.value = err
      throw err
    }
  }

  // 6. Đánh dấu tin nhắn đã đọc
  const markAsRead = async (conversationId: number) => {
    try {
      const response: any = await apiCall(`/chat/conversations/${conversationId}/read`, {
        method: 'PUT'
      })
      return response
    } catch (err: any) {
      error.value = err
      throw err
    }
  }

  // 7. Chọn cuộc trò chuyện
  const selectConversation = async (conversation: Conversation) => {
    selectedConversation.value = conversation
    // Đánh dấu đã đọc
    await markAsRead(conversation.id)
    conversation.unreadCount = 0
    // Lấy chi tiết cuộc trò chuyện
    const { conversation: updatedConversation, messages } = await getConversationDetail(conversation.id)
    selectedConversation.value = updatedConversation
    selectedConversation.value.messages = messages
  }

  // 8. Lấy thống kê chat (admin only)
  const getChatStats = async () => {
    try {
      const response: any = await apiCall('/chat/stats')
      return response.data
    } catch (err: any) {
      error.value = err
      throw err
    }
  }

  
  // 9. Lấy danh sách cuộc trò chuyện của user
  const getConversations = async () => {
    loading.value = true
    error.value = null
    try {
      const response: any = await apiCall('/chat/conversations')
      conversations.value = response.data.map((conv: any) => ({
        id: conv.id,
        title: conv.title,
        userId: conv.user_id,
        userName: conv.user_name,
        userPhone: conv.user_phone,
        lawyerId: conv.lawyer_id,
        lawyerName: conv.lawyer_name,
        status: conv.status,
        lastMessage: conv.last_message,
        lastMessageTime: conv.last_message_time,
        unreadCount: conv.unread_count || 0,
        totalMessages: conv.total_messages || 0,
        messages: conv.messages || [],
        createdAt: conv.created_at,
        updatedAt: conv.updated_at
      }))
      return response
    } catch (err: any) {
      error.value = err
      throw err
    } finally {
      loading.value = false
    }
  }

  // 10. Tạo cuộc trò chuyện mới (cho user)
  const createConversation = async (title: string) => {
    loading.value = true
    error.value = null
    try {
      const response: any = await apiCall('/chat/conversations', {
        method: 'POST',
        body: JSON.stringify({
          title: title
        })
      })
      return response
    } catch (err: any) {
      error.value = err
      throw err
    } finally {
      loading.value = false
    }
  }

  // 11. Lấy tin nhắn của cuộc trò chuyện (cho user)
  const getMessages = async (conversationId: number) => {
    loading.value = true
    error.value = null
    try {
      const response: any = await apiCall(`/chat/conversations/${conversationId}/messages`)
      return response.data.map((msg: any) => ({
        id: msg.id,
        content: msg.content,
        messageType: msg.message_type || 'text',
        senderId: msg.sender_id,
        senderName: msg.sender_name,
        senderRole: msg.sender_role,
        fileUrl: msg.file_url,
        fileName: msg.file_name,
        createdAt: msg.created_at,
        isRead: msg.is_read
      }))
    } catch (err: any) {
      error.value = err
      throw err
    } finally {
      loading.value = false
    }
  }

  // 12. Gửi tin nhắn (cho user)
  const sendUserMessage = async (conversationId: number, content: string, file?: File) => {
    try {
      if (file) {
        // Gửi tin nhắn với file
        const formData = new FormData()
        formData.append('content', content)
        formData.append('messageType', 'file')
        formData.append('file', file)

        const response: any = await apiCall(`/chat/conversations/${conversationId}/messages`, {
          method: 'POST',
          body: formData
        }, true)
        return response
      } else {
        // Gửi tin nhắn text
        const response: any = await apiCall(`/chat/conversations/${conversationId}/messages`, {
          method: 'POST',
          body: JSON.stringify({
            content: content,
            messageType: 'text'
          })
        })
        return response
      }
    } catch (err: any) {
      error.value = err
      throw err
    }
  }

  return {
    conversations,
    selectedConversation,
    lawyers,
    loading,
    error,
    getAllConversations,
    getConversationDetail,
    sendMessage,
    getLawyers,
    updateOnlineStatus,
    markAsRead,
    getChatStats,
    selectConversation,
    // API functions cho user thường
    getConversations,
    createConversation,
    getMessages,
    sendUserMessage
  }
} 