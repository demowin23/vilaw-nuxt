import { ref, readonly } from 'vue'
import { useCategory } from './useCategory'
import { useLegalKnowledge } from './useLegalKnowledge'
import { useVideoLifeLaw } from './useVideoLifeLaw'
import { useDocuments } from './useDocuments'
import { useNews } from './useNews'

export const useSitemap = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  
  // Data refs
  const categories = ref<any[]>([])
  const featuredKnowledge = ref<any[]>([])
  const featuredVideos = ref<any[]>([])
  const popularDocuments = ref<any[]>([])
  const featuredNews = ref<any[]>([])

  // Composables
  const { getCategories } = useCategory()
  const { getLegalKnowledge } = useLegalKnowledge()
  const { getVideoLifeLaw } = useVideoLifeLaw()
  const { getDocuments } = useDocuments()
  const { getNews } = useNews()

  // Fetch all sitemap data
  const fetchSitemapData = async () => {
    try {
      loading.value = true
      error.value = null
      
      // Fetch all data in parallel for better performance
      const [
        categoriesResponse,
        knowledgeResponse,
        videosResponse,
        documentsResponse,
        newsResponse
      ] = await Promise.all([
        getCategories(),
        getLegalKnowledge({ is_featured: true, limit: 10 }),
        getVideoLifeLaw({ is_featured: true, limit: 10 }),
        getDocuments({ is_important: 'true', limit: '10' }),
        getNews({ search: '', isPending: '' })
      ])

      // Set data
      categories.value = categoriesResponse.data || []
      featuredKnowledge.value = knowledgeResponse.data || []
      featuredVideos.value = videosResponse.data || []
      popularDocuments.value = documentsResponse.data || []
      featuredNews.value = newsResponse.data || []

    } catch (err: any) {
      error.value = err.message || 'Có lỗi xảy ra khi tải dữ liệu sitemap'
      console.error('Error fetching sitemap data:', err)
    } finally {
      loading.value = false
    }
  }

  // Get sitemap structure
  const getSitemapStructure = () => {
    return {
      home: {
        title: 'Trang chủ',
        icon: '🏠',
        links: [
          { title: 'Trang chủ', url: '/' }
        ]
      },
      knowledge: {
        title: 'Kiến thức pháp luật',
        icon: '📚',
        links: [
          { title: 'Tất cả kiến thức', url: '/kien-thuc' }
        ],
        categories: categories.value.map(cat => ({
          title: cat.label,
          url: `/kien-thuc/${cat.value}`
        })),
        featured: featuredKnowledge.value.slice(0, 5).map(article => ({
          title: article.title,
          url: `/kien-thuc/chi-tiet/${article.id}-${slugify(article.title)}`
        }))
      },
      videos: {
        title: 'Video pháp luật',
        icon: '🎥',
        links: [
          { title: 'Tất cả video', url: '/phap-luat-doi-song' }
        ],
        featured: featuredVideos.value.slice(0, 5).map(video => ({
          title: video.title,
          url: `/video/${video.id}-${slugify(video.title)}`
        }))
      },
      documents: {
        title: 'Văn bản pháp luật',
        icon: '📄',
        links: [
          { title: 'Tất cả văn bản', url: '/van-ban' }
        ],
        popular: popularDocuments.value.slice(0, 5).map(doc => ({
          title: doc.title,
          url: `/van-ban/${doc.id}-${slugify(doc.title)}`
        }))
      },
      news: {
        title: 'Tin tức pháp luật',
        icon: '📰',
        links: [
          { title: 'Tất cả tin tức', url: '/tin-tuc' }
        ],
        featured: featuredNews.value.slice(0, 5).map(news => ({
          title: news.title,
          url: `/tin-tuc/${news.id}-${slugify(news.title)}`
        }))
      },
      services: {
        title: 'Dịch vụ',
        icon: '💼',
        links: [
          { title: 'Chat với luật sư', url: '/chat-luat-su' },
          { title: 'Mua gói dịch vụ', url: '/mua-goi' },
          { title: 'Liên hệ', url: '/lien-he' }
        ]
      },
      account: {
        title: 'Tài khoản',
        icon: '👤',
        links: [
          { title: 'Đăng nhập', url: '/dang-nhap' },
          { title: 'Đăng ký', url: '/dang-ky' },
          { title: 'Quên mật khẩu', url: '/quen-mat-khau' }
        ]
      },
      info: {
        title: 'Thông tin',
        icon: 'ℹ️',
        links: [
          { title: 'Giới thiệu', url: '/gioi-thieu' }
        ]
      }
    }
  }

  return {
    loading: readonly(loading),
    error: readonly(error),
    categories: readonly(categories),
    featuredKnowledge: readonly(featuredKnowledge),
    featuredVideos: readonly(featuredVideos),
    popularDocuments: readonly(popularDocuments),
    featuredNews: readonly(featuredNews),
    fetchSitemapData,
    getSitemapStructure
  }
}

// Helper function for slugification
function slugify(text: string) {
  const from = "àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ"
  const to = "aaaaaaaaaaaaaaaaaeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyydAAAAAAAAAAAAAAAAAEEEEEEEEEEEIIIIIOOOOOOOOOOOOOOOOOUUUUUUUUUUUYYYYYD"
  let slug = text
  for (let i = 0; i < from.length; i++) {
    slug = slug.replace(new RegExp(from[i], "g"), to[i])
  }
  slug = slug
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
  slug = slug.replace(/-+/g, "-")
  slug = slug.replace(/^-+|-+$/g, "")
  return slug
}
