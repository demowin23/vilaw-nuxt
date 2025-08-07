<template>
  <div class="bg-gray-100 rounded-2xl p-4 mb-6" @click="handleClick">
    <div class="flex items-center mb-2">
      <span class="text-orange-500 font-bold text-lg flex items-center">
        {{ title }}
      </span>
    </div>
    <hr class="border-dashed border-gray-300 mb-4" />
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div
        v-for="(item, idx) in topViews"
        :key="idx"
        class="flex items-center gap-3 bg-white rounded-xl p-3 shadow hover:shadow-lg transition group"
      >
        <div
          :class="[
            'flex-shrink-0 flex flex-col items-center justify-center rounded-lg',
            item.bg,
            'w-16 h-16 relative',
          ]"
        >
          <img :src="item.thumbnail" class="w-16 h-16 mx-auto" alt="icon" />
          <span
            class="absolute -top-2 -left-2 w-7 h-7 flex items-center justify-center rounded-full font-bold text-white text-base shadow-lg"
            :class="item.badgeBg"
            >{{ idx + 1 }}</span
          >
        </div>

        <div class="flex-1 min-w-0">
          <div
            class="font-semibold text-gray-900 text-base group-hover:text-orange-600 transition line-clamp-2"
          >
            {{ item.title }}
          </div>
          <div
            class="mt-1 text-xs text-gray-500 bg-gray-100 rounded px-2 py-0.5 inline-block"
          >
            {{ item.views }} lượt xem
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { slugify } from "~/utils/slugify";

const props = defineProps<{
  topViews: any[];
  title: string;
}>();
const handleClick = () => {
  router.push(`/video/${item.id}-${slugify(item.title)}`);
};
</script>
