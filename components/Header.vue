<template>
  <div>
    <!-- Marquee top bar -->
    <div
      class="w-full bg-white dark:bg-gray-800 border-b border-[#f58220]/20 overflow-hidden h-9 flex items-center transition-colors duration-300"
    >
      <div
        class="marquee whitespace-nowrap font-semibold text-[#f58220] text-sm px-4"
      >
        Ưu đãi đặc biệt: Mua gói tư vấn pháp lý chỉ từ 299K/tháng! | Gói doanh
        nghiệp ưu đãi lớn | Đăng ký ngay để nhận nhiều quyền lợi...
      </div>
    </div>
    <header
      class="bg-white dark:bg-gray-800 w-full shadow z-50 transition-colors duration-300"
    >
      <!-- Top tier -->
      <div
        class="flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-gray-600 transition-colors duration-300"
      >
        <!-- Logo -->
        <div class="flex items-center gap-2">
          <button
            @click="sidebarStore.toggleSidebar()"
            class="rounded focus:outline-none focus:ring-2 focus:ring-[#f58220]"
            aria-label="Mở menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#f58220"
              class="w-7 h-7"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
              />
            </svg>
          </button>
          <img src="/favicon.ico" alt="Logo" class="h-10 w-10 ml-4" />
          <span class="font-bold text-xl text-[#f58220] tracking-wide"
            >VILAW</span
          >
        </div>
        <!-- Search -->
        <div class="flex-1 flex justify-center max-w-lg">
          <!-- Desktop search input -->
          <form class="w-full hidden md:block" @submit.prevent>
            <div
              class="flex items-center bg-[#efefef] dark:bg-gray-700 rounded-lg px-3 py-2 w-full shadow-sm transition-colors duration-300"
            >
              <svg
                class="w-5 h-5 text-[#f58220] mr-2"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
              >
                <circle
                  cx="11"
                  cy="11"
                  r="8"
                  stroke="currentColor"
                  stroke-width="2"
                  fill="none"
                />
                <line
                  x1="21"
                  y1="21"
                  x2="16.65"
                  y2="16.65"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
              <input
                type="text"
                placeholder="Nhập từ khoá tìm kiếm"
                class="bg-transparent flex-1 outline-none text-gray-700 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300"
              />
              <button
                type="submit"
                class="ml-2 bg-[#f58220] hover:bg-[#e06d00] transition-colors rounded p-2 flex items-center justify-center"
              >
                <svg
                  class="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <circle
                    cx="11"
                    cy="11"
                    r="8"
                    stroke="currentColor"
                    stroke-width="2"
                    fill="none"
                  />
                  <line
                    x1="21"
                    y1="21"
                    x2="16.65"
                    y2="16.65"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
        <!-- Login/User + Mobile search icon -->
        <div class="flex items-center gap-2 relative menu-link-group">
          <!-- Mobile search icon (right) -->
          <button
            class="block md:hidden p-2 rounded-full hover:bg-[#f58220]/10 focus:outline-none focus:ring-2 focus:ring-[#f58220]"
            @click="showMobileSearch = true"
            aria-label="Tìm kiếm"
          >
            <svg
              class="w-6 h-6 text-[#f58220]"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <circle
                cx="11"
                cy="11"
                r="8"
                stroke="currentColor"
                stroke-width="2"
                fill="none"
              />
              <line
                x1="21"
                y1="21"
                x2="16.65"
                y2="16.65"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </button>
          <!-- Chat, Liên hệ, Mua gói: text to icon on <500px -->
          <NuxtLink
            v-if="user?.role === 'user'"
            to="/chat-luat-su"
            class="menu-link menu-link-responsive"
            title="Chat với luật sư"
          >
            <span class="icon-500:hidden"
              ><font-awesome-icon :icon="['fas', 'comments']" class="text-lg"
            /></span>
            <span class="hidden icon-500:inline">Chat với luật sư</span>
          </NuxtLink>
          <NuxtLink
            to="/lien-he"
            class="menu-link menu-link-responsive"
            title="Liên hệ"
          >
            <span class="icon-500:hidden"
              ><font-awesome-icon :icon="['fas', 'phone']" class="text-lg"
            /></span>
            <span class="hidden icon-500:inline">Liên hệ</span>
          </NuxtLink>
          <NuxtLink
            to="/mua-goi"
            class="menu-link menu-link-responsive"
            title="Mua gói"
          >
            <span class="icon-500:hidden"
              ><font-awesome-icon
                :icon="['fas', 'shopping-cart']"
                class="text-lg"
            /></span>
            <span class="hidden icon-500:inline">Mua gói</span>
          </NuxtLink>
          <button
            class="flex items-center gap-1 text-[#f58220] font-semibold hover:underline focus:outline-none"
            @mouseenter="showUserPopup = true"
            @mouseleave="showUserPopup = false"
            @focus="showUserPopup = true"
            @blur="showUserPopup = false"
          >
            <font-awesome-icon
              :icon="['far', 'circle-user']"
              class="text-2xl w-8 h-8"
            />
            <span
              v-if="isAuthenticated && user"
              class="hidden md:inline text-sm"
            >
              {{ user.fullName }}
            </span>
          </button>
          <transition name="fade">
            <div
              v-if="showUserPopup"
              class="user-popup absolute top-[45px] right-0 mt-2 bg-white dark:bg-gray-800 shadow-2xl rounded-lg px-4 py-3 z-50 min-w-[200px] max-w-xs flex flex-col items-center animate-fade-in"
              @mouseenter="showUserPopup = true"
              @mouseleave="showUserPopup = false"
            >
              <!-- Arrow top center -->
              <div
                class="absolute right-[2px] top-0 -translate-x-1/2 -translate-y-1/2 w-4 h-4 z-50 pointer-events-none"
              >
                <div
                  class="w-4 h-4 bg-white dark:bg-gray-800 shadow-2xl rotate-45"
                ></div>
              </div>

              <!-- User info when authenticated -->
              <div v-if="isAuthenticated && user" class="w-full mb-3">
                <div class="text-center mb-2">
                  <div
                    class="text-sm font-semibold text-gray-900 dark:text-white"
                  >
                    {{ user.fullName }}
                  </div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">
                    {{ user.email }}
                  </div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">
                    {{ user.phone }}
                  </div>
                </div>
                <div class="border-t border-gray-200 dark:border-gray-600 pt-2">
                  <button
                    v-if="user?.role !== 'user'"
                    @click="navigateTo('/admin')"
                    class="w-full mb-2 px-3 py-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition flex items-center justify-center gap-2 text-sm"
                  >
                    <font-awesome-icon
                      :icon="['fas', 'user']"
                      class="text-base"
                    />
                    Quản trị
                  </button>
                  <button
                    @click="navigateTo('/profile')"
                    class="w-full mb-2 px-3 py-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition flex items-center justify-center gap-2 text-sm"
                  >
                    <font-awesome-icon
                      :icon="['fas', 'user']"
                      class="text-base"
                    />
                    Hồ sơ
                  </button>
                  <button
                    @click="handleLogout"
                    class="w-full px-3 py-2 rounded bg-red-500 text-white font-semibold hover:bg-red-600 transition flex items-center justify-center gap-2 text-sm"
                  >
                    <font-awesome-icon
                      :icon="['fas', 'sign-out-alt']"
                      class="text-base"
                    />
                    Đăng xuất
                  </button>
                </div>
              </div>

              <!-- Login/Register when not authenticated -->
              <div v-else class="w-full">
                <button
                  @click="goToLogin"
                  class="w-full mb-2 px-3 py-2 rounded bg-[#f58220] text-white font-semibold hover:bg-[#e06d00] transition flex items-center justify-center gap-2 text-sm"
                >
                  <font-awesome-icon
                    :icon="['fas', 'sign-in-alt']"
                    class="text-base"
                  />
                  Đăng nhập
                </button>
                <button
                  @click="goToRegister"
                  class="w-full px-3 py-2 rounded border border-[#f58220] text-[#f58220] font-semibold hover:bg-[#f58220]/10 transition flex items-center justify-center gap-2 text-sm"
                >
                  <font-awesome-icon
                    :icon="['fas', 'user-plus']"
                    class="text-base"
                  />
                  Đăng ký
                </button>
              </div>
            </div>
          </transition>
          <!-- Mobile search popup -->
          <transition name="fade">
            <div
              v-if="showMobileSearch"
              class="fixed inset-0 z-[100] flex items-start justify-center bg-black/40"
              @click.self="showMobileSearch = false"
            >
              <div
                class="bg-white rounded-lg shadow-lg mt-24 w-[90vw] max-w-md p-4 flex flex-col gap-3"
              >
                <div class="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Nhập từ khoá tìm kiếm"
                    class="flex-1 border border-[#f58220] rounded px-3 py-2 outline-none"
                  />
                  <button
                    class="bg-[#f58220] hover:bg-[#e06d00] text-white rounded p-2 flex items-center justify-center"
                  >
                    <svg
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        cx="11"
                        cy="11"
                        r="8"
                        stroke="currentColor"
                        stroke-width="2"
                        fill="none"
                      />
                      <line
                        x1="21"
                        y1="21"
                        x2="16.65"
                        y2="16.65"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                      />
                    </svg>
                  </button>
                  <button
                    class="ml-2 text-gray-400 hover:text-[#f58220] text-xl"
                    @click="showMobileSearch = false"
                    aria-label="Đóng"
                  >
                    &times;
                  </button>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </header>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import {
  faSignInAlt,
  faUserPlus,
  faHome,
  faComments,
  faPhone,
  faShoppingCart,
  faSignOutAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useSidebarStore } from "~/stores/sidebar";

library.add(
  faCircleUser,
  faSignInAlt,
  faUserPlus,
  faHome,
  faComments,
  faPhone,
  faShoppingCart,
  faSignOutAlt,
  faUser
);

const sidebarStore = useSidebarStore();
const { user, isAuthenticated, logout } = useAuth();
const { handleApiError, handleApiSuccess } = useNotification();
const hoverMenu = ref("");
const showUserPopup = ref(false);
const showMobileSearch = ref(false);

const goToLogin = () => {
  showUserPopup.value = false;
  navigateTo("/dang-nhap");
};

const goToRegister = () => {
  showUserPopup.value = false;
  navigateTo("/dang-ky");
};

const handleLogout = async () => {
  try {
    await logout();
    showUserPopup.value = false;
    handleApiSuccess({ message: "Đăng xuất thành công!" });
    await navigateTo("/");
  } catch (error) {
    console.error("Logout error:", error);
    handleApiError(error, "Có lỗi xảy ra khi đăng xuất!");
  }
};
</script>

<style scoped>
.marquee {
  display: inline-block;
  animation: marquee 18s linear infinite;
}
@keyframes marquee {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}
.header-action {
  @apply text-[#f58220] hover:text-[#e06d00] transition-colors duration-200 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#f58220];
  display: flex;
  align-items: center;
  justify-content: center;
}
.menu-link {
  @apply text-[#f58220] font-semibold px-4 py-2 rounded hover:bg-[#f58220]/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#f58220] h-full;
}
.submenu-link {
  @apply block px-4 py-2 text-[#f58220] hover:bg-[#f58220]/10 rounded transition-colors duration-200;
}
nav ul {
  align-items: stretch;
}
.submenu {
  left: 0;
}
.user-popup {
  min-width: 150px;
  max-width: 90vw;
  right: 0;
  top: 45px;
  transform: translateX(0);
  box-sizing: border-box;
}
@media (max-width: 400px) {
  .user-popup {
    min-width: 120px;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
@media (max-width: 767px) {
  nav ul {
    flex-direction: column;
    gap: 0.5rem;
  }
  .submenu {
    position: static !important;
    box-shadow: none !important;
    min-width: 0 !important;
    padding-left: 1.5rem;
  }
}
@media (max-width: 1028px) {
  .md\:block {
    display: none !important;
  }
  .md\:hidden {
    display: block !important;
  }
}
@media (max-width: 500px) {
  .icon-500\:hidden {
    display: inline !important;
  }
  .icon-500\:inline {
    display: none !important;
  }
  .menu-link-group {
    gap: 0.25rem !important;
  }
  .menu-link-responsive {
    padding-left: 0.25rem !important;
    padding-right: 0.25rem !important;
    padding-top: 0.25rem !important;
    padding-bottom: 0.25rem !important;
  }
}
@media (min-width: 501px) {
  .icon-500\:hidden {
    display: none !important;
  }
  .icon-500\:inline {
    display: inline !important;
  }
}
</style>
