<template>
  <div
    class="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="w-full max-w-2xl space-y-8">
      <!-- Header -->
      <div class="text-center">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white">
          Đăng ký tài khoản
        </h2>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Tạo tài khoản mới để truy cập hệ thống
        </p>
      </div>

      <!-- Register Form -->
      <form class="mt-8 space-y-6" @submit.prevent="handleRegister">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8">
          <!-- Phone Number -->
          <div class="mb-6">
            <label
              for="phone"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Số điện thoại
            </label>
            <div class="flex flex-col sm:flex-row gap-2">
              <input
                id="phone"
                v-model="form.phone"
                type="tel"
                required
                class="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#f58220] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300"
                placeholder="Nhập số điện thoại"
              />
              <button
                type="button"
                @click="handleSendOTP"
                :disabled="!form.phone || isLoading"
                class="px-4 py-3 bg-[#f58220] hover:bg-[#e06d00] disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors duration-300 whitespace-nowrap"
              >
                Gửi OTP
              </button>
            </div>
          </div>

          <!-- OTP Input -->
          <div v-if="showOTPInput" class="mb-6">
            <label
              for="otp"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Mã OTP
            </label>
            <div class="flex flex-col sm:flex-row gap-2">
              <input
                id="otp"
                v-model="otp"
                type="text"
                maxlength="6"
                required
                class="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#f58220] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300"
                placeholder="Nhập mã OTP 6 số"
              />
              <button
                type="button"
                @click="handleResendOTP"
                :disabled="countdown > 0 || isLoading"
                class="px-4 py-3 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors duration-300 whitespace-nowrap"
              >
                {{ countdown > 0 ? `${countdown}s` : "Gửi lại" }}
              </button>
            </div>
          </div>

          <!-- Full Name -->
          <div class="mb-6">
            <label
              for="fullName"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Họ và tên
            </label>
            <input
              id="fullName"
              v-model="form.fullName"
              type="text"
              required
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#f58220] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300"
              placeholder="Nhập họ và tên"
            />
          </div>

          <!-- Email -->
          <div class="mb-6">
            <label
              for="email"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Email
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#f58220] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300"
              placeholder="Nhập email"
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

          <!-- Confirm Password -->
          <div class="mb-6">
            <label
              for="confirmPassword"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Xác nhận mật khẩu
            </label>
            <div class="relative">
              <input
                id="confirmPassword"
                v-model="form.confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                required
                class="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#f58220] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300"
                placeholder="Nhập lại mật khẩu"
              />
              <button
                type="button"
                @click="showConfirmPassword = !showConfirmPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <svg
                  v-if="showConfirmPassword"
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

          <!-- Terms and Conditions -->
          <div class="mb-6">
            <label class="flex items-start">
              <input
                v-model="form.acceptTerms"
                type="checkbox"
                required
                class="h-4 w-4 text-[#f58220] focus:ring-[#f58220] border-gray-300 dark:border-gray-600 rounded mt-1"
              />
              <span class="ml-2 text-sm text-gray-600 dark:text-gray-400">
                Tôi đồng ý với
                <a
                  href="#"
                  class="text-[#f58220] hover:text-[#e06d00] font-medium"
                >
                  Điều khoản sử dụng
                </a>
                và
                <a
                  href="#"
                  class="text-[#f58220] hover:text-[#e06d00] font-medium"
                >
                  Chính sách bảo mật
                </a>
              </span>
            </label>
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
            {{ isLoading ? "Đang đăng ký..." : "Đăng ký" }}
          </button>
        </div>

        <!-- Login Link -->
        <div class="text-center">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Đã có tài khoản?
            <NuxtLink
              to="/admin/dang-nhap"
              class="font-medium text-[#f58220] hover:text-[#e06d00] transition-colors duration-300"
            >
              Đăng nhập
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
const { sendRegistrationOTP, register, isLoading } = useAuth();

// Form data
const form = reactive({
  phone: "",
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  acceptTerms: false,
});

// UI state
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const showOTPInput = ref(false);
const otp = ref("");
const countdown = ref(0);

// Send OTP
const handleSendOTP = async () => {
  if (!form.phone) {
    handleApiError(new Error("Vui lòng nhập số điện thoại"));
    return;
  }

  try {
    const response = await sendRegistrationOTP(form.phone);
    if (response.success) {
      handleApiSuccess({
        message: "Mã OTP đã được gửi đến số điện thoại của bạn",
      });
      showOTPInput.value = true;
      startCountdown();
    } else {
      handleApiError(new Error(response.error || "Có lỗi xảy ra khi gửi OTP"));
    }
  } catch (error) {
    handleApiError(error, "Có lỗi xảy ra khi gửi OTP");
  }
};

// Resend OTP
const handleResendOTP = async () => {
  if (countdown.value > 0) return;

  try {
    const response = await sendRegistrationOTP(form.phone);
    if (response.success) {
      handleApiSuccess({ message: "Mã OTP mới đã được gửi" });
      startCountdown();
    } else {
      handleApiError(
        new Error(response.error || "Có lỗi xảy ra khi gửi lại OTP")
      );
    }
  } catch (error) {
    handleApiError(error, "Có lỗi xảy ra khi gửi lại OTP");
  }
};

// Start countdown
const startCountdown = () => {
  countdown.value = 60;
  const timer = setInterval(() => {
    countdown.value--;
    if (countdown.value <= 0) {
      clearInterval(timer);
    }
  }, 1000);
};

// Handle register
const handleRegister = async () => {
  // Validate form
  if (
    !form.phone ||
    !form.fullName ||
    !form.email ||
    !form.password ||
    !form.confirmPassword
  ) {
    handleApiError(new Error("Vui lòng điền đầy đủ thông tin"));
    return;
  }

  if (form.password !== form.confirmPassword) {
    handleApiError(new Error("Mật khẩu xác nhận không khớp"));
    return;
  }

  if (!form.acceptTerms) {
    handleApiError(new Error("Vui lòng đồng ý với điều khoản sử dụng"));
    return;
  }

  if (!otp.value) {
    handleApiError(new Error("Vui lòng nhập mã OTP"));
    return;
  }

  try {
    const response = await register({
      phone: form.phone,
      otp: otp.value,
      fullName: form.fullName,
      email: form.email,
      password: form.password,
    });

    if (response.success) {
      handleApiSuccess({ message: "Đăng ký thành công!" });
      // Chuyển đến trang đăng nhập
      await navigateTo("/admin/dang-nhap");
    } else {
      handleApiError(new Error(response.message || "Đăng ký thất bại"));
    }
  } catch (error) {
    handleApiError(error, "Có lỗi xảy ra khi đăng ký");
  }
};
</script>
