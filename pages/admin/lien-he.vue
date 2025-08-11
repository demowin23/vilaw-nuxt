<template>
  <div class="p-4 space-y-6">
    <div class="page-header flex items-center justify-between">
      <div>
        <h2>Quản trị trang Liên hệ</h2>
        <p class="text-sm text-gray-500">Chỉnh sửa nội dung trang và lưu vào store</p>
      </div>
      <div class="flex gap-2">
        <button class="cancel-btn" @click="reset">Phục hồi mặc định</button>
        <button class="save-btn" :disabled="saving" @click="save">{{ saving ? 'Đang lưu...' : 'Lưu thay đổi' }}</button>
      </div>
    </div>

    <!-- Hero section -->
    <div class="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="block font-medium mb-1">Tiêu đề</label>
        <input v-model="form.heroTitle" type="text" class="form-input" />
      </div>
      <div>
        <label class="block font-medium mb-1">Phụ đề</label>
        <input v-model="form.heroSubtitle" type="text" class="form-input" />
      </div>
    </div>

    <!-- Company info -->
    <div class="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-4">
      <div class="flex items-center justify-between mb-3">
        <h3 class="m-0">Thông tin pháp lý</h3>
        <button class="add-btn" @click="addCompanyInfo">+ Thêm</button>
      </div>
      <div class="space-y-3">
        <div v-for="(ci, idx) in form.companyInfo" :key="idx" class="grid grid-cols-1 md:grid-cols-3 gap-3 items-start">
          <input v-model="ci.label" placeholder="Nhãn" type="text" class="form-input" />
          <div class="md:col-span-2 flex gap-2">
            <input v-model="ci.value" placeholder="Giá trị" type="text" class="form-input flex-1" />
            <button class="delete-btn" @click="removeCompanyInfo(idx)">Xóa</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Contact details -->
    <div class="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="block font-medium mb-1">Địa chỉ</label>
        <input v-model="form.address" type="text" class="form-input" />
      </div>
      <div>
        <label class="block font-medium mb-1">Hotline</label>
        <input v-model="form.hotline" type="text" class="form-input" />
      </div>
      <div>
        <label class="block font-medium mb-1">Email</label>
        <input v-model="form.email" type="email" class="form-input" />
      </div>
    </div>

    <!-- Business hours -->
    <div class="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-4">
      <div class="flex items-center justify-between mb-3">
        <h3 class="m-0">Giờ làm việc</h3>
        <button class="add-btn" @click="addHour">+ Thêm</button>
      </div>
      <div class="space-y-3">
        <div v-for="(h, idx) in form.businessHours" :key="idx" class="grid grid-cols-1 md:grid-cols-3 gap-3 items-start">
          <input v-model="h.label" placeholder="Khoảng thời gian" type="text" class="form-input" />
          <div class="md:col-span-2 flex gap-2">
            <input v-model="h.value" placeholder="Giờ" type="text" class="form-input flex-1" />
            <button class="delete-btn" @click="removeHour(idx)">Xóa</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Map embed -->
    <div class="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-4">
      <label class="block font-medium mb-1">Google Map Embed URL</label>
      <input v-model="form.mapEmbedSrc" type="text" class="form-input" />
    </div>

    
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useSiteContentStore } from '~/stores/siteContent'
import { useSiteContent } from '~/composables/useSiteContent'
import { useNotification } from '~/composables/useNotification'
import { normalizeContactFromApi, denormalizeContactToApi } from '~/utils/siteContentMapper'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const siteStore = useSiteContentStore()
const { contact } = storeToRefs(siteStore)
const form = reactive(JSON.parse(JSON.stringify(contact.value)))
const saving = ref(false)
const version = ref<number | undefined>(undefined)
const { getContact, updateContact } = useSiteContent()
const { handleApiError, handleApiSuccess } = useNotification()

onMounted(() => { 
  siteStore.initFromLocalStorage()
  refreshFromApi()
})

async function refreshFromApi() {
  try {
    const res: any = await getContact()
    const data = res?.data || res
    if (data) {
      const raw = data.content || data
      const normalized = normalizeContactFromApi(raw, siteStore.contact as any)
      Object.assign(form, JSON.parse(JSON.stringify(normalized)))
      version.value = data.version
    }
  } catch (e) {
    // ignore and keep local
  }
}

function addCompanyInfo() { form.companyInfo.push({ label: '', value: '' }) }
function removeCompanyInfo(idx: number) { form.companyInfo.splice(idx, 1) }

function addHour() { form.businessHours.push({ label: '', value: '' }) }
function removeHour(idx: number) { form.businessHours.splice(idx, 1) }

async function save() {
  try {
    saving.value = true
    const toApi = denormalizeContactToApi(form)
    const res: any = await updateContact(toApi, { ifVersion: version.value })
    handleApiSuccess(res, 'Đã lưu nội dung Liên hệ')
    siteStore.contact = JSON.parse(JSON.stringify(form))
    siteStore.saveToLocalStorage()
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
  Object.assign(form, JSON.parse(JSON.stringify(siteStore.contact)))
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


