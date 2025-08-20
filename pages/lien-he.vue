<template>
  <div
    class="bg-gradient-to-br from-blue-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300"
  >
    <!-- Hero Section -->
    <div
      class="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500"
    >
      <div class="absolute inset-0 bg-black opacity-20"></div>
      <div class="relative container mx-auto px-4 py-20">
        <div class="text-center text-white">
          <h1 class="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
            {{ info.heroTitle || "Liên Hệ" }}
          </h1>
          <p class="text-xl md:text-2xl opacity-95 font-light">
            {{ info.heroSubtitle }}
          </p>
          <div class="mt-8 flex justify-center">
            <div class="bg-white/20 backdrop-blur-sm rounded-full px-8 py-3">
              <span class="text-white font-medium"
                >Tư vấn pháp luật chuyên nghiệp</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="container mx-auto px-4 py-16">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Contact Information -->
        <div class="space-y-8">
          <!-- Company Info Card -->
          <div
            class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20 p-8 hover:shadow-2xl transition-all duration-300"
          >
            <div class="flex items-center mb-8">
              <div
                class="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mr-6 shadow-lg"
              >
                <svg
                  class="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  ></path>
                </svg>
              </div>
              <div>
                <h2
                  class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                >
                  Thông Tin Công Ty
                </h2>
                <p class="text-gray-600 dark:text-gray-300 mt-1">
                  {{
                    Array.isArray(info.companyInfo) &&
                    info.companyInfo[0]?.value
                      ? info.companyInfo[0].value
                      : "Thông tin pháp lý chính thức"
                  }}
                </p>
              </div>
            </div>

            <div class="space-y-6">
              <div class="flex items-start group">
                <div
                  class="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center mr-4 shadow-md group-hover:shadow-lg transition-shadow"
                >
                  <svg
                    class="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    ></path>
                  </svg>
                </div>
                <div class="flex-1">
                  <p
                    class="font-bold text-gray-800 dark:text-gray-100 text-lg mb-1"
                  >
                    Giấy CNĐKHĐ
                  </p>
                  <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                    <a
                      href="/pdf/DKKD_2025.pdf"
                      target="_blank"
                      rel="noopener"
                      class="underline hover:text-[#f58220]"
                    >
                      {{
                        Array.isArray(info.companyInfo) &&
                        info.companyInfo[0]?.value
                          ? info.companyInfo[0].value
                          : "Thông tin pháp lý chính thức"
                      }}
                    </a>
                  </p>
                </div>
              </div>

              <div class="flex items-start group">
                <div
                  class="w-12 h-12 bg-gradient-to-br from-green-400 to-teal-500 rounded-xl flex items-center justify-center mr-4 shadow-md group-hover:shadow-lg transition-shadow"
                >
                  <svg
                    class="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    ></path>
                  </svg>
                </div>
                <div class="flex-1">
                  <p
                    class="font-bold text-gray-800 dark:text-gray-100 text-lg mb-1"
                  >
                    Mã số thuế
                  </p>
                  <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {{
                      Array.isArray(info.companyInfo) &&
                      info.companyInfo[1]?.value
                    }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Contact Details Card -->
          <div
            class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20 p-8 hover:shadow-2xl transition-all duration-300"
          >
            <div class="flex items-center mb-8">
              <div
                class="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mr-6 shadow-lg"
              >
                <svg
                  class="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  ></path>
                </svg>
              </div>
              <div>
                <h2
                  class="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
                >
                  Thông Tin Liên Hệ
                </h2>
                <p class="text-gray-600 dark:text-gray-300 mt-1">
                  Liên hệ trực tiếp với chúng tôi
                </p>
              </div>
            </div>

            <div class="space-y-8">
              <!-- Address -->
              <div class="flex items-start group">
                <div
                  class="w-12 h-12 bg-gradient-to-br from-indigo-400 to-blue-500 rounded-xl flex items-center justify-center mr-4 shadow-md group-hover:shadow-lg transition-shadow"
                >
                  <svg
                    class="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    ></path>
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                </div>
                <div class="flex-1">
                  <p
                    class="font-bold text-gray-800 dark:text-gray-100 text-lg mb-2"
                  >
                    Địa chỉ
                  </p>
                  <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {{ info.address }}
                  </p>
                </div>
              </div>

              <!-- Hotline -->
              <div class="flex items-start group">
                <div
                  class="w-12 h-12 bg-gradient-to-br from-red-400 to-pink-500 rounded-xl flex items-center justify-center mr-4 shadow-md group-hover:shadow-lg transition-shadow"
                >
                  <svg
                    class="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    ></path>
                  </svg>
                </div>
                <div class="flex-1">
                  <p
                    class="font-bold text-gray-800 dark:text-gray-100 text-lg mb-2"
                  >
                    Hotline
                  </p>
                  <a
                    href="tel:0919089888"
                    class="text-2xl font-bold bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent hover:from-red-600 hover:to-pink-700 transition-all duration-300"
                  >
                    {{ info.hotline }}
                  </a>
                  <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    (Tư vấn miễn phí 24/7)
                  </p>
                </div>
              </div>

              <!-- Email -->
              <div class="flex items-start group">
                <div
                  class="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center mr-4 shadow-md group-hover:shadow-lg transition-shadow"
                >
                  <svg
                    class="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    ></path>
                  </svg>
                </div>
                <div class="flex-1">
                  <p
                    class="font-bold text-gray-800 dark:text-gray-100 text-lg mb-2"
                  >
                    Email
                  </p>
                  <a
                    href="mailto:luatsu@luatthanhdo.com.vn"
                    class="text-lg font-semibold bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent hover:from-emerald-600 hover:to-teal-700 transition-all duration-300"
                  >
                    {{ info.email }}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Business Hours -->
          <div
            class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20 p-8 hover:shadow-2xl transition-all duration-300"
          >
            <div class="flex items-center mb-8">
              <div
                class="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mr-6 shadow-lg"
              >
                <svg
                  class="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <div>
                <h2
                  class="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent"
                >
                  Giờ Làm Việc
                </h2>
                <p class="text-gray-600 dark:text-gray-300 mt-1">
                  Thời gian tư vấn
                </p>
              </div>
            </div>

            <div class="space-y-4">
              <div
                v-for="(bh, idx) in info.businessHours"
                :key="idx"
                class="flex justify-between items-center p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl border border-amber-100 dark:border-amber-800/30"
              >
                <span class="text-gray-700 dark:text-gray-200 font-medium">{{
                  bh.label
                }}</span>
                <span class="font-bold text-amber-600 dark:text-amber-400">{{
                  bh.value
                }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div
          class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20 p-8 hover:shadow-2xl transition-all duration-300"
        >
          <div class="flex items-center mb-8">
            <div
              class="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center mr-6 shadow-lg"
            >
              <svg
                class="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                ></path>
              </svg>
            </div>
            <div>
              <h2
                class="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent"
              >
                Gửi Tin Nhắn
              </h2>
              <p class="text-gray-600 dark:text-gray-300 mt-1">
                Liên hệ tư vấn miễn phí
              </p>
            </div>
          </div>

          <form @submit.prevent="submitForm" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="group">
                <label
                  class="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                >
                  Họ và tên *
                </label>
                <input
                  v-model="form.name"
                  type="text"
                  required
                  class="w-full px-4 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Nhập họ và tên"
                />
              </div>
              <div class="group">
                <label
                  class="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                >
                  Số điện thoại *
                </label>
                <input
                  v-model="form.phone"
                  type="tel"
                  required
                  class="w-full px-4 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Nhập số điện thoại"
                />
              </div>
            </div>

            <div class="group">
              <label
                class="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
              >
                Email
              </label>
              <input
                v-model="form.email"
                type="email"
                class="w-full px-4 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                placeholder="Nhập email"
              />
            </div>

            <div class="group">
              <label
                class="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
              >
                Lĩnh vực tư vấn
              </label>
              <select
                v-model="form.category"
                class="w-full px-4 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm text-gray-900 dark:text-gray-100"
              >
                <option value="">Chọn lĩnh vực</option>
                <option value="dan-su">Dân sự</option>
                <option value="dat-dai">Đất đai</option>
                <option value="hinh-su">Hình sự</option>
                <option value="kinh-te">Kinh tế</option>
                <option value="lao-dong">Lao động</option>
                <option value="khac">Khác</option>
              </select>
            </div>

            <div class="group">
              <label
                class="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
              >
                Nội dung *
              </label>
              <textarea
                v-model="form.message"
                required
                rows="5"
                class="w-full px-4 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 resize-none"
                placeholder="Mô tả vấn đề cần tư vấn..."
              ></textarea>
            </div>

            <button
              type="submit"
              class="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span class="flex items-center justify-center">
                <svg
                  class="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  ></path>
                </svg>
                Gửi Tin Nhắn
              </span>
            </button>
          </form>
        </div>
      </div>

      <!-- Map Section -->
      <div class="mt-20">
        <div
          class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20 p-8 hover:shadow-2xl transition-all duration-300"
        >
          <div class="flex items-center mb-8">
            <div
              class="w-16 h-16 bg-gradient-to-br from-rose-400 to-pink-500 rounded-2xl flex items-center justify-center mr-6 shadow-lg"
            >
              <svg
                class="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3"
                ></path>
              </svg>
            </div>
            <div>
              <h2
                class="text-3xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent"
              >
                Bản Đồ
              </h2>
              <p class="text-gray-600 dark:text-gray-300 mt-1">
                Vị trí văn phòng
              </p>
            </div>
          </div>

          <div
            class="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-2xl h-80 md:h-96 flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600"
          >
            <iframe
              :src="info.mapEmbedSrc"
              width="100%"
              height="100%"
              style="border: 0; border-radius: 1rem"
              allowfullscreen
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useSiteContent } from "~/composables/useSiteContent";
import { normalizeContactFromApi } from "~/utils/siteContentMapper";

const { getContact } = useSiteContent();

const info = ref({
  heroTitle: "",
  heroSubtitle: "",
  companyInfo: [],
  address: "",
  hotline: "",
  email: "",
  businessHours: [],
  mapEmbedSrc: "",
} as any);

onMounted(async () => {
  try {
    const res: any = await getContact();
    const data = res?.data || res;
    info.value = normalizeContactFromApi(data.content || data);
  } catch {}
});

const form = ref({
  name: "",
  phone: "",
  email: "",
  category: "",
  message: "",
});

const submitForm = () => {
  alert("Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.");
  form.value = {
    name: "",
    phone: "",
    email: "",
    category: "",
    message: "",
  };
};

// Set page SEO
useHead({
  title: "Liên hệ - Tư vấn pháp luật",
  meta: [
    {
      name: "description",
      content:
        "Liên hệ với VILAW để được tư vấn pháp luật chuyên nghiệp. Hỗ trợ giải đáp các vấn đề pháp lý, tư vấn doanh nghiệp và dịch vụ pháp lý toàn diện.",
    },
    {
      name: "keywords",
      content:
        "liên hệ, tư vấn pháp luật, dịch vụ pháp lý, luật sư tư vấn, hỗ trợ pháp lý, VILAW",
    },
  ],
});
</script>

<style scoped>
/* Custom animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.bg-gradient-to-br {
  animation: fadeInUp 0.6s ease-out;
}

/* Smooth hover effects */
.hover\:shadow-2xl:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #2563eb, #7c3aed);
}
</style>
