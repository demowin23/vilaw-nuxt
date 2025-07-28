<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Test Notification System
      </h1>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Success Notifications -->
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Success Notifications
          </h2>
          <div class="space-y-3">
            <button
              @click="showSuccess('Đăng ký thành công!')"
              class="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Show Success
            </button>
            <button
              @click="
                showSuccess(
                  'OTP đã được gửi!',
                  'Mã OTP đã được gửi đến số điện thoại của bạn'
                )
              "
              class="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Show Success with Message
            </button>
          </div>
        </div>

        <!-- Error Notifications -->
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Error Notifications
          </h2>
          <div class="space-y-3">
            <button
              @click="showError('Mã OTP không hợp lệ hoặc đã hết hạn')"
              class="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Show API Error
            </button>
            <button
              @click="showError('Có lỗi xảy ra', 'Vui lòng thử lại sau')"
              class="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Show Error with Message
            </button>
            <button
              @click="showApiError({ error: 'Số điện thoại không hợp lệ' })"
              class="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Show API Error Object
            </button>
          </div>
        </div>

        <!-- Warning Notifications -->
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Warning Notifications
          </h2>
          <div class="space-y-3">
            <button
              @click="showWarning('Cảnh báo', 'Mật khẩu của bạn sắp hết hạn')"
              class="w-full bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Show Warning
            </button>
          </div>
        </div>

        <!-- Info Notifications -->
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Info Notifications
          </h2>
          <div class="space-y-3">
            <button
              @click="showInfo('Thông báo', 'Hệ thống sẽ bảo trì vào 2h sáng')"
              class="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Show Info
            </button>
          </div>
        </div>
      </div>

      <!-- API Error Simulation -->
      <div class="mt-8 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          API Error Simulation
        </h2>
        <div class="space-y-3">
          <button
            @click="simulateApiError"
            class="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Simulate API Error Response
          </button>
          <button
            @click="simulateNetworkError"
            class="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Simulate Network Error
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { showSuccess, showError, showWarning, showInfo, handleApiError } =
  useNotification();

const showApiError = (errorData: any) => {
  handleApiError(errorData, "Có lỗi xảy ra");
};

const simulateApiError = () => {
  // Simulate API error response like in the image
  const apiError = {
    success: false,
    error: "Mã OTP không hợp lệ hoặc đã hết hạn",
  };
  handleApiError(apiError, "Có lỗi xảy ra");
};

const simulateNetworkError = () => {
  // Simulate network error
  const networkError = new Error("Network Error");
  (networkError as any).response = {
    status: 500,
    statusText: "Internal Server Error",
  };
  handleApiError(networkError, "Lỗi kết nối");
};
</script>
