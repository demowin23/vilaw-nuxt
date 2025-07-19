<template>
  <div class="w-full">
    <div class="news-header mb-8">
      <h1
        class="text-3xl font-bold text-[#f58220] mb-4 transition-colors duration-300"
      >
        Tin tức pháp luật
      </h1>
      <p
        class="text-gray-700 dark:text-gray-300 transition-colors duration-300 text-lg"
      >
        Cập nhật những tin tức, bài viết pháp luật mới nhất, đáng tin cậy và hữu
        ích cho bạn.
      </p>
    </div>

    <!-- Featured News Section -->
    <div class="featured-news mb-12">
      <h2
        class="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 transition-colors duration-300"
      >
        Tin tức nổi bật
      </h2>
      <div class="featured-grid">
        <!-- Box chính bên trái -->
        <div class="featured-main">
          <div class="featured-thumbnail">
            <img
              src="/images/dich-vu-cua-chung-toi.BYo7SAj4_Z1tJAQ9.webp"
              alt="Tin tức chính"
            />
            <div class="featured-category">Giao thông</div>
          </div>
          <div class="featured-content">
            <h3 class="featured-title">
              Quy định mới về xử lý vi phạm giao thông đường bộ năm 2024
            </h3>
            <p class="featured-excerpt">
              Bộ Công an vừa ban hành Thông tư mới về xử lý vi phạm hành chính
              trong lĩnh vực giao thông đường bộ với nhiều điểm đáng chú ý...
            </p>
            <div class="featured-meta">
              <span class="featured-date">15 tháng 1, 2024</span>
              <span class="featured-views">15,420 lượt đọc</span>
            </div>
          </div>
        </div>

        <!-- 4 item dọc bên phải -->
        <div class="featured-sidebar">
          <div class="featured-item">
            <div class="featured-item-thumbnail">
              <img src="/images/meclip.jpeg" alt="Tin tức 1" />
              <div class="featured-category">Hôn nhân</div>
            </div>
            <div class="featured-item-content">
              <h3 class="featured-item-title">
                Hướng dẫn thủ tục ly hôn đơn phương mới nhất
              </h3>
              <p class="featured-item-excerpt">
                Thủ tục ly hôn đơn phương được quy định chi tiết trong Luật Hôn
                nhân và gia đình...
              </p>
              <div class="featured-meta">
                <span class="featured-date">14 tháng 1, 2024</span>
                <span class="featured-views">12,850 lượt đọc</span>
              </div>
            </div>
          </div>

          <div class="featured-item">
            <div class="featured-item-thumbnail">
              <img
                src="/images/ton-chi-hoat-dong.DKjQaDsR_1Y6nqo.webp"
                alt="Tin tức 2"
              />
              <div class="featured-category">Thừa kế</div>
            </div>
            <div class="featured-item-content">
              <h3 class="featured-item-title">
                Quyền thừa kế của con nuôi theo pháp luật Việt Nam
              </h3>
              <p class="featured-item-excerpt">
                Con nuôi có quyền thừa kế ngang bằng với con đẻ theo quy định
                của Bộ luật Dân sự...
              </p>
              <div class="featured-meta">
                <span class="featured-date">13 tháng 1, 2024</span>
                <span class="featured-views">9,870 lượt đọc</span>
              </div>
            </div>
          </div>

          <div class="featured-item">
            <div class="featured-item-thumbnail">
              <img src="/images/bai-tap-luat.webp" alt="Tin tức 3" />
              <div class="featured-category">Dân sự</div>
            </div>
            <div class="featured-item-content">
              <h3 class="featured-item-title">
                Phân tích án lệ về tranh chấp hợp đồng mua bán nhà đất
              </h3>
              <p class="featured-item-excerpt">
                Án lệ số 23/2018/AL của Tòa án nhân dân tối cao về hiệu lực của
                hợp đồng...
              </p>
              <div class="featured-meta">
                <span class="featured-date">12 tháng 1, 2024</span>
                <span class="featured-views">8,760 lượt đọc</span>
              </div>
            </div>
          </div>

          <div class="featured-item">
            <div class="featured-item-thumbnail">
              <img src="/images/de-thi-luat.webp" alt="Tin tức 4" />
              <div class="featured-category">Lao động</div>
            </div>
            <div class="featured-item-content">
              <h3 class="featured-item-title">
                Quy định về thời gian làm việc và nghỉ ngơi của người lao động
              </h3>
              <p class="featured-item-excerpt">
                Luật Lao động 2019 có những quy định mới về thời gian làm việc
                và chế độ nghỉ ngơi...
              </p>
              <div class="featured-meta">
                <span class="featured-date">11 tháng 1, 2024</span>
                <span class="featured-views">7,650 lượt đọc</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main News List -->
    <NewsList :news="allNews" title="Tất cả tin tức" />
  </div>
</template>

<script setup lang="ts">
import NewsList from "~/components/NewsList.vue";

// All news data
const allNews = [
  {
    id: 4,
    thumbnail: "/images/bai-tap-luat.webp",
    title: "Phân tích án lệ về tranh chấp hợp đồng mua bán nhà đất",
    excerpt:
      "Án lệ số 23/2018/AL của Tòa án nhân dân tối cao về hiệu lực của hợp đồng mua bán nhà đất khi chưa có sổ đỏ...",
    category: "Dân sự",
    date: "2024-01-12",
    views: 8760,
  },
  {
    id: 5,
    thumbnail: "/images/de-thi-luat.webp",
    title: "Quy định về thời gian làm việc và nghỉ ngơi của người lao động",
    excerpt:
      "Luật Lao động 2019 có những quy định mới về thời gian làm việc, nghỉ ngơi và chế độ làm thêm giờ...",
    category: "Lao động",
    date: "2024-01-11",
    views: 7650,
  },
  {
    id: 6,
    thumbnail: "/images/on-thi-luat.webp",
    title: "Tội phạm về ma túy và hình phạt theo Bộ luật Hình sự",
    excerpt:
      "Bộ luật Hình sự 2015 quy định các tội phạm về ma túy với mức hình phạt nghiêm khắc...",
    category: "Hình sự",
    date: "2024-01-10",
    views: 6540,
  },
  {
    id: 7,
    thumbnail: "/images/sach-luat.webp",
    title: "Thủ tục đăng ký kinh doanh online theo quy định mới",
    excerpt:
      "Nghị định mới về thương mại điện tử có những quy định cụ thể về đăng ký kinh doanh online...",
    category: "Kinh doanh",
    date: "2024-01-09",
    views: 5430,
  },
  {
    id: 8,
    thumbnail: "/images/n.png",
    title: "Quyền sử dụng đất và thủ tục chuyển đổi mục đích sử dụng",
    excerpt:
      "Luật Đất đai 2013 quy định chi tiết về quyền sử dụng đất và thủ tục chuyển đổi mục đích sử dụng đất...",
    category: "Đất đai",
    date: "2024-01-08",
    views: 4320,
  },
  {
    id: 9,
    thumbnail: "/images/dich-vu-cua-chung-toi.BYo7SAj4_Z1tJAQ9.webp",
    title: "Bảo vệ quyền lợi người tiêu dùng trong giao dịch thương mại",
    excerpt:
      "Luật Bảo vệ quyền lợi người tiêu dùng có những quy định quan trọng về bảo vệ người tiêu dùng...",
    category: "Kinh doanh",
    date: "2024-01-07",
    views: 3210,
  },
  {
    id: 10,
    thumbnail: "/images/meclip.jpeg",
    title: "Quy định về bồi thường thiệt hại do vi phạm hợp đồng",
    excerpt:
      "Bộ luật Dân sự 2015 quy định chi tiết về bồi thường thiệt hại khi vi phạm nghĩa vụ hợp đồng...",
    category: "Dân sự",
    date: "2024-01-06",
    views: 2980,
  },
  {
    id: 11,
    thumbnail: "/images/ton-chi-hoat-dong.DKjQaDsR_1Y6nqo.webp",
    title: "Thủ tục giải quyết tranh chấp lao động tập thể",
    excerpt:
      "Luật Lao động quy định các bước giải quyết tranh chấp lao động tập thể một cách hòa bình...",
    category: "Lao động",
    date: "2024-01-05",
    views: 2870,
  },
  {
    id: 12,
    thumbnail: "/images/bai-tap-luat.webp",
    title: "Quy định về tội phạm rửa tiền và chống rửa tiền",
    excerpt:
      "Luật Phòng, chống rửa tiền có những quy định nghiêm ngặt về phòng chống tội phạm rửa tiền...",
    category: "Hình sự",
    date: "2024-01-04",
    views: 2760,
  },
  {
    id: 13,
    thumbnail: "/images/de-thi-luat.webp",
    title: "Quyền thừa kế của vợ chồng theo pháp luật Việt Nam",
    excerpt:
      "Bộ luật Dân sự quy định về quyền thừa kế của vợ chồng trong trường hợp một bên chết trước...",
    category: "Thừa kế",
    date: "2024-01-03",
    views: 2650,
  },
  {
    id: 14,
    thumbnail: "/images/on-thi-luat.webp",
    title: "Thủ tục đăng ký hộ khẩu thường trú mới nhất",
    excerpt:
      "Nghị định mới về đăng ký cư trú có những thay đổi quan trọng về thủ tục đăng ký hộ khẩu...",
    category: "Hành chính",
    date: "2024-01-02",
    views: 2540,
  },
  {
    id: 15,
    thumbnail: "/images/sach-luat.webp",
    title: "Quy định về bảo vệ môi trường trong hoạt động kinh doanh",
    excerpt:
      "Luật Bảo vệ môi trường 2020 có những quy định mới về trách nhiệm bảo vệ môi trường...",
    category: "Môi trường",
    date: "2024-01-01",
    views: 2430,
  },
  {
    id: 12,
    thumbnail: "/images/bai-tap-luat.webp",
    title: "Quy định về tội phạm rửa tiền và chống rửa tiền",
    excerpt:
      "Luật Phòng, chống rửa tiền có những quy định nghiêm ngặt về phòng chống tội phạm rửa tiền...",
    category: "Hình sự",
    date: "2024-01-04",
    views: 2760,
  },
  {
    id: 13,
    thumbnail: "/images/de-thi-luat.webp",
    title: "Quyền thừa kế của vợ chồng theo pháp luật Việt Nam",
    excerpt:
      "Bộ luật Dân sự quy định về quyền thừa kế của vợ chồng trong trường hợp một bên chết trước...",
    category: "Thừa kế",
    date: "2024-01-03",
    views: 2650,
  },
  {
    id: 14,
    thumbnail: "/images/on-thi-luat.webp",
    title: "Thủ tục đăng ký hộ khẩu thường trú mới nhất",
    excerpt:
      "Nghị định mới về đăng ký cư trú có những thay đổi quan trọng về thủ tục đăng ký hộ khẩu...",
    category: "Hành chính",
    date: "2024-01-02",
    views: 2540,
  },
  {
    id: 15,
    thumbnail: "/images/sach-luat.webp",
    title: "Quy định về bảo vệ môi trường trong hoạt động kinh doanh",
    excerpt:
      "Luật Bảo vệ môi trường 2020 có những quy định mới về trách nhiệm bảo vệ môi trường...",
    category: "Môi trường",
    date: "2024-01-01",
    views: 2430,
  },
];

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function handleNewsClick(news: any) {
  navigateTo(`/tin-tuc/${news.id}`);
}
</script>

<style scoped>
.news-header {
  text-align: center;
}

/* Featured News Styles */
.featured-news {
  margin-bottom: 48px;
}

.featured-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  align-items: stretch;
  height: 600px;
}

.featured-sidebar {
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 95%;
}

.featured-main {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  background: white;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  height: 95%;
}

.dark .featured-main {
  background: #1f2937;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
}

.featured-main:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.featured-item {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  background: white;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  display: flex;
  height: 130px;
}

.dark .featured-item {
  background: #1f2937;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
}

.featured-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.featured-thumbnail {
  position: relative;
  height: 60%;
  overflow: hidden;
  flex-shrink: 0;
}

.featured-main .featured-thumbnail {
  height: 65%;
}

.featured-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.featured-main:hover .featured-thumbnail img {
  transform: scale(1.05);
}

.featured-item-thumbnail {
  position: relative;
  width: 120px;
  height: 100%;
  overflow: hidden;
  flex-shrink: 0;
}

.featured-item-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.featured-item:hover .featured-item-thumbnail img {
  transform: scale(1.05);
}

.featured-category {
  position: absolute;
  top: 12px;
  left: 12px;
  background: #f58220;
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.featured-content {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  justify-content: space-between;
}

.featured-title {
  font-size: 1.1rem;
  font-weight: 700;
  line-height: 1.4;
  color: #181818;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.3s ease;
}

.dark .featured-title {
  color: #f9fafb;
}

.featured-main .featured-title {
  font-size: 1.3rem;
  -webkit-line-clamp: 3;
}

.featured-item-content {
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
  justify-content: space-between;
}

.featured-item-title {
  font-size: 0.9rem;
  font-weight: 600;
  line-height: 1.3;
  color: #181818;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.3s ease;
  margin-bottom: 4px;
}

.dark .featured-item-title {
  color: #f9fafb;
}

.featured-item-excerpt {
  font-size: 0.75rem;
  color: #666;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.3s ease;
  margin-bottom: 6px;
}

.dark .featured-item-excerpt {
  color: #9ca3af;
}

.featured-excerpt {
  font-size: 0.9rem;
  color: #666;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.3s ease;
}

.dark .featured-excerpt {
  color: #9ca3af;
}

.featured-main .featured-excerpt {
  -webkit-line-clamp: 3;
}

.featured-small .featured-excerpt {
  display: none;
}

.featured-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  color: #888;
  transition: color 0.3s ease;
  gap: 12px;
  margin-top: auto;
}

.featured-item .featured-meta {
  font-size: 0.75rem;
  gap: 8px;
}

.dark .featured-meta {
  color: #9ca3af;
}

.featured-date {
  font-weight: 500;
}

.featured-views {
  display: flex;
  align-items: center;
  gap: 4px;
}

.featured-views::before {
  content: "👁";
  font-size: 0.7rem;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .featured-grid {
    gap: 20px;
    height: 550px;
  }

  .featured-sidebar {
    gap: 12px;
  }
}

@media (max-width: 768px) {
  .featured-news {
    margin-bottom: 32px;
  }

  .featured-news h2 {
    font-size: 1.5rem;
    margin-bottom: 16px;
  }

  .featured-grid {
    grid-template-columns: 1fr;
    gap: 16px;
    height: auto;
  }

  .featured-sidebar {
    gap: 12px;
  }

  .featured-item {
    height: 120px;
  }

  .featured-item-thumbnail {
    width: 100px;
  }

  .featured-thumbnail {
    height: 55%;
  }

  .featured-main .featured-thumbnail {
    height: 65%;
  }

  .featured-small .featured-thumbnail {
    height: 50%;
  }

  .featured-content {
    padding: 12px;
  }

  .featured-title {
    font-size: 1rem;
  }

  .featured-main .featured-title {
    font-size: 1.2rem;
  }

  .featured-small .featured-title {
    font-size: 0.9rem;
  }

  .featured-excerpt {
    font-size: 0.85rem;
  }

  .featured-main .featured-excerpt {
  }

  .featured-meta {
    font-size: 0.75rem;
  }

  .featured-views::before {
    font-size: 0.65rem;
  }
}

@media (max-width: 480px) {
  .featured-news {
    margin-bottom: 24px;
  }

  .featured-news h2 {
    font-size: 1.25rem;
    margin-bottom: 12px;
  }

  .featured-grid {
    gap: 12px;
  }

  .featured-sidebar {
    gap: 10px;
  }

  .featured-item {
    height: 100px;
  }

  .featured-item-thumbnail {
    width: 80px;
  }

  .featured-item-content {
    padding: 8px;
  }

  .featured-item-title {
    font-size: 0.8rem;
  }

  .featured-item-excerpt {
    font-size: 0.7rem;
    -webkit-line-clamp: 1;
  }

  .featured-item .featured-meta {
    font-size: 0.7rem;
  }

  .featured-thumbnail {
    height: 50%;
  }

  .featured-main .featured-thumbnail {
    height: 60%;
  }

  .featured-small .featured-thumbnail {
    height: 45%;
  }

  .featured-content {
    padding: 10px;
  }

  .featured-title {
    font-size: 0.95rem;
  }

  .featured-main .featured-title {
    font-size: 1.1rem;
  }

  .featured-small .featured-title {
    font-size: 0.85rem;
  }

  .featured-excerpt {
    font-size: 0.8rem;
  }

  .featured-meta {
    font-size: 0.7rem;
    gap: 8px;
  }

  .featured-views::before {
    font-size: 0.6rem;
  }
}
</style>
