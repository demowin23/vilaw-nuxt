<template>
  <section>
    <h2
      class="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-8 text-center"
    >
      {{ sectionTitle }}
    </h2>

    <!-- Packages Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      <div
        v-for="pkg in packages"
        :key="pkg.id"
        class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-shadow duration-300"
      >
        <div class="bg-orange-500 text-white px-6 py-4">
          <h3 class="font-bold text-xl text-center">{{ pkg.title }}</h3>
        </div>
        <div class="p-6">
          <p
            class="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6 min-h-[100px]"
          >
            {{ pkg.description }}
          </p>
          <div class="text-center mb-6">
            <span class="text-orange-500 font-bold text-2xl">{{ pkg.price }}</span>
          </div>
          <button
            @click="selectPackage(pkg.id)"
            class="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 text-lg"
          >
            {{ buttonText }}
          </button>
        </div>
      </div>
    </div>
  </section>
  
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface PackageDef {
  id: string
  title: string
  description: string
  price: string
}

const props = defineProps<{ 
  sectionTitle?: string,
  buttonText?: string
}>()

const emit = defineEmits<{
  (e: 'select', id: string): void
}>()

const sectionTitle = props.sectionTitle ?? 'Danh sách gói cước'
const buttonText = props.buttonText ?? 'Đăng ký'

const packages = ref<PackageDef[]>([
  {
    id: 'individual',
    title: 'Gói Mua Lẻ',
    description:
      'Bạn được xem miễn phí nội dung Vụ án: Trả thù - PHẦN 2: GIẢI MÃ LỜI THỀ trong 24h kể từ thời điểm mua thành công.',
    price: '3.000₫/24h/nội dung',
  },
  {
    id: 'daily',
    title: 'Gói Pháp luật đời sống Ngày',
    description:
      'Bạn được miễn cước 3G/4G/5G và xem không giới hạn kho nội dung Pháp luật đời sống trong 1 ngày kể từ thời điểm đăng ký thành công.',
    price: '3.000đ/1 ngày',
  },
  {
    id: 'plv8',
    title: 'Gói PLV8',
    description:
      'Bạn có 2G tốc độ cao truy cập gói Pháp luật đời sống trong 1 ngày kể từ thời điểm đăng ký thành công.',
    price: '8.000đ/1 ngày',
  },
])

function selectPackage(id: string) {
  emit('select', id)
}
</script>


