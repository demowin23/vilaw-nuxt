<template>
  <div
    class="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <!-- Header -->
      <div class="text-center">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white">
          Quên mật khẩu
        </h2>
      </div>

      <!-- Forgot Password Form -->
      <form class="mt-8 space-y-6" @submit.prevent="handleForgotPassword">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <!-- Email -->
          <div class="mb-6">
            <label
              for="email"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Email đăng ký
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#f58220] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300"
              placeholder="Nhập email của bạn"
            />
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
            {{ isLoading ? "Đang gửi..." : "Gửi link đặt lại mật khẩu" }}
          </button>

          <!-- Success Message -->
          <div
            v-if="isSuccess"
            class="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
          >
            <div class="flex">
              <svg
                class="h-5 w-5 text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div class="ml-3">
                <p class="text-sm text-green-800 dark:text-green-200">
                  Link đặt lại mật khẩu đã được gửi đến email của bạn. Vui lòng
                  kiểm tra hộp thư và spam.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Back to Login -->
        <div class="text-center">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Nhớ mật khẩu rồi?
            <NuxtLink
              to="/dang-nhap"
              class="font-medium text-[#f58220] hover:text-[#e06d00] transition-colors duration-300"
            >
              Đăng nhập ngay
            </NuxtLink>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  title: "Quên mật khẩu - VILAW",
  description: "Đặt lại mật khẩu tài khoản VILAW",
});

const form = ref({
  email: "",
});

const isLoading = ref(false);
const isSuccess = ref(false);

const handleForgotPassword = async () => {
  isLoading.value = true;

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Here you would typically make an API call to send reset password email
    console.log("Forgot password email:", form.value.email);

    // Show success message
    isSuccess.value = true;

    // Reset form
    form.value.email = "";
  } catch (error) {
    console.error("Forgot password error:", error);
    alert("Có lỗi xảy ra khi gửi email. Vui lòng thử lại!");
  } finally {
    isLoading.value = false;
  }
};
</script>
