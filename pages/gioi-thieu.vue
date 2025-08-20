<template>
  <div
    class="w-full pb-8 animate-fade-in relative bg-gray-100 dark:bg-gray-900 transition-colors duration-300"
  >
    <section
      id="ve-chung-toi"
      class="container mx-auto pt-8 pb-8 px-2 sm:px-4 section-animate"
    >
      <div
        class="bg-white dark:bg-gray-800 rounded-3xl shadow p-6 sm:p-10 mx-auto text-center transition-colors duration-300"
      >
        <div
          class="text-blue-800 dark:text-blue-300 font-bold uppercase tracking-wide text-lg mb-2 transition-colors duration-300"
        >
          {{ about.headerTitle || "Về chúng tôi" }}
        </div>
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6">
          {{ about.companyName || "Công ty Luật TNHH ViLaw" }}
        </h1>
        <div
          v-for="(p, idx) in about.introParagraphs"
          :key="idx"
          class="text-justify text-gray-600 dark:text-gray-300 text-base sm:text-lg md:text-xl leading-7 sm:leading-8 md:leading-9 mb-6 transition-colors duration-300"
        >
          {{ p }}
        </div>
      </div>
    </section>
    <!-- Lịch sử thành lập (timeline dọc, icon giữa dòng kẻ, border mỏng) -->
    <section id="lich-su" class="container mx-auto py-12 px-4 section-animate">
      <div
        class="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-10 transition-colors duration-300"
      >
        <h2
          class="text-3xl font-extrabold text-blue-800 dark:text-blue-300 mb-10 text-center tracking-tight uppercase transition-colors duration-300"
        >
          Lịch sử thành lập
        </h2>
        <div
          class="relative border-l-2 border-blue-800/30 dark:border-blue-300/30 pl-0 md:pl-0 space-y-10 transition-colors duration-300"
        >
          <div
            v-for="(t, i) in about.timeline"
            :key="i"
            class="relative flex flex-col gap-2 pl-12"
          >
            <span
              class="absolute left-0 top-0 flex items-center justify-center w-12 h-12 rounded-full border-2 border-blue-800 dark:border-blue-300 bg-white dark:bg-gray-900 text-blue-800 dark:text-blue-300 z-10 -translate-x-1/2 shadow-md transition-colors duration-300"
            >
              <!-- tabler:award -->
              <svg
                class="h-8 w-8"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  d="M12 8v8m0 0l-3-3m3 3l3-3m-3 3V8m0 0l-3 3m3-3l3 3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <circle cx="12" cy="12" r="9" />
              </svg>
            </span>
            <div class="ml-2">
              <div
                class="font-bold text-blue-800 dark:text-blue-300 text-lg transition-colors duration-300"
              >
                {{ t.title }}
              </div>
              <div
                class="font-semibold text-base text-[#222] dark:text-gray-300 transition-colors duration-300"
              >
                {{ t.subtitle }}
              </div>
              <div
                class="text-xs text-gray-500 dark:text-gray-400 mb-2 transition-colors duration-300"
              >
                {{ t.period }}
              </div>
              <div
                class="text-gray-700 dark:text-gray-300 text-base leading-relaxed transition-colors duration-300"
              >
                {{ t.description }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Giải thưởng pháp lý -->
    <section
      id="giai-thuong"
      class="container mx-auto py-12 px-4 section-animate"
    >
      <div
        class="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-10 flex flex-col md:flex-row gap-10 items-center transition-colors duration-300"
      >
        <!-- Left: Awards List -->
        <div class="flex-1 flex flex-col gap-8">
          <div
            v-for="(a, idx) in about.awards"
            :key="idx"
            class="flex items-start gap-5"
          >
            <span
              class="flex items-center justify-center w-14 h-14 aspect-square rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 text-2xl shrink-0 transition-colors duration-300"
            >
              <svg
                class="w-6 h-6 icon-bold"
                viewBox="0 0 24 24"
                data-icon="tabler:globe"
                height="1em"
                width="1em"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                >
                  <path d="M7 9a4 4 0 1 0 8 0a4 4 0 0 0-8 0"></path>
                  <path
                    d="M5.75 15A8.015 8.015 0 1 0 15 2m-4 15v4m-4 0h8"
                  ></path>
                </g>
              </svg>
            </span>
            <div>
              <div class="font-bold text-2xl mb-1">{{ a.title }}</div>
              <div class="text-gray-500 text-base">{{ a.description }}</div>
            </div>
          </div>
        </div>
        <!-- Right: Title, Description, Button -->
        <div class="flex-1 flex flex-col items-start justify-center gap-6">
          <div>
            <div
              class="text-4xl font-extrabold text-black dark:text-white mb-4 transition-colors duration-300"
            >
              Giải thưởng pháp lý
            </div>
            <div class="text-gray-500 text-xl mb-6">
              Chúng tôi tự hào về những thành tựu và giải thưởng pháp lý đã đạt
              được, minh chứng cho sự cam kết và uy tín trong ngành pháp luật
            </div>
          </div>
          <button
            class="px-10 py-4 bg-blue-800 dark:bg-blue-600 text-white rounded-full font-semibold text-lg shadow hover:bg-blue-900 dark:hover:bg-blue-700 transition-colors duration-300"
          >
            Xem thêm
          </button>
        </div>
      </div>
    </section>

    <!-- Cảm nhận của khách hàng -->
    <section id="cam-nhan" class="container mx-auto py-12 px-4 section-animate">
      <h3
        class="text-2xl font-bold text-blue-800 dark:text-blue-300 mb-8 text-center transition-colors duration-300"
      >
        Cảm nhận của khách hàng
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(item, idx) in about.testimonials"
          :key="idx"
          class="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 flex flex-col gap-4 border-l-4 border-blue-800 dark:border-blue-300 hover:shadow-2xl transition-all duration-300"
        >
          <div class="flex items-center gap-4 mb-2">
            <span
              class="inline-block w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 border-2 border-blue-800 dark:border-blue-300 flex items-center justify-center text-2xl text-blue-800 dark:text-blue-300 font-bold transition-colors duration-300"
            >
              <font-awesome-icon :icon="['fas', 'user']" />
            </span>
            <div>
              <div
                class="font-semibold text-blue-800 dark:text-blue-300 text-lg transition-colors duration-300"
              >
                {{ item.name }}
              </div>
              <div
                class="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300"
              >
                {{ item.role }}
              </div>
            </div>
          </div>
          <div
            class="text-gray-700 dark:text-gray-300 italic text-base transition-colors duration-300"
          >
            "{{ item.feedback }}"
          </div>
        </div>
      </div>
    </section>

    <!-- Tôn chỉ hoạt động -->
    <section id="ton-chi" class="container mx-auto py-12 px-4 section-animate">
      <div
        class="flex flex-col md:flex-row items-center gap-10 bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-10 border-l-4 border-blue-800 dark:border-blue-300 transition-colors duration-300"
      >
        <div
          class="w-full md:w-1/2 flex-shrink-0 flex items-center justify-center"
        >
          <img
            src="/public/images/ton-chi-hoat-dong.DKjQaDsR_1Y6nqo.webp"
            alt="Tôn chỉ hoạt động"
            class="w-full max-w-md rounded-2xl shadow object-cover"
          />
        </div>
        <div class="flex-1 flex flex-col gap-8">
          <h3
            class="text-3xl font-extrabold mb-6 text-black dark:text-white transition-colors duration-300"
          >
            Tôn chỉ hoạt động của chúng tôi
          </h3>
          <div class="flex flex-col gap-8">
            <div class="flex items-start gap-4">
              <span
                class="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 text-2xl mt-1 transition-colors duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  class="w-7 h-7"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4l3 3"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    stroke="currentColor"
                    stroke-width="2"
                    fill="none"
                  />
                </svg>
              </span>
              <div>
                <div
                  class="font-bold text-xl mb-1 text-gray-900 dark:text-gray-100 transition-colors duration-300"
                >
                  Thời gian
                </div>
                <div
                  class="text-gray-700 dark:text-gray-300 text-base transition-colors duration-300"
                >
                  Chúng tôi hiểu rằng mỗi vụ việc pháp lý đều có những yêu cầu
                  về thời gian và các yếu tố khắt khe. Vì vậy, đội ngũ luật sư
                  của chúng tôi luôn nỗ lực tối đa để đảm bảo tiến trình công
                  việc diễn ra nhanh chóng, hiệu quả, và giúp khách hàng đạt
                  được kết quả mong muốn trong thời gian sớm nhất.
                </div>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <span
                class="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 text-2xl mt-1 transition-colors duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  class="w-7 h-7"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </span>
              <div>
                <div
                  class="font-bold text-xl mb-1 text-gray-900 dark:text-gray-100 transition-colors duration-300"
                >
                  Tận tâm
                </div>
                <div
                  class="text-gray-700 dark:text-gray-300 text-base transition-colors duration-300"
                >
                  Mỗi luật sư tại Youth & Partners đều cam kết đặt trọn tâm
                  huyết vào từng hồ sơ, luôn lắng nghe và thấu hiểu nhu cầu của
                  khách hàng để đưa ra các giải pháp tối ưu và phù hợp nhất.
                  Chúng tôi tin rằng sự tận tâm là yếu tố then chốt để xây dựng
                  niềm tin và mối quan hệ lâu dài với khách hàng.
                </div>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <span
                class="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 text-2xl mt-1 transition-colors duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  class="w-7 h-7"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v8m0 0l-3-3m3 3l3-3"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    stroke="currentColor"
                    stroke-width="2"
                    fill="none"
                  />
                </svg>
              </span>
              <div>
                <div
                  class="font-bold text-xl mb-1 text-gray-900 dark:text-gray-100 transition-colors duration-300"
                >
                  Tận lực
                </div>
                <div
                  class="text-gray-700 dark:text-gray-300 text-base transition-colors duration-300"
                >
                  Chúng tôi không chỉ cung cấp dịch vụ pháp lý đơn thuần, mà
                  luôn nỗ lực vượt qua mọi thử thách để bảo vệ quyền lợi hợp
                  pháp của khách hàng. Với đội ngũ luật sư giàu kinh nghiệm và
                  luôn sẵn sàng đối mặt với mọi tình huống, Youth & Partners Law
                  Firm cam kết mang lại công bằng và sự thành công cho khách
                  hàng, giúp họ vững bước trên con đường phát triển.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Sứ mệnh và giá trị cốt lõi -->
    <section id="su-menh" class="container mx-auto py-12 px-4 section-animate">
      <div
        class="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-10 flex flex-col md:flex-row gap-10 border-l-4 border-blue-800 dark:border-blue-300 transition-colors duration-300"
      >
        <div class="flex-1">
          <h3
            class="text-2xl font-bold text-blue-800 dark:text-blue-300 mb-4 transition-colors duration-300"
          >
            Tầm nhìn và sứ mệnh
          </h3>
          <div
            class="text-gray-700 dark:text-gray-300 mb-2 text-lg transition-colors duration-300"
          >
            Trở thành hệ sinh thái pháp lý trực tuyến hàng đầu Việt Nam, cung
            cấp dịch vụ pháp lý chất lượng, minh bạch, thuận tiện cho mọi đối
            tượng khách hàng.
          </div>
        </div>
        <div class="flex-1">
          <h3
            class="text-2xl font-bold text-blue-800 dark:text-blue-300 mb-4 transition-colors duration-300"
          >
            Giá trị cốt lõi
          </h3>
          <ul
            class="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 text-lg transition-colors duration-300"
          >
            <li>Chính trực</li>
            <li>Chuyên nghiệp</li>
            <li>Đổi mới</li>
            <li>Đồng hành cùng khách hàng</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Các con số ấn tượng -->
    <section id="con-so" class="container mx-auto py-12 px-4 section-animate">
      <div
        class="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center border-l-4 border-blue-800 dark:border-blue-300 transition-colors duration-300"
      >
        <div class="flex flex-col items-center gap-2">
          <div
            class="text-4xl font-extrabold text-blue-800 dark:text-blue-300 transition-colors duration-300"
          >
            {{ about.stats.offices || "5" }}
          </div>
          <div
            class="text-gray-700 dark:text-gray-300 text-lg transition-colors duration-300"
          >
            Văn phòng
          </div>
        </div>
        <div class="flex flex-col items-center gap-2">
          <div
            class="text-4xl font-extrabold text-blue-800 dark:text-blue-300 transition-colors duration-300"
          >
            {{ about.stats.lawyers || "30+" }}
          </div>
          <div
            class="text-gray-700 dark:text-gray-300 text-lg transition-colors duration-300"
          >
            Luật sư & chuyên gia
          </div>
        </div>
        <div class="flex flex-col items-center gap-2">
          <div
            class="text-4xl font-extrabold text-blue-800 dark:text-blue-300 transition-colors duration-300"
          >
            {{ about.stats.enterpriseClients || "1176" }}
          </div>
          <div
            class="text-gray-700 dark:text-gray-300 text-lg transition-colors duration-300"
          >
            Khách hàng doanh nghiệp
          </div>
        </div>
        <div class="flex flex-col items-center gap-2">
          <div
            class="text-4xl font-extrabold text-blue-800 dark:text-blue-300 transition-colors duration-300"
          >
            {{ about.stats.individualClients || "723" }}
          </div>
          <div
            class="text-gray-700 dark:text-gray-300 text-lg transition-colors duration-300"
          >
            Khách hàng cá nhân
          </div>
        </div>
      </div>
    </section>

    <!-- Dịch vụ của chúng tôi -->
    <section id="dich-vu" class="container mx-auto py-12 px-4 section-animate">
      <h3
        class="text-2xl font-bold text-blue-800 dark:text-blue-300 mb-8 text-center transition-colors duration-300"
      >
        Dịch vụ của Chúng tôi
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="(s, idx) in about.services"
          :key="idx"
          class="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 flex flex-col gap-4 border-l-4 border-blue-800 dark:border-blue-300 hover:shadow-2xl transition-all duration-300"
        >
          <div class="flex items-center gap-3 mb-2">
            <span
              class="text-blue-800 dark:text-blue-300 text-2xl transition-colors duration-300"
            >
              <font-awesome-icon :icon="['fas', 'gavel']" />
            </span>
            <span
              class="font-semibold text-blue-800 dark:text-blue-300 text-lg transition-colors duration-300"
              >{{ s.title }}</span
            >
          </div>
          <div
            class="text-gray-700 dark:text-gray-300 text-base transition-colors duration-300"
          >
            {{ s.description }}
          </div>
        </div>
      </div>
      <div class="w-full mt-8">
        <img
          src="/public/images/dich-vu-cua-chung-toi.BYo7SAj4_Z1tJAQ9.webp"
          alt="Dịch vụ của chúng tôi"
          class="w-full max-h-64 object-cover rounded-2xl shadow"
        />
      </div>
    </section>

    <!-- Địa chỉ văn phòng -->
    <section id="dia-chi" class="container mx-auto py-12 px-4 section-animate">
      <h3
        class="text-2xl font-bold text-blue-800 dark:text-blue-300 mb-8 text-center transition-colors duration-300"
      >
        Địa chỉ văn phòng
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div
          v-for="(o, idx) in about.offices"
          :key="idx"
          class="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 border-l-4 border-blue-800 dark:border-blue-300 flex flex-col items-center transition-colors duration-300"
        >
          <div
            class="font-semibold text-blue-800 dark:text-blue-300 mb-2 text-lg transition-colors duration-300"
          >
            {{ o.city }}
          </div>
          <div
            class="text-gray-700 dark:text-gray-300 text-base transition-colors duration-300"
          >
            {{ o.address }}
          </div>
        </div>
      </div>
    </section>

    <!-- Liên hệ để được tư vấn ngay -->
    <section id="lien-he" class="container mx-auto py-12 px-4 section-animate">
      <div
        class="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-10 flex flex-col md:flex-row items-center justify-between gap-10 border-l-4 border-blue-800 dark:border-blue-300 transition-colors duration-300"
      >
        <div class="flex-1">
          <h3
            class="text-2xl font-bold text-blue-800 dark:text-blue-300 mb-4 transition-colors duration-300"
          >
            Liên hệ để được tư vấn ngay
          </h3>
          <ul
            class="flex flex-wrap gap-6 text-blue-800 dark:text-blue-300 text-lg transition-colors duration-300"
          >
            <li v-if="about.contactCTA.phone">
              <font-awesome-icon :icon="['fas', 'phone']" class="mr-2" />
              {{ about.contactCTA.phone }}
            </li>
            <li v-if="about.contactCTA.email">
              <font-awesome-icon :icon="['fas', 'envelope']" class="mr-2" />
              {{ about.contactCTA.email }}
            </li>
            <li v-if="about.contactCTA.facebook">
              <font-awesome-icon :icon="['fab', 'facebook']" class="mr-2" />
              {{ about.contactCTA.facebook }}
            </li>
            <li v-if="about.contactCTA.website">
              <font-awesome-icon :icon="['fas', 'globe']" class="mr-2" />
              {{ about.contactCTA.website }}
            </li>
          </ul>
        </div>
        <div class="flex-shrink-0 flex gap-4">
          <button
            class="bg-blue-800 dark:bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold shadow hover:bg-blue-900 dark:hover:bg-blue-700 transition-colors duration-300"
          >
            Gọi ngay
          </button>
          <button
            class="bg-white dark:bg-gray-900 border border-blue-800 dark:border-blue-300 text-blue-800 dark:text-blue-300 px-8 py-3 rounded-xl font-semibold shadow hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-300"
          >
            Nhận tư vấn
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUserCog,
  faLocationDot,
  faGavel,
  faHandshake,
  faBalanceScale,
  faPhone,
  faEnvelope,
  faGlobe,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import { useSiteContent } from "~/composables/useSiteContent";
import { normalizeAboutFromApi } from "~/utils/siteContentMapper";

library.add(
  faUserCog,
  faLocationDot,
  faGavel,
  faHandshake,
  faBalanceScale,
  faPhone,
  faEnvelope,
  faGlobe,
  faUser,
  faFacebook
);

const { getAbout } = useSiteContent();
const about = ref({
  headerTitle: "",
  companyName: "",
  introParagraphs: [],
  timeline: [],
  awards: [],
  testimonials: [],
  principles: [],
  mission: "",
  coreValues: [],
  stats: {
    offices: "",
    lawyers: "",
    enterpriseClients: "",
    individualClients: "",
  },
  services: [],
  servicesImage: "",
  offices: [],
  contactCTA: { phone: "", email: "", facebook: "", website: "" },
} as any);

const testimonials = [
  {
    name: "Nguyễn Văn A",
    role: "CEO Công ty ABC",
    feedback:
      "Dịch vụ pháp lý chuyên nghiệp, tận tâm và hiệu quả. Tôi rất hài lòng!",
  },
  {
    name: "Trần Thị B",
    role: "Giám đốc Nhân sự",
    feedback: "Đội ngũ luật sư tư vấn rất nhiệt tình, hỗ trợ nhanh chóng.",
  },
  {
    name: "Lê Văn C",
    role: "Chủ doanh nghiệp",
    feedback: "Tôi đã sử dụng dịch vụ nhiều lần và luôn nhận được kết quả tốt.",
  },
  {
    name: "Phạm Thị D",
    role: "Khách hàng cá nhân",
    feedback: "Tư vấn rõ ràng, dễ hiểu, chi phí hợp lý.",
  },
  {
    name: "Ngô Văn E",
    role: "Nhà đầu tư",
    feedback: "Hỗ trợ pháp lý đầu tư nước ngoài rất chuyên nghiệp.",
  },
  {
    name: "Vũ Thị F",
    role: "Doanh nhân",
    feedback: "Tôi đánh giá cao sự tận tâm và trách nhiệm của các luật sư.",
  },
];

const navItems = [
  { id: "ve-chung-toi", label: "Về chúng tôi" },
  { id: "lich-su", label: "Lịch sử thành lập" },
  { id: "giai-thuong", label: "Giải thưởng pháp lý" },
  { id: "cam-nhan", label: "Cảm nhận khách hàng" },
  { id: "ton-chi", label: "Tôn chỉ hoạt động" },
  { id: "su-menh", label: "Sứ mệnh & Giá trị" },
  { id: "con-so", label: "Các con số" },
  { id: "dich-vu", label: "Dịch vụ" },
  { id: "dia-chi", label: "Địa chỉ" },
  { id: "lien-he", label: "Liên hệ" },
];
const activeSection = ref(navItems[0].id);

function onScroll() {
  const scrollPos = window.scrollY || document.documentElement.scrollTop;
  let found = navItems[0].id;
  for (const item of navItems) {
    const el = document.getElementById(item.id);
    if (el) {
      const offset = el.getBoundingClientRect().top + window.scrollY - 120;
      if (scrollPos >= offset) {
        found = item.id;
      }
    }
  }
  activeSection.value = found;
}

onMounted(async () => {
  try {
    const res: any = await getAbout();
    const data = res?.data || res;
    const normalized = normalizeAboutFromApi(data.content || data);
    about.value = normalized as any;
  } catch {}
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  // Animation for sections
  nextTick(() => {
    const sections = document.querySelectorAll(".section-animate");
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("section-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    sections.forEach((section) => observer.observe(section));
  });
});
onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
});

// Set page SEO
useHead({
  title: "Giới thiệu - Công ty Luật TNHH ViLaw",
  meta: [
    {
      name: "description",
      content:
        "Tìm hiểu về Công ty Luật TNHH ViLaw - Đơn vị tư vấn pháp luật hàng đầu với đội ngũ luật sư giàu kinh nghiệm, dịch vụ pháp lý toàn diện và cam kết chất lượng.",
    },
    {
      name: "keywords",
      content:
        "giới thiệu, công ty luật, ViLaw, tư vấn pháp luật, luật sư, dịch vụ pháp lý, công ty luật TNHH",
    },
  ],
});
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
.section-animate {
  opacity: 0;
  transform: translateY(60px);
  transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}
.section-visible {
  opacity: 1;
  transform: none;
}
</style>
