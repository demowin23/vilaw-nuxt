<template>
  <div class="fixed top-4 right-4 z-50 space-y-2">
    <TransitionGroup
      enter-active-class="transition ease-out duration-300"
      enter-from-class="transform opacity-0 scale-95 translate-x-full"
      enter-to-class="transform opacity-100 scale-100 translate-x-0"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="transform opacity-100 scale-100 translate-x-0"
      leave-to-class="transform opacity-0 scale-95 translate-x-full"
    >
      <Notification
        v-for="notification in notifications"
        :key="notification.id"
        :show="true"
        :type="notification.type"
        :title="notification.title"
        :message="notification.message"
        :duration="0"
        @close="removeNotification(notification.id)"
      />
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
const { notifications, removeNotification } = useNotification();
</script>
