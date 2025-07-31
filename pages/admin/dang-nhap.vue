<template>
  <div
    class="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="w-full max-w-md space-y-8">
      <!-- Header -->
      <div class="text-center">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white">
          Đăng nhập
        </h2>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Đăng nhập vào tài khoản của bạn
        </p>
      </div>

      <!-- Login Form -->
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8">
          <!-- Phone Number -->
          <div class="mb-6">
            <label
              for="phone"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Số điện thoại
            </label>
            <input
              id="phone"
              v-model="form.phone"
              type="tel"
              required
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#f58220] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300"
              placeholder="Nhập số điện thoại"
            />
          </div>

          <!-- Password -->
          <div class="mb-6">
            <label
              for="password"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Mật khẩu
            </label>
            <div class="relative">
              <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                required
                class="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#f58220] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300"
                placeholder="Nhập mật khẩu"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <svg
                  v-if="showPassword"
                  class="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                  />
                </svg>
                <svg
                  v-else
                  class="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <!-- Remember Me & Forgot Password -->
          <div class="flex items-center justify-between mb-6">
            <label class="flex items-center">
              <input
                v-model="form.rememberMe"
                type="checkbox"
                class="h-4 w-4 text-[#f58220] focus:ring-[#f58220] border-gray-300 dark:border-gray-600 rounded"
              />
              <span class="ml-2 text-sm text-gray-600 dark:text-gray-400">
                Ghi nhớ đăng nhập
              </span>
            </label>
            <NuxtLink
              to="/admin/quen-mat-khau"
              class="text-sm text-[#f58220] hover:text-[#e06d00] font-medium transition-colors duration-300"
            >
              Quên mật khẩu?
            </NuxtLink>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full bg-[#f58220] hover:bg-[#e06d00] disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center"
          >
            <svg
              v-if="isLoading"
              class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            {{ isLoading ? "Đang đăng nhập..." : "Đăng nhập" }}
          </button>
        </div>

        <!-- Register Link -->
        <div class="text-center">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Chưa có tài khoản?
            <NuxtLink
              to="/admin/dang-ky"
              class="font-medium text-[#f58220] hover:text-[#e06d00] transition-colors duration-300"
            >
              Đăng ký ngay
            </NuxtLink>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
});

import { ref, reactive } from "vue";
import { useNotification } from "~/composables/useNotification";
import { useAuth } from "~/composables/useAuth";

const { handleApiSuccess, handleApiError } = useNotification();
const { loginWithPassword, isLoading } = useAuth();

// Form data
const form = reactive({
  phone: "",
  password: "",
  rememberMe: false,
});

// UI state
const showPassword = ref(false);

// Handle login
const handleLogin = async () => {
  if (!form.phone || !form.password) {
    handleApiError(new Error("Vui lòng điền đầy đủ thông tin"));
    return;
  }

  try {
    const response = await loginWithPassword(form.phone, form.password);

    if (response.success) {
      handleApiSuccess({ message: "Đăng nhập thành công!" });
      // Chuyển đến trang admin
      await navigateTo("/admin");
    } else {
      handleApiError(new Error(response.message || "Đăng nhập thất bại"));
    }
  } catch (error) {
    handleApiError(error, "Có lỗi xảy ra khi đăng nhập");
  }
};
</script>
