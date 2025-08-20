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
  title: "VILAW - Nền tảng pháp luật trực tuyến hàng đầu Việt Nam",
  titleTemplate: "%s | VILAW",
  htmlAttrs: {
    lang: "vi",
  },
  meta: [
    // Basic SEO
    {
      name: "description",
      content:
        "VILAW - Nền tảng pháp luật trực tuyến cung cấp kiến thức pháp luật, video hướng dẫn, văn bản pháp luật và dịch vụ tư vấn pháp lý chuyên nghiệp",
    },
    {
      name: "keywords",
      content:
        "pháp luật, luật sư, tư vấn pháp lý, kiến thức pháp luật, video pháp luật, văn bản pháp luật, dịch vụ pháp lý, VILAW",
    },
    {
      name: "author",
      content: "VILAW",
    },
    {
      name: "robots",
      content:
        "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
    },
    {
      name: "googlebot",
      content:
        "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
    },

    // Open Graph / Facebook
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:site_name",
      content: "VILAW",
    },
    {
      property: "og:title",
      content: "VILAW - Nền tảng pháp luật trực tuyến hàng đầu Việt Nam",
    },
    {
      property: "og:description",
      content:
        "VILAW - Nền tảng pháp luật trực tuyến cung cấp kiến thức pháp luật, video hướng dẫn, văn bản pháp luật và dịch vụ tư vấn pháp lý chuyên nghiệp",
    },
    {
      property: "og:url",
      content: "https://vilaw.net.vn",
    },
    {
      property: "og:image",
      content:
        "https://vilaw.net.vn/images/ton-chi-hoat-dong.DKjQaDsR_1Y6nqo.webp",
    },
    {
      property: "og:image:width",
      content: "1200",
    },
    {
      property: "og:image:height",
      content: "630",
    },
    {
      property: "og:locale",
      content: "vi_VN",
    },

    // Twitter Card
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:site",
      content: "@VILAW",
    },
    {
      name: "twitter:title",
      content: "VILAW - Nền tảng pháp luật trực tuyến hàng đầu Việt Nam",
    },
    {
      name: "twitter:description",
      content:
        "VILAW - Nền tảng pháp luật trực tuyến cung cấp kiến thức pháp luật, video hướng dẫn, văn bản pháp luật và dịch vụ tư vấn pháp lý chuyên nghiệp",
    },
    {
      name: "twitter:image",
      content:
        "https://vilaw.net.vn/images/ton-chi-hoat-dong.DKjQaDsR_1Y6nqo.webp",
    },

    // Additional SEO
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1, shrink-to-fit=no",
    },
    {
      name: "theme-color",
      content: "#f58220",
    },
    {
      name: "msapplication-TileColor",
      content: "#f58220",
    },
    {
      name: "apple-mobile-web-app-capable",
      content: "yes",
    },
    {
      name: "apple-mobile-web-app-status-bar-style",
      content: "default",
    },
    {
      name: "apple-mobile-web-app-title",
      content: "VILAW",
    },
    {
      name: "application-name",
      content: "VILAW",
    },
    {
      name: "format-detection",
      content: "telephone=no",
    },

    // Google Site Verification
    {
      name: "google-site-verification",
      content: "vAUdCGVdIKwyUAUz2tVOuWRDzkvKhgiZqxK1s1r1434",
    },
  ],
  link: [
    {
      rel: "canonical",
      href: "https://vilaw.net.vn",
    },
    {
      rel: "icon",
      type: "image/png",
      href: "/images/logo-icon.png",
    },
    {
      rel: "shortcut icon",
      type: "image/png",
      href: "/images/logo-icon.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/images/logo-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "192x192",
      href: "/images/logo-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "512x512",
      href: "/images/logo-icon.png",
    },
    {
      rel: "manifest",
      href: "/site.webmanifest",
    },
  ],
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
