<template>
  <VideoList
    :videos="videos2"
    title="Dân sự - Thừa kế - Hôn nhân và gia đình"
  />
  <VideoList :videos="videos1" title="Hình sự" />
  <VideoList :videos="videos3" title="Giải quyết tranh chấp" />
  <VideoList :videos="videos4" title="Kinh doanh và thương mại" />
  <VideoList :videos="videos4" title="Lao động" />
  <VideoList :videos="videos4" title="Đất đai" />
  <VideoList :videos="videos4" title="Khác" />
</template>

<script setup lang="ts">
import VideoList from "~/components/VideoList.vue";
const videos1 = [
  {
    id: 1,
    thumbnail: "/images/meclip.jpeg",
    title: "Vụ án: Cái chết sau sự thật - PHẦN 2: TRẢ GIÀY LẠI CHO NẠN NHÂN",
    duration: "8 phút",
    views: 88,
  },
  {
    id: 2,
    thumbnail: "/images/meclip.jpeg",
    title: "Vụ án: Truy tìm kẻ sát nhân - PHẦN 2: MẶT NẠ TỰ VỠ",
    duration: "8 phút",
    views: 54,
  },
  {
    id: 3,
    thumbnail: "/images/meclip.jpeg",
    title: "Vụ án: Trả thù - PHẦN 2: GIẢI MÃ LỜI THỀ",
    duration: "13 phút",
    views: 34,
  },
  {
    id: 4,
    thumbnail: "/images/meclip.jpeg",
    title: "Vụ án: Cái chết sau sự thật- PHẦN 1: BÁO MỘNG",
    duration: "7 phút",
    views: 120,
  },
  {
    id: 5,
    thumbnail: "/images/meclip.jpeg",
    title: "Vụ án: Quan hệ tình dục với vị thành niên",
    duration: "6 phút",
    views: 127,
  },
  {
    id: 6,
    thumbnail: "/images/meclip.jpeg",
    title: "Vụ án: Truy tìm kẻ sát nhân- PHẦN 1: MẶT NẠ ĐEN",
    duration: "8 phút",
    views: 118,
  },
  {
    id: 7,
    thumbnail: "/images/meclip.jpeg",
    title: "Vụ án: Quan hệ tình dục với vị thành niên",
    duration: "6 phút",
    views: 127,
  },
  {
    id: 8,
    thumbnail: "/images/meclip.jpeg",
    title: "Vụ án: Truy tìm kẻ sát nhân- PHẦN 1: MẶT NẠ ĐEN",
    duration: "8 phút",
    views: 118,
  },
];

const videos2 = [
  {
    id: 1,
    thumbnail: "/images/meclip.jpeg",
    title:
      "Từ chối hưởng di sản để trốn tránh trả nợ cho người khác có được không?",
    duration: "2 phút",
    views: 122,
  },
  {
    id: 2,
    thumbnail: "/images/meclip.jpeg",
    title: "Chồng đi làm ăn ở nước ngoài, vợ có đơn phương ly hôn được không?",
    duration: "4 phút",
    views: 126,
  },
  {
    id: 3,
    thumbnail: "/images/meclip.jpeg",
    title: "Con bất hiếu! Pháp luật có cho hưởng thừa kế hay không?",
    duration: "3 phút",
    views: 116,
  },
  {
    id: 4,
    thumbnail: "/images/meclip.jpeg",
    title:
      "Không nhất thiết con dưới 36 tháng tuổi, là mẹ có quyền nuôi con khi ly hôn?",
    duration: "3 phút",
    views: 126,
  },
  {
    id: 5,
    thumbnail: "/images/meclip.jpeg",
    title: "Con bất hiếu! Pháp luật có cho hưởng thừa kế hay không?",
    duration: "3 phút",
    views: 116,
  },
  {
    id: 6,
    thumbnail: "/images/meclip.jpeg",
    title:
      "Không nhất thiết con dưới 36 tháng tuổi, là mẹ có quyền nuôi con khi ly hôn?",
    duration: "3 phút",
    views: 126,
  },
  {
    id: 7,
    thumbnail: "/images/meclip.jpeg",
    title:
      "Chồng mất tích trở về khi vợ chuẩn bị tổ chức đám cưới mới, xử lý thế nào?",
    duration: "4 phút",
    views: 129,
  },
  {
    id: 8,
    thumbnail: "/images/meclip.jpeg",
    title: "Vợ có duy trì nghĩa vụ cấp dưỡng cho con riêng của chồng không?",
    duration: "2 phút",
    views: 120,
  },
];

const videos3 = [
  {
    id: 1,
    thumbnail: "/images/meclip.jpeg",
    title:
      "Từ chối hưởng di sản để trốn tránh trả nợ cho người khác có được không?",
    duration: "2 phút",
    views: 122,
  },
  {
    id: 2,
    thumbnail: "/images/meclip.jpeg",
    title:
      "PLDS_Chưa đến hạn trả nợ, tài sản thế chấp đã hết hạn có bị xử lý không?",
    duration: "2 phút",
    views: 177,
  },
  {
    id: 3,
    thumbnail: "/images/meclip.jpeg",
    title:
      "PLDS_Cháy nhà hàng xóm, dẫn đến nhà tôi bị cháy. Ai chịu trách nhiệm bồi thường?",
    duration: "3 phút",
    views: 258,
  },
  {
    id: 4,
    thumbnail: "/images/meclip.jpeg",
    title:
      "PLDS_Công việc trong hợp đồng không thể thực hiện được, xử lý thế nào?",
    duration: "3 phút",
    views: 156,
  },
  {
    id: 5,
    thumbnail: "/images/meclip.jpeg",
    title: "Khi Luật sư hứa hẹn trước kết quả với Khách hàng...",
    duration: "3 phút",
    views: 322,
  },
  {
    id: 6,
    thumbnail: "/images/meclip.jpeg",
    title: "PLDS_Súc vật gây ra thiệt hại, chủ sở hữu phải bồi thường không?",
    duration: "3 phút",
    views: 108,
  },
];

const videos4 = [
  {
    id: 1,
    thumbnail: "/images/meclip.jpeg",
    title: "Lương tháng 13 có phải là quy định bắt buộc?",
    duration: "2 phút",
    views: 0,
  },
  {
    id: 2,
    thumbnail: "/images/meclip.jpeg",
    title:
      "Quy định về dưỡng sức, phục hồi sức khỏe cho người lao động sau ốm đau",
    duration: "2 phút",
    views: 0,
  },
  {
    id: 3,
    thumbnail: "/images/meclip.jpeg",
    title: "Một ngôi nhà thế chấp cho hai khoản vay có được không?",
    duration: "2 phút",
    views: 32,
  },
  {
    id: 4,
    thumbnail: "/images/meclip.jpeg",
    title: "Tài sản đã dùng để thế chấp, có được tiếp tục cho thuê không?",
    duration: "3 phút",
    views: 39,
  },
  {
    id: 5,
    thumbnail: "/images/meclip.jpeg",
    title:
      "PLDS_Chưa đến hạn trả nợ, tài sản thế chấp đã hết hạn có bị xử lý không?",
    duration: "2 phút",
    views: 177,
  },
  {
    id: 6,
    thumbnail: "/images/meclip.jpeg",
    title:
      "PLDS_Công việc trong hợp đồng không thể thực hiện được, xử lý thế nào?",
    duration: "3 phút",
    views: 156,
  },
];
</script>
