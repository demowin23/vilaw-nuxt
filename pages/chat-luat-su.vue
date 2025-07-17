<template>
  <div
    class="flex flex-col w-full bg-white rounded-xl"
    style="height: calc(100vh - 130px)"
  >
    <div class="flex flex-1 min-h-0 h-0">
      <!-- Sidebar chọn lĩnh vực luật sư -->
      <aside
        class="w-24 md:w-56 flex-shrink-0 border-r border-[#eee] flex flex-col items-center py-4 bg-white"
      >
        <h2
          class="text-xs md:text-base font-bold text-[#f58220] mb-4 hidden md:block"
        >
          Chọn lĩnh vực
        </h2>
        <div class="flex flex-col gap-4 w-full items-center">
          <div
            v-for="cat in categories"
            :key="cat.value"
            @click="selectCategory(cat.value)"
            class="flex flex-col items-center cursor-pointer mx-2 group w-full"
          >
            <div
              :class="[
                'w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full border-2 transition-all',
                selectedCategory === cat.value
                  ? 'border-[#f58220] bg-[#f58220]/10'
                  : 'border-gray-200 bg-white',
                'group-hover:border-[#f58220] mx-auto',
              ]"
            >
              <component
                :is="cat.icon"
                :class="[
                  'text-xl md:text-3xl',
                  selectedCategory === cat.value
                    ? 'text-[#f58220]'
                    : 'text-gray-400',
                ]"
              />
            </div>
            <span
              :class="[
                'mt-2 text-xs md:text-base font-medium text-center break-words px-1',
                selectedCategory === cat.value
                  ? 'text-[#f58220]'
                  : 'text-gray-500',
              ]"
              >{{ cat.label }}</span
            >
          </div>
        </div>
      </aside>
      <!-- Khu vực chat -->
      <div class="flex-1 flex flex-col min-h-0">
        <div
          class="flex items-center justify-center border-b border-[#eee] min-h-[48px]"
        >
          <h1
            class="text-lg md:text-2xl font-bold text-[#f58220] text-center m-0"
          >
            Chat với Luật sư
            <span
              v-if="selectedCategory"
              class="ml-2 text-base md:text-xl text-[#333] font-normal"
              >- {{ categoryLabel }}</span
            >
          </h1>
        </div>
        <div class="flex flex-col flex-1 min-h-0 h-0" v-if="selectedCategory">
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
                    : 'bg-gray-100 text-gray-800'
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
                    class="underline text-blue-600"
                    >Tải file</a
                  >
                </template>
              </div>
            </div>
          </div>
          <!-- Nhập tin nhắn và gửi -->
          <form
            class="flex gap-2 items-end mt-2 p-2"
            @submit.prevent="sendMessage"
          >
            <input
              v-model="input"
              type="text"
              placeholder="Nhập tin nhắn..."
              class="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#f58220]"
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
              class="bg-gray-200 hover:bg-gray-300 rounded-lg px-3 py-2"
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
              class="bg-[#f58220] text-white font-bold rounded-lg px-4 py-2 hover:bg-[#e06d00] transition"
            >
              Gửi
            </button>
          </form>
        </div>
        <div
          v-else
          class="flex-1 flex items-center justify-center text-gray-400 text-lg"
        >
          Vui lòng chọn lĩnh vực luật sư để bắt đầu chat.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted, computed, h, watch } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faGavel,
  faLandmark,
  faBalanceScale,
} from "@fortawesome/free-solid-svg-icons";
library.add(faGavel, faLandmark, faBalanceScale);

interface Message {
  type: "text" | "image" | "file";
  content: string;
  isUser: boolean;
}

const categories = [
  {
    value: "dan-su",
    label: "Dân sự",
    icon: h(FontAwesomeIcon, { icon: ["fas", "gavel"] }),
  },
  {
    value: "dat-dai",
    label: "Đất đai",
    icon: h(FontAwesomeIcon, { icon: ["fas", "landmark"] }),
  },
  {
    value: "hinh-su",
    label: "Hình sự",
    icon: h(FontAwesomeIcon, { icon: ["fas", "balance-scale"] }),
  },
];
const selectedCategory = ref<string>("");
const categoryLabel = computed(() => {
  const found = categories.find((c) => c.value === selectedCategory.value);
  return found ? found.label : "";
});

const exampleMessages: Record<string, Message[]> = {
  "dan-su": [
    {
      type: "text",
      content: "Xin chào Luật sư! Tôi muốn hỏi về thủ tục ly hôn.",
      isUser: true,
    },
    {
      type: "text",
      content:
        "Chào bạn! Bạn vui lòng cung cấp thêm thông tin về trường hợp của mình?",
      isUser: false,
    },
    {
      type: "text",
      content: "Tôi và chồng đã ly thân 2 năm, có 1 con chung.",
      isUser: true,
    },
    {
      type: "text",
      content:
        "Bạn cần chuẩn bị giấy đăng ký kết hôn, giấy khai sinh của con và các giấy tờ liên quan.",
      isUser: false,
    },
    {
      type: "text",
      content: "Tôi và chồng đã ly thân 2 năm, có 1 con chung.",
      isUser: true,
    },
    {
      type: "text",
      content:
        "Bạn cần chuẩn bị giấy đăng ký kết hôn, giấy khai sinh của con và các giấy tờ liên quan.",
      isUser: false,
    },
    {
      type: "text",
      content: "Tôi và chồng đã ly thân 2 năm, có 1 con chung.",
      isUser: true,
    },
    {
      type: "text",
      content:
        "Bạn cần chuẩn bị giấy đăng ký kết hôn, giấy khai sinh của con và các giấy tờ liên quan.",
      isUser: false,
    },
    {
      type: "text",
      content: "Tôi và chồng đã ly thân 2 năm, có 1 con chung.",
      isUser: true,
    },
    {
      type: "text",
      content:
        "Bạn cần chuẩn bị giấy đăng ký kết hôn, giấy khai sinh của con và các giấy tờ liên quan.",
      isUser: false,
    },
    {
      type: "text",
      content: "Tôi và chồng đã ly thân 2 năm, có 1 con chung.",
      isUser: true,
    },
    {
      type: "text",
      content:
        "Bạn cần chuẩn bị giấy đăng ký kết hôn, giấy khai sinh của con và các giấy tờ liên quan.",
      isUser: false,
    },
    {
      type: "text",
      content: "Tôi và chồng đã ly thân 2 năm, có 1 con chung.",
      isUser: true,
    },
    {
      type: "text",
      content:
        "Bạn cần chuẩn bị giấy đăng ký kết hôn, giấy khai sinh của con và các giấy tờ liên quan.",
      isUser: false,
    },
    {
      type: "text",
      content: "Tôi và chồng đã ly thân 2 năm, có 1 con chung.",
      isUser: true,
    },
    {
      type: "text",
      content:
        "Bạn cần chuẩn bị giấy đăng ký kết hôn, giấy khai sinh của con và các giấy tờ liên quan.",
      isUser: false,
    },
  ],
  "dat-dai": [
    {
      type: "text",
      content: "Luật sư cho tôi hỏi về chuyển nhượng đất nông nghiệp.",
      isUser: true,
    },
    {
      type: "text",
      content: "Bạn vui lòng cho biết đất đã có sổ đỏ chưa?",
      isUser: false,
    },
    {
      type: "text",
      content: "Đất đã có sổ đỏ, tôi muốn chuyển nhượng cho con.",
      isUser: true,
    },
    {
      type: "text",
      content:
        "Bạn cần làm hợp đồng chuyển nhượng tại phòng công chứng và đăng ký sang tên tại văn phòng đăng ký đất đai.",
      isUser: false,
    },
  ],
  "hinh-su": [
    {
      type: "text",
      content:
        "Tôi bị gọi lên công an vì liên quan đến vụ trộm cắp, tôi phải làm gì?",
      isUser: true,
    },
    {
      type: "text",
      content:
        "Bạn có quyền giữ im lặng và yêu cầu có luật sư tham gia cùng khi làm việc với cơ quan điều tra.",
      isUser: false,
    },
    {
      type: "text",
      content: "Tôi có cần chuẩn bị giấy tờ gì không?",
      isUser: true,
    },
    {
      type: "text",
      content:
        "Bạn nên mang theo giấy tờ tùy thân và các tài liệu liên quan nếu có.",
      isUser: false,
    },
  ],
};

const messages = ref<Message[]>([]);
const input = ref("");
const fileInput = ref<HTMLInputElement | null>(null);
const messagesEnd = ref<HTMLElement | null>(null);
const chatHistories = ref<Record<string, Message[]>>({});

function selectCategory(val: string) {
  selectedCategory.value = val;
  // Nếu đã có lịch sử thì hiển thị, chưa thì hiển thị ví dụ
  if (chatHistories.value[val] && chatHistories.value[val].length > 0) {
    messages.value = [...chatHistories.value[val]];
  } else {
    messages.value = exampleMessages[val] ? [...exampleMessages[val]] : [];
  }
  scrollToBottom();
}

function sendMessage() {
  if (input.value.trim() !== "" && selectedCategory.value) {
    messages.value.push({ type: "text", content: input.value, isUser: true });
    // Lưu lại lịch sử chat cho lĩnh vực hiện tại
    chatHistories.value[selectedCategory.value] = [...messages.value];
    input.value = "";
    scrollToBottom();
    // Giả lập phản hồi luật sư (demo)
    setTimeout(() => {
      messages.value.push({
        type: "text",
        content: "Luật sư đã nhận được tin nhắn của bạn.",
        isUser: false,
      });
      chatHistories.value[selectedCategory.value] = [...messages.value];
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

watch(selectedCategory, (cat) => {
  // Không làm gì ở đây nữa, đã xử lý trong selectCategory
});

onMounted(() => {
  if (selectedCategory.value) selectCategory(selectedCategory.value);
});
</script>

<style scoped>
.flex-1 {
  flex: 1 1 0%;
}
.bg-white {
  background: #fff;
}
.min-h-0 {
  min-height: 0;
}
.bg-white.rounded-t-xl.shadow.p-2 {
  border-bottom: 1px solid #eee;
}
@media (max-width: 900px) {
  aside {
    width: 64px !important;
    min-width: 64px !important;
  }
  aside h2 {
    display: none !important;
  }
  aside span {
    font-size: 11px !important;
    padding: 0 2px;
  }
}
</style>
