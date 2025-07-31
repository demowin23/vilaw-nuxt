import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', {
  state: () => ({
    isOpen: false,
    title: '',
    message: '',
    packages: [] as Array<{
      id: string
      name: string
      description: string
      price: string
      buttonText: string
    }>,
    disclaimer: ''
  }),
  
  getters: {
    isModalOpen: (state) => state.isOpen
  },
  
  actions: {
    openServiceModal() {
      this.isOpen = true
      this.title = 'Danh sách gói cước'
      this.message = 'Để xem nội dung này bạn cần đăng ký sử dụng gói dịch vụ của chúng tôi'
      this.packages = [
        {
          id: 'individual',
          name: 'Gói Mua Lẻ',
          description: 'Bạn được xem miễn phí nội dung Vụ án: Trả thù - PHẦN 2: GIẢI MÃ LỜI THỀ trong 24h kể từ thời điểm mua thành công.',
          price: '3.000₫/24h/nội dung',
          buttonText: 'Đăng ký'
        },
        {
          id: 'daily',
          name: 'Gói Pháp luật đời sống Ngày',
          description: 'Bạn được miễn cước 3G/4G/5G và xem không giới hạn kho nội dung Pháp luật đời sống trong 1 ngày kể từ thời điểm đăng ký thành công.',
          price: '3.000đ/1 ngày',
          buttonText: 'Đăng ký'
        },
        {
          id: 'plv8',
          name: 'Gói PLV8',
          description: 'Bạn có 2G tốc độ cao truy cập gói Pháp luật đời sống trong 1 ngày kể từ thời điểm đăng ký thành công.',
          price: '8.000đ/1 ngày',
          buttonText: 'Đăng ký'
        }
      ]
      this.disclaimer = '(Chỉ áp dụng với thuê bao mạng VinaPhone mua gói Ngày/Tuần, miễn phí hoàn toàn cước 3G/4G/5G)'
    },
    
    openCustomModal(data: {
      title: string
      message: string
      packages: Array<{
        id: string
        name: string
        description: string
        price: string
        buttonText: string
      }>
      disclaimer?: string
    }) {
      this.isOpen = true
      this.title = data.title
      this.message = data.message
      this.packages = data.packages
      this.disclaimer = data.disclaimer || ''
    },
    
    closeModal() {
      this.isOpen = false
      this.title = ''
      this.message = ''
      this.packages = []
      this.disclaimer = ''
    },
    
    handlePackageClick(packageId: string) {
      console.log('Package clicked:', packageId)
      // Có thể thêm logic xử lý đăng ký gói ở đây
    }
  }
}) 