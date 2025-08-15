<template>
  <div
    class="bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300"
  >
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <NotificationContainer />
  </div>
</template>

<script setup lang="ts">
// Google Analytics setup
useHead({
  script: [
    {
      src: "https://www.googletagmanager.com/gtag/js?id=G-E67PMGVVTG",
      async: true,
    },
    {
      innerHTML: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-E67PMGVVTG');
      `,
    },
  ],
});
</script>
