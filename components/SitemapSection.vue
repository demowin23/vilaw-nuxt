<template>
  <div class="sitemap-section">
    <h2 class="section-title">
      <span class="section-icon">{{ icon }}</span>
      {{ title }}
    </h2>
    <div class="section-links">
      <NuxtLink 
        v-for="link in mainLinks" 
        :key="link.url"
        :to="link.url" 
        class="sitemap-link"
      >
        {{ link.title }}
      </NuxtLink>
      
      <!-- Subsection for categories -->
      <div v-if="categories && categories.length > 0" class="subsection">
        <h3 class="subsection-title">Theo danh mục:</h3>
        <div class="subsection-links">
          <NuxtLink 
            v-for="category in categories" 
            :key="category.url"
            :to="category.url"
            class="sitemap-link subsection-link"
          >
            {{ category.title }}
          </NuxtLink>
        </div>
      </div>

      <!-- Subsection for featured items -->
      <div v-if="featuredItems && featuredItems.length > 0" class="subsection">
        <h3 class="subsection-title">{{ featuredTitle }}:</h3>
        <div class="subsection-links">
          <NuxtLink 
            v-for="item in featuredItems" 
            :key="item.url"
            :to="item.url"
            class="sitemap-link subsection-link"
          >
            {{ item.title }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface SitemapLink {
  title: string
  url: string
}

interface Props {
  title: string
  icon: string
  mainLinks: SitemapLink[]
  categories?: SitemapLink[]
  featuredItems?: SitemapLink[]
  featuredTitle?: string
}

defineProps<Props>()
</script>

<style scoped>
.sitemap-section {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.dark .sitemap-section {
  background: #1f2937;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
}

.sitemap-section:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: #181818;
  margin-bottom: 1rem;
  transition: color 0.3s ease;
}

.dark .section-title {
  color: #f9fafb;
}

.section-icon {
  font-size: 1.25rem;
}

.section-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.sitemap-link {
  color: #f58220;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 0;
  transition: all 0.3s ease;
  border-radius: 6px;
  padding: 0.5rem 0.75rem;
}

.sitemap-link:hover {
  color: #ffa000;
  background: rgba(245, 130, 32, 0.1);
  transform: translateX(4px);
}

.subsection {
  margin-top: 1rem;
  padding-left: 1rem;
  border-left: 3px solid #f58220;
}

.subsection-title {
  font-size: 1rem;
  font-weight: 600;
  color: #666;
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;
}

.dark .subsection-title {
  color: #9ca3af;
}

.subsection-links {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.subsection-link {
  font-size: 0.9rem;
  color: #666;
  transition: color 0.3s ease;
}

.dark .subsection-link {
  color: #9ca3af;
}

.subsection-link:hover {
  color: #f58220;
}

/* Responsive Design */
@media (max-width: 768px) {
  .sitemap-section {
    padding: 1rem;
  }

  .section-title {
    font-size: 1.25rem;
  }

  .subsection {
    padding-left: 0.75rem;
  }
}
</style>
