<template>
  <div
    class="bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300"
  >
    <noscript
      ><iframe
        src="https://www.googletagmanager.com/ns.html?id=GTM-NVJ6L34C"
        height="0"
        width="0"
        style="display: none; visibility: hidden"
      ></iframe
    ></noscript>

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
    {
      innerHTML: `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-NVJ6L34C');
      `,
    },
    {
      src: "https://www.googletagmanager.com/gtag/js?id=G-N4L9HV3HWV",
      async: true,
    },
    {
      innerHTML: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-N4L9HV3HWV');
      `,
    },
  ],
});
</script>
