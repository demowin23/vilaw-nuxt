<template>
  <div class="min-h-screen flex flex-col bg-[#e4e7ec]">
    <Header />
    <div class="flex flex-1">
      <!-- Sidebar dưới header -->
      <aside
        :class="[
          isOpenSidebar ? 'w-64' : 'w-16',
          'bg-white shadow-lg z-40 min-h-screen flex flex-col transition-all duration-300',
          'sidebar-absolute',
        ]"
      >
        <nav v-if="isOpenSidebar" class="flex-1 px-4 py-8">
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
            <li>
              <NuxtLink to="/chat-luat-su" class="sidebar-link">
                <font-awesome-icon
                  :icon="['fas', 'comments']"
                  class="sidebar-icon"
                />
                Chat với Luật sư
              </NuxtLink>
            </li>
            <li>
              <SidebarDropdown label="">
                <template #label>
                  <font-awesome-icon
                    :icon="['fas', 'book']"
                    class="sidebar-icon"
                  />
                  Kiến thức pháp luật
                </template>
                <NuxtLink to="/kien-thuc/dan-su" class="sidebar-sublink"
                  >Dân sự – Thừa kế – Hôn nhân và gia đình</NuxtLink
                >
                <NuxtLink to="/kien-thuc/hinh-su" class="sidebar-sublink"
                  >Hình sự</NuxtLink
                >
                <NuxtLink to="/kien-thuc/tranh-chap" class="sidebar-sublink"
                  >Giải quyết tranh chấp</NuxtLink
                >
                <NuxtLink to="/kien-thuc/kinh-doanh" class="sidebar-sublink"
                  >Kinh doanh thương mại</NuxtLink
                >
                <NuxtLink to="/kien-thuc/lao-dong" class="sidebar-sublink"
                  >Lao động</NuxtLink
                >
                <NuxtLink to="/kien-thuc/dat-dai" class="sidebar-sublink"
                  >Đất đai</NuxtLink
                >
                <NuxtLink to="/kien-thuc/khac" class="sidebar-sublink"
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
        </nav>
        <nav v-else class="flex-1 flex flex-col items-center py-8 gap-6">
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
        </nav>
      </aside>
      <!-- Main content -->
      <div class="flex-1 flex flex-col w-full">
        <main class="flex-1 container mx-auto px-4 py-8">
          <slot />
        </main>
      </div>
    </div>
    <Footer />
    <ChatPopup />
  </div>
</template>

<script setup lang="ts">
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";
import SidebarDropdown from "~/components/SidebarDropdown.vue";
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
import { storeToRefs } from "pinia";
import ChatPopup from "~/components/ChatPopup.vue";
const sidebarStore = useSidebarStore();
const { isOpenSidebar } = storeToRefs(sidebarStore);
</script>

<style scoped>
.sidebar-link {
  @apply flex items-center gap-2 px-1  py-2 rounded text-[#f58220] font-semibold hover:bg-[#f58220]/10 transition-colors duration-200;
}
.sidebar-icon {
  font-size: 1.1em;
  margin-right: 8px;
  color: #f58220;
  min-width: 20px;
  text-align: center;
}
.sidebar-sublink {
  @apply block px-6 py-2 rounded text-[#f58220] hover:bg-[#f58220]/10 transition-colors duration-200 text-sm;
}
.sidebar-icon-only {
  @apply flex justify-center items-center w-full h-10 hover:bg-[#f58220]/10 rounded transition-colors duration-200;
}
@media (max-width: 1028px) {
  .sidebar-absolute {
    position: absolute !important;
    top: 105px;
    left: 0;
    height: 100vh;
    width: 260px !important;
    min-width: unset !important;
    max-width: 90vw;
    z-index: 9999;
    box-shadow: 0 0 24px 0 rgba(0, 0, 0, 0.18);
    background: #fff;
    transition: transform 0.3s;
    /* Ẩn khi đóng */
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
