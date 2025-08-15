<template>
  <footer class="bg-transparent mt-8">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- THÔNG TIN -->
        <div
          class="rounded-xl border border-dashed border-orange-400 bg-gradient-to-br from-green-50 to-white dark:from-gray-800 dark:to-gray-700 p-6 relative overflow-hidden transition-colors duration-300"
        >
          <h2 class="text-orange-500 font-bold text-xl mb-2">THÔNG TIN</h2>
          <hr
            class="border-dashed border-gray-300 dark:border-gray-600 mb-4 transition-colors duration-300"
          />
          <div
            class="text-lg text-gray-700 dark:text-gray-300 space-y-1 transition-colors duration-300"
          >
            <div>ĐC</div>
            <div>Hà Nội</div>
            <div>0912345678</div>
            <div>vilaw@gmail.com</div>
          </div>
        </div>
        <!-- KHO TÀI LIỆU -->
        <div
          class="rounded-xl border border-dashed border-orange-400 bg-gradient-to-br from-green-50 to-white dark:from-gray-800 dark:to-gray-700 p-6 relative overflow-hidden transition-colors duration-300"
        >
          <h2 class="text-orange-500 font-bold text-xl mb-2">TRÊN TRANG</h2>
          <hr
            class="border-dashed border-gray-300 dark:border-gray-600 mb-4 transition-colors duration-300"
          />
          <ul class="space-y-2 text-lg">
            <li>
              <a
                href="#"
                class="hover:text-orange-500 transition text-gray-700 dark:text-gray-300"
                >Chính sách <span class="align-super text-xs">↗</span></a
              >
            </li>
            <li>
              <a
                href="/lien-he"
                class="hover:text-orange-500 transition text-gray-700 dark:text-gray-300"
                >Liên hệ <span class="align-super text-xs">↗</span></a
              >
            </li>
            <li>
              <a
                href="/gioi-thieu"
                class="hover:text-orange-500 transition text-gray-700 dark:text-gray-300"
                >Giới thiệu <span class="align-super text-xs">↗</span></a
              >
            </li>
          </ul>
        </div>
        <div
          class="rounded-xl border border-dashed border-orange-400 bg-gradient-to-br from-green-50 to-white dark:from-gray-800 dark:to-gray-700 relative overflow-hidden transition-colors duration-300"
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
    <div class="bg-orange-500 text-white text-center py-4 mt-8 rounded-t-xl">
      © 2025 vilaw.net.vn
    </div>
  </footer>
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
</script>
