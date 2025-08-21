import { getApiConfig } from '~/utils/config'

export default defineEventHandler(async (event) => {
  // Set content type to XML
  setHeader(event, 'Content-Type', 'application/xml')

  try {
    const config = getApiConfig()

    // Fetch legal documents data from API
    const documentsResponse = await fetch(`${config.BASE_URL}/legal-documents?limit=10000`, {
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
    <loc>${baseUrl}/van-ban</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- Legal Documents -->
  ${documentsResponse.data?.map((document: any) => `
  <url>
    <loc>${baseUrl}/van-ban/${document.id}-${slugify(document.title)}</loc>
    <lastmod>${document.ts_update || currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`).join('') || ''}
</urlset>`

    return sitemap

  } catch (error) {
    console.error('Error generating van-ban sitemap:', error)
    // Return basic sitemap if API fails
    const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://vilaw.net.vn/van-ban</loc>
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
