<template>
  <div
    class="flex flex-col bg-gray-100 dark:bg-gray-900 overflow-hidden transition-colors duration-300"
  >
    <Header />
    <div class="flex flex-1 layout-main">
      <aside
        :class="[
          isOpenSidebar ? 'w-64' : 'w-16',
          'bg-white dark:bg-gray-800 shadow-lg z-40  flex flex-col transition-all duration-300',
          'sidebar-absolute',
        ]"
        style="flex-shrink: 0; min-width: 4rem; max-width: 16rem"
      >
        <nav v-if="isOpenSidebar" class="flex-1 px-4 py-8 flex flex-col">
          <!-- Theme Toggle Button -->

          <ul class="space-y-2">
            <li>
              <NuxtLink to="/" class="sidebar-link">
                <font-awesome-icon
                  :icon="['fas', 'house']"
                  class="sidebar-icon"
                />
                Trang chủ
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/gioi-thieu" class="sidebar-link">
                <font-awesome-icon
                  :icon="['fas', 'circle-info']"
                  class="sidebar-icon"
                />
                Giới thiệu
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/phap-luat-doi-song" class="sidebar-link">
                <font-awesome-icon
                  :icon="['fas', 'video']"
                  class="sidebar-icon"
                />
                Video Pháp luật và Đời sống
              </NuxtLink>
            </li>
            <li v-if="user?.role === 'user'">
              <NuxtLink to="/chat-luat-su" class="sidebar-link">
                <font-awesome-icon
                  :icon="['fas', 'comments']"
                  class="sidebar-icon"
                />
                Chat với Luật sư
              </NuxtLink>
            </li>
            <li
              @mouseover="kienThucHover = true"
              @mouseleave="kienThucHover = false"
            >
              <SidebarDropdown label="" :activePaths="['/kien-thuc']">
                <template #label>
                  <font-awesome-icon
                    :icon="['fas', 'book']"
                    :class="[
                      'sidebar-icon transition-colors duration-200',
                      isKienThucActive || kienThucHover
                        ? 'sidebar-icon--active'
                        : 'text-gray-600 dark:text-gray-400',
                    ]"
                  />
                  <span
                    :class="[
                      'transition-colors duration-200',
                      isKienThucActive || kienThucHover
                        ? 'sidebar-text--active'
                        : 'text-gray-800 dark:text-gray-200',
                    ]"
                    >Kiến thức pháp luật</span
                  >
                </template>
                <NuxtLink
                  to="/kien-thuc/dan_su_thua_ke_hon_nhan_va_gia_dinh"
                  class="sidebar-sublink"
                  @click="
                    sidebarStore.setTitle(
                      'Dân sự – Thừa kế – Hôn nhân và gia đình'
                    )
                  "
                  >Dân sự – Thừa kế – Hôn nhân và gia đình</NuxtLink
                >
                <NuxtLink
                  to="/kien-thuc/hinh_su"
                  class="sidebar-sublink"
                  @click="sidebarStore.setTitle('Hình sự')"
                  >Hình sự</NuxtLink
                >
                <NuxtLink
                  to="/kien-thuc/giai_quyet_tranh_chap"
                  class="sidebar-sublink"
                  @click="sidebarStore.setTitle('Giải quyết tranh chấp')"
                  >Giải quyết tranh chấp</NuxtLink
                >
                <NuxtLink
                  to="/kien-thuc/kinh_doanh_thuong_mai"
                  class="sidebar-sublink"
                  @click="sidebarStore.setTitle('Kinh doanh thương mại')"
                  >Kinh doanh thương mại</NuxtLink
                >
                <NuxtLink
                  to="/kien-thuc/lao_dong"
                  class="sidebar-sublink"
                  @click="sidebarStore.setTitle('Lao động')"
                  >Lao động</NuxtLink
                >
                <NuxtLink
                  to="/kien-thuc/dat_dai"
                  class="sidebar-sublink"
                  @click="sidebarStore.setTitle('Đất đai')"
                  >Đất đai</NuxtLink
                >
                <NuxtLink
                  to="/kien-thuc/the_loai_khac"
                  class="sidebar-sublink"
                  @click="sidebarStore.setTitle('Thể loại khác')"
                  >Thể loại khác</NuxtLink
                >
              </SidebarDropdown>
            </li>
            <li>
              <NuxtLink to="/van-ban" class="sidebar-link">
                <font-awesome-icon
                  :icon="['fas', 'file-lines']"
                  class="sidebar-icon"
                />
                Văn bản pháp luật
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/tin-tuc" class="sidebar-link">
                <font-awesome-icon
                  :icon="['fas', 'newspaper']"
                  class="sidebar-icon"
                />
                Tin tức pháp luật
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/lien-he" class="sidebar-link">
                <font-awesome-icon
                  :icon="['fas', 'phone']"
                  class="sidebar-icon"
                />
                Liên hệ
              </NuxtLink>
            </li>
          </ul>
          <div class="mt-10 flex justify-center">
            <ThemeToggle />
          </div>
        </nav>
        <nav v-else class="flex-1 flex flex-col items-center py-8 gap-6">
          <!-- Theme Toggle Button for collapsed sidebar -->

          <NuxtLink to="/" class="sidebar-icon-only">
            <font-awesome-icon :icon="['fas', 'house']" class="sidebar-icon" />
          </NuxtLink>
          <NuxtLink to="/gioi-thieu" class="sidebar-icon-only">
            <font-awesome-icon
              :icon="['fas', 'circle-info']"
              class="sidebar-icon"
            />
          </NuxtLink>
          <NuxtLink to="/phap-luat-doi-song" class="sidebar-icon-only">
            <font-awesome-icon :icon="['fas', 'video']" class="sidebar-icon" />
          </NuxtLink>
          <NuxtLink to="/chat-luat-su" class="sidebar-icon-only">
            <font-awesome-icon
              :icon="['fas', 'comments']"
              class="sidebar-icon"
            />
          </NuxtLink>
          <NuxtLink
            to="/kien-thuc/dan-su"
            class="sidebar-icon-only"
            :class="{
              'router-link-active': route.path.startsWith('/kien-thuc'),
            }"
            @click="sidebarStore.setTitle('Kiến thức pháp luật')"
          >
            <font-awesome-icon :icon="['fas', 'book']" class="sidebar-icon" />
          </NuxtLink>
          <NuxtLink to="/van-ban" class="sidebar-icon-only">
            <font-awesome-icon
              :icon="['fas', 'file-lines']"
              class="sidebar-icon"
            />
          </NuxtLink>
          <NuxtLink to="/tin-tuc" class="sidebar-icon-only">
            <font-awesome-icon
              :icon="['fas', 'newspaper']"
              class="sidebar-icon"
            />
          </NuxtLink>
          <NuxtLink to="/lien-he" class="sidebar-icon-only">
            <font-awesome-icon :icon="['fas', 'phone']" class="sidebar-icon" />
          </NuxtLink>
          <div class="mt-6 flex justify-center">
            <ThemeToggle />
          </div>
        </nav>
      </aside>
      <!-- Main content -->
      <div class="main-content flex-1 flex flex-col w-full h-full min-h-0">
        <main
          class="flex-1 container mx-auto px-2 md:px-4 py-4 overflow-y-auto min-h-0 max-w-screen-2xl flex flex-col bg-gray-100 dark:bg-gray-900 transition-colors duration-300"
          style="height: 100%"
        >
          <slot />
          <Footer v-if="!isChatPage" />
        </main>
      </div>
    </div>
    <ChatPopup />
  </div>
</template>

<script setup lang="ts">
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";
import SidebarDropdown from "~/components/SidebarDropdown.vue";
import ThemeToggle from "~/components/ThemeToggle.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHouse,
  faCircleInfo,
  faVideo,
  faComments,
  faFileLines,
  faNewspaper,
  faPhone,
  faBars,
  faChevronLeft,
  faBook,
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faHouse,
  faCircleInfo,
  faVideo,
  faComments,
  faFileLines,
  faNewspaper,
  faPhone,
  faBars,
  faChevronLeft,
  faBook
);
import { useSidebarStore } from "~/stores/sidebar";
import { useThemeStore } from "~/stores/theme";
import { storeToRefs } from "pinia";
import ChatPopup from "~/components/ChatPopup.vue";
import { useRoute } from "vue-router";
import { ref, computed, onMounted } from "vue";
import { useAuth } from "~/composables/useAuth";
const { user } = useAuth();
const route = useRoute();
const isKienThucActive = computed(() => route.path.startsWith("/kien-thuc"));
const kienThucHover = ref(false);
const isChatPage = computed(() => route.path === "/chat-luat-su");
const sidebarStore = useSidebarStore();
const themeStore = useThemeStore();
const { isOpenSidebar } = storeToRefs(sidebarStore);

// Initialize theme on mount
onMounted(() => {
  // Close sidebar on small screens
  if (window.innerWidth <= 1024) {
    sidebarStore.closeSidebar();
  }
  themeStore.initTheme();
});
</script>

<style scoped>
.sidebar-link {
  @apply flex items-center gap-2 px-1 py-2 rounded font-semibold hover:bg-[#f58220]/10 transition-colors duration-200;
  @apply text-gray-800 dark:text-gray-200;
}
.sidebar-link.router-link-active,
.sidebar-link.router-link-exact-active,
.sidebar-link:hover {
  color: #f58220;
}
.sidebar-icon {
  font-size: 1.1em;
  margin-right: 8px;
  @apply text-gray-600 dark:text-gray-400;
  min-width: 20px;
  text-align: center;
  transition: color 0.2s;
}
.sidebar-link.router-link-active .sidebar-icon,
.sidebar-link.router-link-exact-active .sidebar-icon,
.sidebar-link:hover .sidebar-icon {
  color: #f58220;
}
.sidebar-sublink {
  @apply block px-6 py-2 rounded hover:bg-[#f58220]/10 transition-colors duration-200 text-sm;
  @apply text-gray-800 dark:text-gray-200;
}
.sidebar-sublink.router-link-active,
.sidebar-sublink.router-link-exact-active,
.sidebar-sublink:hover {
  color: #f58220;
}
.sidebar-icon-only {
  @apply flex justify-center items-center w-full h-10 hover:bg-[#f58220]/10 rounded transition-colors duration-200;
}
.sidebar-icon-only .sidebar-icon {
  @apply text-gray-600 dark:text-gray-400;
  transition: color 0.2s;
}
.sidebar-icon-only.router-link-active .sidebar-icon,
.sidebar-icon-only.router-link-exact-active .sidebar-icon,
.sidebar-icon-only:hover .sidebar-icon {
  color: #f58220;
}
.sidebar-icon--active {
  color: #f58220 !important;
}
.dark .sidebar-icon--active {
  color: #f58220 !important;
}

/* Dark mode hover states for dropdown */
.dark .sidebar-sublink:hover {
  background-color: rgba(245, 130, 32, 0.1);
}

/* Dark mode for dropdown container */
.dark .sidebar-dropdown {
  background-color: transparent;
}

/* Ensure smooth transitions for all sidebar elements */
.sidebar-link,
.sidebar-sublink,
.sidebar-icon-only {
  transition: all 0.3s ease;
}

/* Dropdown transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Focus states for accessibility */
.sidebar-link:focus,
.sidebar-sublink:focus,
.sidebar-icon-only:focus {
  outline: 2px solid #f58220;
  outline-offset: 2px;
}

/* Dark mode focus states */
.dark .sidebar-link:focus,
.dark .sidebar-sublink:focus,
.dark .sidebar-icon-only:focus {
  outline: 2px solid #f58220;
  outline-offset: 2px;
}

/* Dark mode hover states */
.dark .sidebar-link:hover,
.dark .sidebar-icon-only:hover {
  background-color: rgba(245, 130, 32, 0.1);
}

/* Dark mode active states */
.dark .sidebar-link.router-link-active,
.dark .sidebar-link.router-link-exact-active,
.dark .sidebar-sublink.router-link-active,
.dark .sidebar-sublink.router-link-exact-active,
.dark .sidebar-icon-only.router-link-active,
.dark .sidebar-icon-only.router-link-exact-active {
  color: #f58220;
}

/* Dark mode icon active states */
.dark .sidebar-link.router-link-active .sidebar-icon,
.dark .sidebar-link.router-link-exact-active .sidebar-icon,
.dark .sidebar-link:hover .sidebar-icon,
.dark .sidebar-icon-only.router-link-active .sidebar-icon,
.dark .sidebar-icon-only.router-link-exact-active .sidebar-icon,
.dark .sidebar-icon-only:hover .sidebar-icon {
  color: #f58220;
}

/* Dark mode text active states */
.dark .sidebar-text--active {
  color: #f58220 !important;
}

/* Dark mode dropdown button */
.dark .sidebar-dropdown button {
  color: #f3f4f6;
}

/* Dark mode dropdown button hover */
.dark .sidebar-dropdown button:hover {
  background-color: rgba(245, 130, 32, 0.1);
}

/* Dark mode dropdown button active */
.dark .sidebar-dropdown button[aria-expanded="true"] {
  color: #f58220;
}

/* Dark mode dropdown button focus */
.dark .sidebar-dropdown button:focus {
  outline: 2px solid #f58220;
  outline-offset: 2px;
}

/* Dark mode dropdown button transition */
.dark .sidebar-dropdown button {
  transition: all 0.3s ease;
}

/* Dark mode dropdown button svg */
.dark .sidebar-dropdown button svg {
  transition: transform 0.3s ease;
}

/* Dark mode dropdown button svg stroke */
.dark .sidebar-dropdown button svg path {
  stroke: currentColor;
}

/* Dark mode dropdown button svg stroke active */
.dark .sidebar-dropdown button[aria-expanded="true"] svg path {
  stroke: #f58220;
}

/* Dark mode dropdown button svg stroke hover */
.dark .sidebar-dropdown button:hover svg path {
  stroke: #f58220;
}

/* Dark mode dropdown button svg stroke focus */
.dark .sidebar-dropdown button:focus svg path {
  stroke: #f58220;
}

/* Dark mode dropdown button svg stroke transition */
.dark .sidebar-dropdown button svg path {
  transition: stroke 0.3s ease;
}

/* Dark mode dropdown button svg stroke transition */
.dark .sidebar-dropdown button svg path {
  transition: stroke 0.3s ease;
}
.layout-main {
  display: flex;
  width: 100%;
  height: 100%;
}
.sidebar-absolute {
  flex-shrink: 0;
  min-width: 4rem;
  max-width: 16rem;
}
.main-content {
  flex: 1 1 0%;
  min-width: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.sidebar-text--active {
  color: #f58220 !important;
}
.dark .sidebar-text--active {
  color: #f58220 !important;
}
@media (max-width: 1028px) {
  .sidebar-absolute {
    position: absolute !important;
    top: 93px;
    left: 0;
    height: 100vh;
    width: 260px !important;
    min-width: unset !important;
    max-width: 90vw;
    z-index: 9999;
    box-shadow: 0 0 24px 0 rgba(0, 0, 0, 0.18);
    @apply bg-white dark:bg-gray-800;
    transition: transform 0.3s, background-color 0.3s ease;
  }
  .dark .sidebar-absolute {
    box-shadow: 0 0 24px 0 rgba(0, 0, 0, 0.4);
  }
  /* Ẩn khi đóng */
  .sidebar-absolute {
    display: none;
  }
  .sidebar-absolute.w-64 {
    display: flex !important;
    transform: translateX(0);
  }
  .sidebar-absolute.w-16 {
    display: none !important;
    transform: translateX(-100%);
  }
}
</style>
