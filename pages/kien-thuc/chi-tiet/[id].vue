<template>
  <div class="knowledge-page">
    <div class="main-layout">
      <!-- Left: 9/12 -->
      <div class="main-content">
        <h1 class="knowledge-title">{{ knowledge?.title }}</h1>
        <div class="knowledge-meta">
          <span class="meta-item mr-3">
            <span class="meta-icon"
              ><font-awesome-icon :icon="['fas', 'calendar']"
            /></span>
            {{ knowledge?.ts_update }}
          </span>
          <span class="meta-divider"></span>
          <span class="meta-item mx-3">
            <span class="meta-icon"
              ><font-awesome-icon :icon="['fas', 'user']"
            /></span>
            {{ knowledge?.author }}
          </span>
          <span class="meta-divider"></span>
          <span class="meta-item mx-3">
            <span class="meta-icon"
              ><font-awesome-icon :icon="['fas', 'eye']"
            /></span>
            {{ knowledge?.view_count || "1447 lượt xem" }}
          </span>
        </div>
        <div class="knowledge-summary">{{ knowledge?.summary }}</div>
        <div class="knowledge-image-wrap">
          <img
            :src="getImageUrl(knowledge?.image)"
            :alt="knowledge?.title"
            class="knowledge-image"
          />
        </div>
        <div class="toc-container">
          <h3 class="toc-title">
            <font-awesome-icon :icon="['fas', 'list']" class="toc-icon" />
            Mục lục
          </h3>
          <div v-if="tocItems.length === 0" class="toc-empty">
            Không có mục lục
          </div>
          <nav v-else class="toc-nav">
            <ul class="toc-list">
              <li
                v-for="(item, index) in tocItems"
                :key="index"
                class="toc-item"
                :class="{
                  'toc-item-h1': item.level === 1,
                  'toc-item-h2': item.level === 2,
                  'toc-item-h3': item.level === 3,
                  'toc-item-h4': item.level === 4,
                  'toc-item-h5': item.level === 5,
                  'toc-item-h6': item.level === 6,
                  active: activeHeading === item.id,
                }"
              >
                <a
                  :href="`#${item.id}`"
                  class="toc-link"
                  @click.prevent="scrollToHeading(item.id)"
                >
                  {{ item.text }}
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div class="custom-quill-editor ql-container ql-snow">
          <div
            class="ql-editor html-output"
            data-gramm="false"
            contenteditable="true"
          >
            <div
              class="knowledge-content"
              v-html="knowledge?.content"
              ref="contentRef"
            ></div>
          </div>
        </div>
      </div>
      <aside class="sidebar">
        <div class="related-knowledge">
          <h3 class="related-title">Kiến thức liên quan</h3>
          <div v-if="relatedLoading" class="related-loading">Đang tải...</div>
          <div v-else-if="relatedList.length === 0" class="related-empty">
            Không có bài liên quan
          </div>
          <ul v-else class="related-list">
            <li v-for="item in relatedList" :key="item.id" class="related-item">
              <NuxtLink
                :to="`/kien-thuc/chi-tiet/${item.id}-${slugify(item.title)}`"
                class="related-link"
              >
                <img
                  v-if="item.image"
                  :src="getImageUrl(item.image)"
                  :alt="item.title"
                  class="related-thumb"
                />
                <div class="related-text-wrap">
                  <span class="related-text">{{ item.title }}</span>
                  <p class="related-summary">{{ item.summary }}</p>
                </div>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from "vue";
import { useRoute } from "vue-router";
import { useLegalKnowledge } from "~/composables/useLegalKnowledge";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCalendar,
  faUser,
  faEye,
  faList,
} from "@fortawesome/free-solid-svg-icons";
import { slugify } from "~/utils/slugify";
library.add(faCalendar, faUser, faEye, faList);

const route = useRoute();
const idParam = route.params.id as string;
// Extract ID from URL like "123-title-slug" -> "123"
const id = idParam?.split('-')[0];
const { getLegalKnowledgeById, getLegalKnowledge } = useLegalKnowledge();

import { getImageUrl } from "~/utils/config";

let knowledge = ref<any>(null);
const isLoading = ref(false);
const error = ref("");
const contentRef = ref<HTMLElement | null>(null);

const relatedList = ref<any[]>([]);
const relatedLoading = ref(false);

// Table of Contents
const tocItems = ref<Array<{ id: string; text: string; level: number }>>([]);
const activeHeading = ref<string>("");

// Extract headings from content
const extractHeadings = () => {
  if (!contentRef.value) return;

  const headings = contentRef.value.querySelectorAll("h1, h2, h3, h4, h5, h6");
  const items: Array<{ id: string; text: string; level: number }> = [];

  headings.forEach((heading, index) => {
    const level = parseInt(heading.tagName.charAt(1));
    const text = heading.textContent?.trim() || "";
    const id = heading.id || `heading-${index}`;

    // Add id if not exists
    if (!heading.id) {
      heading.id = id;
    }

    items.push({ id, text, level });
  });

  tocItems.value = items;
};

// Scroll to heading
const scrollToHeading = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

// Update active heading based on scroll position
const updateActiveHeading = () => {
  if (tocItems.value.length === 0) return;

  const headings = tocItems.value
    .map((item) => document.getElementById(item.id))
    .filter(Boolean);
  if (headings.length === 0) return;

  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const windowHeight = window.innerHeight;

  let activeId = "";

  for (let i = headings.length - 1; i >= 0; i--) {
    const heading = headings[i] as HTMLElement;
    const rect = heading.getBoundingClientRect();

    if (rect.top <= 100) {
      activeId = heading.id;
      break;
    }
  }

  activeHeading.value = activeId;
};

const loadRelated = async (category: string) => {
  if (!category) return;
  relatedLoading.value = true;
  try {
    const res = await getLegalKnowledge({ category, limit: 5 });
    // Loại bỏ bài hiện tại
    relatedList.value = (res.data || []).filter((item: any) => item.id != id);
  } catch (e) {
    relatedList.value = [];
  } finally {
    relatedLoading.value = false;
  }
};

onMounted(async () => {
  if (!id) return;
  isLoading.value = true;
  try {
    const res = await getLegalKnowledgeById(Number(id));
    knowledge.value = res.data;
    await nextTick();
    extractHeadings();

    // Add scroll listener for active heading
    window.addEventListener("scroll", updateActiveHeading);

    // Gọi liên quan sau khi có category
    if (knowledge.value?.category) {
      loadRelated(knowledge.value.category);
    }
  } catch (e: any) {
    error.value = e.message || "Không thể tải chi tiết kiến thức";
  } finally {
    isLoading.value = false;
  }
});

// Watch for content changes
watch(
  () => knowledge.value?.content,
  () => {
    nextTick(() => {
      extractHeadings();
    });
  }
);
</script>
<style scoped>
:deep(.ql-container.ql-snow) {
  border: none;
}
:deep(.ql-editor) {
  padding: 0;
}
.knowledge-page {
  width: 100%;
  background: #fff;
  padding: 0;
}
.main-layout {
  display: flex;
  flex-direction: row;
}
.main-content {
  flex: 0 0 70%;
  max-width: 70%;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.06);
  padding: 16px 18px 18px 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sidebar {
  flex: 0 0 30%;
  max-width: 30%;
  min-width: 240px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 16px;
}

/* Table of Contents Styles */
.toc-container {
  background: #fafbfc;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 24px;
  border: 1px solid #e8eaed;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  width: 100%;
}

.toc-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--primary-color, #f58220);
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.toc-icon {
  font-size: 0.9em;
  color: #f58220;
}

.toc-empty {
  color: #888;
  font-size: 0.9rem;
  font-style: italic;
  text-align: center;
  padding: 12px 0;
}

.toc-nav {
  max-height: 400px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #c1c1c1 #f1f1f1;
}

.toc-nav::-webkit-scrollbar {
  width: 4px;
}

.toc-nav::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 2px;
}

.toc-nav::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 2px;
}

.toc-nav::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

.toc-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.toc-item {
  border-radius: 6px;
  transition: all 0.2s ease;
}

.toc-item:hover {
  background: rgba(245, 130, 32, 0.08);
}

.toc-item.active {
  background: rgba(245, 130, 32, 0.12);
  border-left: 3px solid #f58220;
}

.toc-link {
  display: block;
  padding: 8px 12px;
  text-decoration: none;
  color: #333;
  font-size: 0.9rem;
  line-height: 1.4;
  transition: color 0.2s ease;
  border-radius: 6px;
}

.toc-link:hover {
  color: #f58220;
}

.toc-item.active .toc-link {
  color: #f58220;
  font-weight: 500;
}

/* Heading level indentation */
.toc-item-h1 .toc-link {
  padding-left: 12px;
  font-weight: 600;
  font-size: 0.95rem;
}

.toc-item-h2 .toc-link {
  padding-left: 20px;
  font-weight: 500;
  font-size: 0.9rem;
}

.toc-item-h3 .toc-link {
  padding-left: 28px;
  font-weight: 400;
  font-size: 0.85rem;
}

.toc-item-h4 .toc-link {
  padding-left: 36px;
  font-weight: 400;
  font-size: 0.8rem;
}

.toc-item-h5 .toc-link {
  padding-left: 44px;
  font-weight: 400;
  font-size: 0.75rem;
}

.toc-item-h6 .toc-link {
  padding-left: 52px;
  font-weight: 400;
  font-size: 0.7rem;
}

.sidebar-placeholder {
  width: 100%;
  min-height: 200px;
  background: #f5f6fa;
  border-radius: 10px;
  color: #aaa;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  font-style: italic;
}
.knowledge-title {
  font-size: 2.3rem;
  font-weight: 800;
  color: #f58220;
  margin-bottom: 12px;
  text-align: left;
  width: 100%;
}
.knowledge-meta {
  display: flex;
  gap: 0;
  align-items: center;
  color: #888;
  font-size: 1rem;
  margin-bottom: 12px;
  width: 100%;
  justify-content: flex-start;
}
.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 1rem;
}
.meta-icon {
  display: flex;
  align-items: center;
  font-size: 1.1em;
  color: #f58220;
}
.meta-divider {
  width: 1px;
  height: 22px;
  background: #e0e0e0;
  margin: 0 4px;
  display: inline-block;
}
.knowledge-summary {
  font-size: 1.15rem;
  color: #333;
  margin-bottom: 18px;
  width: 100%;
}
.knowledge-image-wrap {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 18px;
}
.knowledge-image {
  width: 85%;
  border-radius: 10px;
  object-fit: cover;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
}
.knowledge-caption {
  font-size: 1rem;
  color: #666;
  margin-top: 8px;
  text-align: center;
}
.knowledge-content {
  width: 100%;
  font-size: 1.13rem;
  color: #222;
  line-height: 1.7;
  word-break: break-word;
  margin-top: 18px;
}
.sidebar {
  background: #fafbfc;
  border-left: 1px solid #eee;
  padding: 24px 18px 0 18px;
  min-width: 220px;
}
.related-knowledge {
  margin-bottom: 2rem;
}
.related-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--primary-color, #f58220);
  margin-bottom: 1rem;
}
.related-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.related-item {
  display: flex;
  align-items: center;
}
.related-link {
  display: flex;
  gap: 0.7rem;
  text-decoration: none;
  color: var(--text-primary, #222);
  transition: color 0.2s;
}
.related-link:hover .related-text {
  color: var(--primary-color, #f58220);
  text-decoration: underline;
}
.related-thumb {
  width: 125px;
  height: 90px;
  object-fit: cover;
  border-radius: 6px;
  background: #eee;
}
.related-text-wrap {
  display: flex;
  flex-direction: column;
}
.related-text {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.3;
  max-width: 100%;
  word-wrap: break-word;
  word-break: break-word;
  max-height: 2.6em;
}
.related-summary {
  font-size: 0.9rem;
  color: #666;
  text-align: justify;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  word-wrap: break-word;
  word-break: break-word;
}

.related-loading,
.related-empty {
  color: #888;
  font-size: 0.98rem;
  margin: 1rem 0;
}
@media (max-width: 1100px) {
  .main-layout {
    flex-direction: column;
    gap: 0;
    padding: 12px 0 24px 0;
  }
  .main-content,
  .sidebar {
    max-width: 100%;
    flex: 1 1 100%;
  }
  .sidebar {
    min-width: unset;
    padding-top: 16px;
  }
}
@media (max-width: 600px) {
  .main-content {
    padding: 10px 2px 10px 2px;
  }
  .knowledge-title {
    font-size: 1.1rem;
  }
  .knowledge-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
  }
  .meta-divider {
    display: none;
  }
}
@media (max-width: 900px) {
  .sidebar {
    display: none;
  }
}
</style>
