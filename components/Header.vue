<template>
  <div>
    <!-- Marquee top bar -->
    <div
      class="w-full bg-white border-b border-[#f58220]/20 overflow-hidden h-9 flex items-center"
    >
      <div
        class="marquee whitespace-nowrap font-semibold text-[#f58220] text-sm px-4"
      >
        Ưu đãi đặc biệt: Mua gói tư vấn pháp lý chỉ từ 299K/tháng! | Gói doanh
        nghiệp ưu đãi lớn | Đăng ký ngay để nhận nhiều quyền lợi...
      </div>
    </div>
    <header class="bg-white w-full shadow z-50">
      <!-- Top tier -->
      <div class="flex items-center justify-between px-4 py-2 border-b">
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
          <form class="w-full" @submit.prevent>
            <div
              class="flex items-center bg-[#efefef] rounded-lg px-3 py-2 w-full shadow-sm"
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
                class="bg-transparent flex-1 outline-none text-gray-700 placeholder-gray-500"
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
        <!-- Login/User -->
        <div class="flex items-center gap-2 relative">
          <NuxtLink to="/chat-luat-su" class="menu-link"
            >Chat với luật sư</NuxtLink
          >
          <NuxtLink to="/lien-he" class="menu-link">Liên hệ</NuxtLink>
          <NuxtLink to="/mua-goi" class="menu-link">Mua gói</NuxtLink>
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
          </button>
          <transition name="fade">
            <div
              v-if="showUserPopup"
              class="user-popup absolute top-[45px] right-0 mt-2 bg-white shadow-2xl rounded-lg px-4 py-3 z-50 min-w-[150px] max-w-xs flex flex-col items-center animate-fade-in"
              @mouseenter="showUserPopup = true"
              @mouseleave="showUserPopup = false"
            >
              <!-- Arrow top center -->
              <div
                class="absolute right-[2px] top-0 -translate-x-1/2 -translate-y-1/2 w-4 h-4 z-50 pointer-events-none"
              >
                <div class="w-4 h-4 bg-white shadow-2xl rotate-45"></div>
              </div>
              <button
                class="w-full mb-2 px-3 py-2 rounded bg-[#f58220] text-white font-semibold hover:bg-[#e06d00] transition flex items-center justify-center gap-2 text-sm"
              >
                <font-awesome-icon
                  :icon="['fas', 'sign-in-alt']"
                  class="text-base"
                />
                Đăng nhập
              </button>
              <button
                class="w-full px-3 py-2 rounded border border-[#f58220] text-[#f58220] font-semibold hover:bg-[#f58220]/10 transition flex items-center justify-center gap-2 text-sm"
              >
                <font-awesome-icon
                  :icon="['fas', 'user-plus']"
                  class="text-base"
                />
                Đăng ký
              </button>
            </div>
          </transition>
        </div>
        <!-- Hamburger for mobile -->
        <button
          @click="open = !open"
          class="md:hidden ml-2 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#f58220]"
          aria-label="Mở menu"
        >
          <svg
            v-if="!open"
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
          <svg
            v-else
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
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
} from "@fortawesome/free-solid-svg-icons";
import { useSidebarStore } from "~/stores/sidebar";

library.add(faCircleUser, faSignInAlt, faUserPlus, faHome);
const sidebarStore = useSidebarStore();
const hoverMenu = ref("");
const showUserPopup = ref(false);
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
</style>
