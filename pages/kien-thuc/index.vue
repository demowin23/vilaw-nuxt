<template>
  <div class="accounting-knowledge-page">
    <div v-for="category in categories" :key="category.value">
      <div class="header-section">
        <div class="title-container">
          <div class="title-accent"></div>
          <h1 class="main-title">{{ category.label }}</h1>
        </div>
        <p class="description">
          {{ category.description }}
        </p>
      </div>
      <KienThuc :KienThuc="categoryKnowledge[category.value] || []" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useLegalKnowledge } from "~/composables/useLegalKnowledge";
import KienThuc from "~/components/KienThuc.vue";
const { getLegalKnowledge, getCategories } = useLegalKnowledge();
const categories = ref<any[]>([]);
const categoryKnowledge = ref<Record<string, any[]>>({});

onMounted(async () => {
  try {
    const categoriesResponse = await getCategories();
    categories.value = categoriesResponse.data.slice().sort((a, b) => {
      if (a.value === "the_loai_khac") return 1;
      if (b.value === "the_loai_khac") return -1;
      return a.id - b.id;
    });

    // Fetch knowledge for each category
    const knowledgePromises = categories.value.map(async (category) => {
      const response = await getLegalKnowledge({
        category: category.value,
        limit: 8,
        offset: 0,
      });
      return { value: category.value, data: response.data };
    });

    const knowledgeResults = await Promise.all(knowledgePromises);

    // Organize knowledge by category value
    knowledgeResults.forEach(({ value, data }) => {
      categoryKnowledge.value[value] = data;
    });
  } catch (error) {
    console.error("Error loading categories and knowledge:", error);
  }
});

// Set page SEO
useHead({
  title: "Kiến thức pháp luật",
  meta: [
    {
      name: "description",
      content:
        "Khám phá kiến thức pháp luật Việt Nam với các bài viết chuyên sâu về các lĩnh vực pháp luật khác nhau. Từ dân sự, hình sự đến thương mại và đất đai.",
    },
    {
      name: "keywords",
      content:
        "kiến thức pháp luật, pháp luật Việt Nam, luật dân sự, luật hình sự, luật thương mại, luật đất đai, pháp luật đời sống",
    },
  ],
});
</script>

<style scoped>
.card-description {
  font-size: 1rem;
  color: #4b5563;
  line-height: 1.6;
  margin: 0;
}
.accounting-knowledge-page {
  padding: 40px 20px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

/* Header Section */
.header-section {
  margin-bottom: 30px;
}

.title-container {
  border-bottom: 2px solid #e5e7eb;
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.title-accent {
  width: 6px;
  height: 32px;
  background: linear-gradient(135deg, #ff6b35, #f7931e);
  margin-right: 15px;
  border-radius: 2px;
}

.main-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #f58220;
  margin: 0;
}

.description {
  font-size: 1.1rem;
  color: #4b5563;
  line-height: 1.6;
  margin: 0;
}
.dark .description {
  color: #f9fafb;
}
/* Cards Grid */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.card-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.card-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  line-height: 1.4;
}

.card-illustration {
  flex: 1;
  min-height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.illustration-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  transition: transform 0.3s ease;
}

.illustration-image:hover {
  transform: scale(1.05);
}

/* Button Styles */
.view-details-btn {
  background: linear-gradient(135deg, #ff6b35, #f7931e);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  align-self: center;
  margin-top: auto;
}

.view-details-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 107, 53, 0.3);
}

/* Responsive Design */
@media (max-width: 768px) {
  .cards-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
  }

  .main-title {
    font-size: 2rem;
  }

  .description {
    font-size: 1rem;
  }

  .card-content {
  }
}

@media (max-width: 480px) {
  .cards-grid {
    grid-template-columns: 1fr;
  }

  .accounting-knowledge-page {
    padding: 20px 15px;
  }

  .main-title {
    font-size: 1.8rem;
  }
}
</style>
