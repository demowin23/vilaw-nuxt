<template>
  <div class="p-4 space-y-6">
    <div class="page-header flex items-center justify-between">
      <div>
        <h2>Quản trị trang Giới thiệu</h2>
        <p class="text-sm text-gray-500">Chỉnh sửa nội dung trang và lưu vào store</p>
      </div>
      <div class="flex gap-2">
        <button class="cancel-btn" @click="reset">Phục hồi mặc định</button>
        <button class="save-btn" :disabled="saving" @click="save">{{ saving ? 'Đang lưu...' : 'Lưu thay đổi' }}</button>
      </div>
    </div>

    <!-- Header section -->
    <div class="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="block font-medium mb-1">Tiêu đề đầu trang</label>
        <input v-model="form.headerTitle" type="text" class="form-input" />
      </div>
      <div>
        <label class="block font-medium mb-1">Tên công ty</label>
        <input v-model="form.companyName" type="text" class="form-input" />
      </div>
    </div>

    <!-- Intro paragraphs -->
    <div class="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-4">
      <div class="flex items-center justify-between mb-3">
        <h3 class="m-0">Giới thiệu ngắn</h3>
        <button class="add-btn" @click="addIntro">+ Đoạn mới</button>
      </div>
      <div class="space-y-3">
        <div v-for="(p, idx) in form.introParagraphs" :key="idx" class="grid grid-cols-[1fr_auto] gap-2 items-start">
          <textarea v-model="form.introParagraphs[idx]" rows="3" class="form-textarea"></textarea>
          <button class="delete-btn" @click="removeIntro(idx)">Xóa</button>
        </div>
      </div>
    </div>

    <!-- Timeline -->
    <div class="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-4">
      <div class="flex items-center justify-between mb-3">
        <h3 class="m-0">Lịch sử thành lập</h3>
        <button class="add-btn" @click="addTimeline">+ Mốc mới</button>
      </div>
      <div class="space-y-4">
        <div v-for="(item, idx) in form.timeline" :key="idx" class="border border-[var(--border-color)] rounded-lg p-3 grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label class="block font-medium mb-1">Tiêu đề</label>
            <input v-model="item.title" type="text" class="form-input" />
          </div>
          <div>
            <label class="block font-medium mb-1">Phụ đề</label>
            <input v-model="item.subtitle" type="text" class="form-input" />
          </div>
          <div>
            <label class="block font-medium mb-1">Thời gian</label>
            <input v-model="item.period" type="text" class="form-input" />
          </div>
          <div class="md:col-span-2">
            <label class="block font-medium mb-1">Mô tả</label>
            <textarea v-model="item.description" rows="2" class="form-textarea"></textarea>
          </div>
          <div class="md:col-span-2">
            <label class="block font-medium mb-1">Bullet points (phân cách bằng dấu phẩy)</label>
            <input v-model="timelineBullets[idx]" @change="applyBullets(idx)" type="text" class="form-input" />
          </div>
          <div class="md:col-span-2 flex justify-end">
            <button class="delete-btn" @click="removeTimeline(idx)">Xóa mốc</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Awards -->
    <div class="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-4">
      <div class="flex items-center justify-between mb-3">
        <h3 class="m-0">Giải thưởng</h3>
        <button class="add-btn" @click="addAward">+ Thêm</button>
      </div>
      <div class="space-y-3">
        <div v-for="(a, idx) in form.awards" :key="idx" class="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
          <input v-model="a.title" placeholder="Tiêu đề" type="text" class="form-input" />
          <div class="flex gap-2">
            <input v-model="a.description" placeholder="Mô tả" type="text" class="form-input flex-1" />
            <button class="delete-btn" @click="removeAward(idx)">Xóa</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Testimonials -->
    <div class="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-4">
      <div class="flex items-center justify-between mb-3">
        <h3 class="m-0">Cảm nhận khách hàng</h3>
        <button class="add-btn" @click="addTestimonial">+ Thêm</button>
      </div>
      <div class="space-y-3">
        <div v-for="(t, idx) in form.testimonials" :key="idx" class="grid grid-cols-1 md:grid-cols-3 gap-3 items-start">
          <input v-model="t.name" placeholder="Tên" type="text" class="form-input" />
          <input v-model="t.role" placeholder="Chức danh" type="text" class="form-input" />
          <div class="flex gap-2">
            <input v-model="t.feedback" placeholder="Nhận xét" type="text" class="form-input flex-1" />
            <button class="delete-btn" @click="removeTestimonial(idx)">Xóa</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Principles -->
    <div class="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-4">
      <div class="flex items-center justify-between mb-3">
        <h3 class="m-0">Tôn chỉ hoạt động</h3>
        <button class="add-btn" @click="addPrinciple">+ Thêm</button>
      </div>
      <div class="space-y-3">
        <div v-for="(p, idx) in form.principles" :key="idx" class="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
          <input v-model="p.title" placeholder="Tiêu đề" type="text" class="form-input" />
          <div class="flex gap-2">
            <input v-model="p.description" placeholder="Mô tả" type="text" class="form-input flex-1" />
            <button class="delete-btn" @click="removePrinciple(idx)">Xóa</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Mission & Core values -->
    <div class="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="block font-medium mb-1">Sứ mệnh / Tầm nhìn</label>
        <textarea v-model="form.mission" rows="3" class="form-textarea"></textarea>
      </div>
      <div>
        <label class="block font-medium mb-1">Giá trị cốt lõi (phân cách bằng dấu phẩy)</label>
        <input v-model="coreValuesInput" @change="applyCoreValues" type="text" class="form-input" />
      </div>
    </div>

    <!-- Stats -->
    <div class="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
      <div>
        <label class="block font-medium mb-1">Văn phòng</label>
        <input v-model="form.stats.offices" type="text" class="form-input" />
      </div>
      <div>
        <label class="block font-medium mb-1">Luật sư & chuyên gia</label>
        <input v-model="form.stats.lawyers" type="text" class="form-input" />
      </div>
      <div>
        <label class="block font-medium mb-1">KH Doanh nghiệp</label>
        <input v-model="form.stats.enterpriseClients" type="text" class="form-input" />
      </div>
      <div>
        <label class="block font-medium mb-1">KH Cá nhân</label>
        <input v-model="form.stats.individualClients" type="text" class="form-input" />
      </div>
    </div>

    <!-- Services -->
    <div class="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-4">
      <div class="flex items-center justify-between mb-3">
        <h3 class="m-0">Dịch vụ</h3>
        <button class="add-btn" @click="addService">+ Thêm</button>
      </div>
      <div class="space-y-3">
        <div v-for="(s, idx) in form.services" :key="idx" class="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
          <input v-model="s.title" placeholder="Tên dịch vụ" type="text" class="form-input" />
          <div class="flex gap-2">
            <input v-model="s.description" placeholder="Mô tả ngắn" type="text" class="form-input flex-1" />
            <button class="delete-btn" @click="removeService(idx)">Xóa</button>
          </div>
        </div>
        <div>
          <label class="block font-medium mb-1">Ảnh tổng quan dịch vụ (URL)</label>
          <input v-model="form.servicesImage" type="text" class="form-input" />
        </div>
      </div>
    </div>

    <!-- Offices -->
    <div class="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-4">
      <div class="flex items-center justify-between mb-3">
        <h3 class="m-0">Địa chỉ văn phòng</h3>
        <button class="add-btn" @click="addOffice">+ Thêm</button>
      </div>
      <div class="space-y-3">
        <div v-for="(o, idx) in form.offices" :key="idx" class="grid grid-cols-1 md:grid-cols-3 gap-3 items-start">
          <input v-model="o.city" placeholder="Thành phố" type="text" class="form-input" />
          <div class="md:col-span-2 flex gap-2">
            <input v-model="o.address" placeholder="Địa chỉ" type="text" class="form-input flex-1" />
            <button class="delete-btn" @click="removeOffice(idx)">Xóa</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Contact CTA -->
    <div class="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="block font-medium mb-1">Số điện thoại</label>
        <input v-model="form.contactCTA.phone" type="text" class="form-input" />
      </div>
      <div>
        <label class="block font-medium mb-1">Email</label>
        <input v-model="form.contactCTA.email" type="text" class="form-input" />
      </div>
      <div>
        <label class="block font-medium mb-1">Facebook</label>
        <input v-model="form.contactCTA.facebook" type="text" class="form-input" />
      </div>
      <div>
        <label class="block font-medium mb-1">Website</label>
        <input v-model="form.contactCTA.website" type="text" class="form-input" />
      </div>
    </div>
  </div>
  
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useSiteContentStore } from '~/stores/siteContent'
import { useSiteContent } from '~/composables/useSiteContent'
import { useNotification } from '~/composables/useNotification'
import { normalizeAboutFromApi, denormalizeAboutToApi } from '~/utils/siteContentMapper'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const siteStore = useSiteContentStore()
const { about } = storeToRefs(siteStore)

const form = reactive(JSON.parse(JSON.stringify(about.value)))
const coreValuesInput = ref(form.coreValues.join(', '))
const timelineBullets = ref(form.timeline.map(i => (i.bullets || []).join(', ')))
const saving = ref(false)
const version = ref<number | undefined>(undefined)
const { getAbout, updateAbout } = useSiteContent()
const { handleApiError, handleApiSuccess } = useNotification()

onMounted(() => {
  siteStore.initFromLocalStorage()
  // Load from API (public)
  refreshFromApi()
})

async function refreshFromApi() {
  try {
    const res: any = await getAbout()
    const data = res?.data || res
    if (data) {
      const raw = data.content || data
      const normalized = normalizeAboutFromApi(raw, siteStore.about as any)
      Object.assign(form, JSON.parse(JSON.stringify(normalized)))
      // Optional metadata
      version.value = data.version
      coreValuesInput.value = form.coreValues.join(', ')
      timelineBullets.value = form.timeline.map((i: any) => (i.bullets || []).join(', '))
    }
  } catch (e) {
    // fall back silently to local store
  }
}

function addIntro() { form.introParagraphs.push('') }
function removeIntro(idx: number) { form.introParagraphs.splice(idx, 1) }

function addTimeline() { form.timeline.push({ title: '', subtitle: '', period: '', description: '', bullets: [] }) }
function removeTimeline(idx: number) { form.timeline.splice(idx, 1); timelineBullets.value.splice(idx, 1) }
function applyBullets(idx: number) { form.timeline[idx].bullets = (timelineBullets.value[idx] || '').split(',').map(s => s.trim()).filter(Boolean) }

function addAward() { form.awards.push({ title: '', description: '' }) }
function removeAward(idx: number) { form.awards.splice(idx, 1) }

function addTestimonial() { form.testimonials.push({ name: '', role: '', feedback: '' }) }
function removeTestimonial(idx: number) { form.testimonials.splice(idx, 1) }

function addPrinciple() { form.principles.push({ title: '', description: '' }) }
function removePrinciple(idx: number) { form.principles.splice(idx, 1) }

function addService() { form.services.push({ title: '', description: '' }) }
function removeService(idx: number) { form.services.splice(idx, 1) }

function addOffice() { form.offices.push({ city: '', address: '' }) }
function removeOffice(idx: number) { form.offices.splice(idx, 1) }

function applyCoreValues() { form.coreValues = coreValuesInput.value.split(',').map(s => s.trim()).filter(Boolean) }

async function save() {
  try {
    saving.value = true
    const toApi = denormalizeAboutToApi(form)
    const res: any = await updateAbout(toApi, { ifVersion: version.value })
    handleApiSuccess(res, 'Đã lưu nội dung Giới thiệu')
    // sync local
    siteStore.about = JSON.parse(JSON.stringify(form))
    siteStore.saveToLocalStorage()
    // update version if returned
    const data = res?.data || res
    if (data?.version) version.value = data.version
  } catch (e) {
    handleApiError(e, 'Lưu thất bại')
  } finally {
    saving.value = false
  }
}

function reset() {
  siteStore.resetToDefaults()
  Object.assign(form, JSON.parse(JSON.stringify(siteStore.about)))
  coreValuesInput.value = form.coreValues.join(', ')
  timelineBullets.value = form.timeline.map(i => (i.bullets || []).join(', '))
}
</script>

<style scoped>
.form-input, .form-textarea, select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: var(--bg-card);
  color: var(--text-primary);
}
.save-btn {
  padding: 0.6rem 1rem;
  background: var(--primary-color);
  color: #fff;
  border: none;
  border-radius: 8px;
}
.cancel-btn {
  padding: 0.6rem 1rem;
  border: 1px solid var(--border-color);
  background: var(--bg-card);
  color: var(--text-primary);
  border-radius: 8px;
}
.add-btn, .delete-btn {
  padding: 0.5rem 0.8rem;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  background: var(--bg-card);
}
.delete-btn { color: var(--danger-color); }
</style>


