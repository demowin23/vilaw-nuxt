import { defineStore } from 'pinia'

export interface TimelineItem {
  title: string
  subtitle?: string
  period?: string
  description?: string
  bullets?: string[]
}

export interface AwardItem {
  title: string
  description: string
}

export interface TestimonialItem {
  name: string
  role: string
  feedback: string
}

export interface PrincipleItem {
  title: string
  description: string
}

export interface ServiceItem {
  title: string
  description: string
}

export interface OfficeItem {
  city: string
  address: string
}

export interface BusinessHourItem {
  label: string
  value: string
}

export interface AboutContentState {
  headerTitle: string
  companyName: string
  introParagraphs: string[]
  timeline: TimelineItem[]
  awards: AwardItem[]
  testimonials: TestimonialItem[]
  principles: PrincipleItem[]
  mission: string
  coreValues: string[]
  stats: { offices: string; lawyers: string; enterpriseClients: string; individualClients: string }
  services: ServiceItem[]
  servicesImage: string
  offices: OfficeItem[]
  contactCTA: { phone: string; email: string; facebook: string; website: string }
}

export interface ContactContentState {
  heroTitle: string
  heroSubtitle: string
  companyInfo: { label: string; value: string }[]
  address: string
  hotline: string
  email: string
  businessHours: BusinessHourItem[]
  mapEmbedSrc: string
  formPlaceholders: { name: string; phone: string; email: string; message: string }
}

interface SiteContentState {
  about: AboutContentState
  contact: ContactContentState
}

const defaultState = (): SiteContentState => ({
  about: {
    headerTitle: 'Về chúng tôi',
    companyName: 'ViLaw',
    introParagraphs: [
      'Với phương châm hoạt động: “Thời Gian – Tận Tâm – Tận Lực”, chúng tôi luôn cam kết mang đến những dịch vụ pháp lý chất lượng, nhanh chóng, chính xác và toàn diện nhất. Tại Y&P Law Firm, chúng tôi tin rằng giá trị thực sự của một Doanh nghiệp, một tổ chức tư vấn pháp lý, được xây dựng trên nền tảng những giá trị cốt lõi.',
      'Với nhiều năm kinh nghiệm hợp tác và cung cấp dịch vụ tư vấn pháp lý cho các Doanh nghiệp lớn, uy tín trong và ngoài nước, đặc biệt là các tập đoàn hàng đầu như Samsung, Viettel, FPT, cũng như các nhà cung cấp, đối tác của Samsung và nhiều Doanh nghiệp Hàn Quốc, Nhật Bản tại Việt Nam, Y&P Law Firm tự tin có thể đáp ứng mọi yêu cầu pháp lý phức tạp.',
      'Chúng tôi cam kết đồng hành cùng Quý khách trên hành trình phát triển bền vững, giải quyết hiệu quả mọi vấn đề pháp lý, giúp Quý khách đạt được mục tiêu và gia tăng giá trị Doanh nghiệp.'
    ],
    timeline: [
      {
        title: 'Kiện toàn tổ chức và phát triển dịch vụ',
        subtitle: 'Bổ sung nhân lực và phát triển mở rộng quy mô dịch vụ',
        period: '2024 - đến nay',
        description:
          'Youth & Partners Law Firm đã tiến hành kiện toàn bộ máy tổ chức, bổ sung nhân lực và mở rộng quy mô dịch vụ để đáp ứng nhu cầu ngày càng cao của khách hàng.',
        bullets: ['Doanh nghiệp', 'Tư vấn thường xuyên', 'Sở hữu trí tuệ', 'Quản trị & Tuân thủ']
      },
      {
        title: 'Mở rộng',
        subtitle: 'Thêm 01 chi nhánh tại Hà Nội',
        period: '2021 - 2023',
        description:
          'Tiếp tục mở rộng mạng lưới với chi nhánh tại Hà Nội, củng cố sự hiện diện tại miền Bắc.'
      },
      {
        title: 'Mở rộng',
        subtitle: 'Thêm 01 chi nhánh tại Bắc Ninh',
        period: '2020 - 2021',
        description: 'Mở văn phòng giao dịch tại Bắc Ninh, mở rộng phạm vi hoạt động.'
      }
    ],
    awards: [
      { title: 'Giải thưởng Luật sư Xuất sắc', description: 'Đóng góp xuất sắc trong các vụ việc phức tạp.' },
      { title: 'Giải thưởng Đổi mới Pháp lý', description: 'Sáng tạo trong áp dụng công nghệ pháp lý.' },
      { title: 'Giải thưởng Đóng góp Cộng đồng', description: 'Hoạt động từ thiện và đóng góp xã hội.' }
    ],
    testimonials: [
      { name: 'Nguyễn Văn A', role: 'CEO Công ty ABC', feedback: 'Dịch vụ pháp lý chuyên nghiệp, tận tâm và hiệu quả.' },
      { name: 'Trần Thị B', role: 'Giám đốc Nhân sự', feedback: 'Tư vấn rất nhiệt tình, hỗ trợ nhanh chóng.' }
    ],
    principles: [
      { title: 'Thời gian', description: 'Đảm bảo tiến trình công việc nhanh chóng, hiệu quả.' },
      { title: 'Tận tâm', description: 'Đặt trọn tâm huyết vào từng hồ sơ, lắng nghe và thấu hiểu.' },
      { title: 'Tận lực', description: 'Vượt qua thử thách để bảo vệ quyền lợi hợp pháp của khách hàng.' }
    ],
    mission: 'Trở thành hệ sinh thái pháp lý trực tuyến hàng đầu Việt Nam.',
    coreValues: ['Chính trực', 'Chuyên nghiệp', 'Đổi mới', 'Đồng hành cùng khách hàng'],
    stats: { offices: '5', lawyers: '30+', enterpriseClients: '1176', individualClients: '723' },
    services: [
      { title: 'Sở hữu trí tuệ', description: 'Tư vấn đăng ký, bảo hộ quyền sở hữu trí tuệ.' },
      { title: 'Tư vấn doanh nghiệp', description: 'Thành lập, vận hành, giải thể doanh nghiệp.' },
      { title: 'Giải quyết tranh chấp', description: 'Đại diện, bảo vệ quyền lợi trong tranh chấp.' }
    ],
    servicesImage: '/public/images/dich-vu-cua-chung-toi.BYo7SAj4_Z1tJAQ9.webp',
    offices: [
      { city: 'Hà Nội', address: 'Tầng 5, Tòa nhà ABC, Quận Cầu Giấy' },
      { city: 'TP. Hồ Chí Minh', address: 'Lầu 3, Tòa nhà XYZ, Quận 1' },
      { city: 'Đà Nẵng', address: 'Số 12, Đường ABC, Quận Hải Châu' },
      { city: 'Nghệ An', address: 'Số 8, Đường XYZ, TP. Vinh' }
    ],
    contactCTA: {
      phone: '0123456789',
      email: 'vilaw@gmail.com',
      facebook: 'facebook.com/vilaw.vn',
      website: 'vilaw.vn'
    }
  },
  contact: {
    heroTitle: 'Liên Hệ',
    heroSubtitle: 'CÔNG TY LUẬT TNHH THÀNH ĐÔ VIỆT NAM',
    companyInfo: [
      { label: 'Giấy CNĐKHĐ', value: '01021343/TP/ĐKHĐ cấp ngày 18/08/2017 tại Sở Tư pháp Hà Nội' },
      { label: 'Mã số thuế', value: '0107979476 cấp ngày 22/02/2018 tại Chi Cục Thuế Quận Cầu Giấy' }
    ],
    address: 'Tầng 6, Tòa tháp Ngôi sao, Dương Đình Nghệ, P. Yên Hòa, Q. Cầu Giấy, Hà Nội',
    hotline: '0919 089 888',
    email: 'luatsu@luatthanhdo.com.vn',
    businessHours: [
      { label: 'Thứ 2 - Thứ 6', value: '8:00 - 17:30' },
      { label: 'Thứ 7', value: '8:00 - 12:00' },
      { label: 'Chủ nhật', value: 'Nghỉ' }
    ],
    mapEmbedSrc:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d658.3658409649598!2d105.78764914013858!3d21.021495463205078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab539381cdf9%3A0xb7015760fb64e2b8!2zUC4gRMawxqFuZyDEkMOsbmggTmdo4buHLCBIw6AgTuG7mWksIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1752811885907!5m2!1svi!2s',
    formPlaceholders: {
      name: 'Nhập họ và tên',
      phone: 'Nhập số điện thoại',
      email: 'Nhập email',
      message: 'Mô tả vấn đề cần tư vấn...'
    }
  }
})

export const useSiteContentStore = defineStore('siteContent', {
  state: (): SiteContentState => defaultState(),
  actions: {
    initFromLocalStorage() {
      if (process.client) {
        try {
          const raw = localStorage.getItem('vilaw-site-content')
          if (raw) {
            const parsed = JSON.parse(raw)
            Object.assign(this.$state, parsed)
          }
        } catch (e) {
          // ignore parse errors
        }
      }
    },
    saveToLocalStorage() {
      if (process.client) {
        localStorage.setItem('vilaw-site-content', JSON.stringify(this.$state))
      }
    },
    resetToDefaults() {
      Object.assign(this.$state, defaultState())
      this.saveToLocalStorage()
    }
  }
})


