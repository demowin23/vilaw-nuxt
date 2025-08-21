import { getApiConfig } from '~/utils/config'

export default defineEventHandler(async (event) => {
  // Set content type to XML
  setHeader(event, 'Content-Type', 'application/xml')

  try {
    const config = getApiConfig()

    // Fetch knowledge data from API
    const knowledgeResponse = await fetch(`${config.BASE_URL}/legal-knowledge?limit=10000`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }).then(res => res.json())

    const baseUrl = 'https://vilaw.net.vn'
    const currentDate = new Date().toISOString()

    // Generate XML sitemap
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Main Category Page -->
  <url>
    <loc>${baseUrl}/kien-thuc</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- Knowledge Category Pages -->
  <url>
    <loc>${baseUrl}/kien-thuc/dan-su</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <url>
    <loc>${baseUrl}/kien-thuc/hinh-su</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <url>
    <loc>${baseUrl}/kien-thuc/kinh-te</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <url>
    <loc>${baseUrl}/kien-thuc/lao-dong</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <url>
    <loc>${baseUrl}/kien-thuc/dat-dai</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <url>
    <loc>${baseUrl}/kien-thuc/thua-ke</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <url>
    <loc>${baseUrl}/kien-thuc/hon-nhan</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <url>
    <loc>${baseUrl}/kien-thuc/the_loai_khac</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Knowledge Articles -->
  ${knowledgeResponse.data?.map((article: any) => `
  <url>
    <loc>${baseUrl}/kien-thuc/chi-tiet/${article.id}-${slugify(article.title)}</loc>
    <lastmod>${article.ts_update || currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('') || ''}
</urlset>`

    return sitemap

  } catch (error) {
    console.error('Error generating kien-thuc sitemap:', error)
    // Return basic sitemap if API fails
    const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://vilaw.net.vn/kien-thuc</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>`
    return fallbackSitemap
  }
})

// Helper function for slugification
function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}
