export const useSeo = () => {
  const setPageSeo = (options: {
    title?: string
    description?: string
    keywords?: string
    image?: string
    url?: string
    type?: 'website' | 'article' | 'video' | 'profile'
    publishedTime?: string
    modifiedTime?: string
    author?: string
    section?: string
    tags?: string[]
  }) => {
    const {
      title,
      description,
      keywords,
      image = 'https://vilaw.net.vn/images/ton-chi-hoat-dong.DKjQaDsR_1Y6nqo.webp',
      url,
      type = 'website',
      publishedTime,
      modifiedTime,
      author = 'VILAW',
      section,
      tags = []
    } = options

    const metaTags = [
      // Basic SEO
      ...(description ? [{
        name: 'description',
        content: description
      }] : []),
      ...(keywords ? [{
        name: 'keywords',
        content: keywords
      }] : []),
      ...(author ? [{
        name: 'author',
        content: author
      }] : []),
      
      // Open Graph
      {
        property: 'og:type',
        content: type
      },
      ...(title ? [{
        property: 'og:title',
        content: title
      }] : []),
      ...(description ? [{
        property: 'og:description',
        content: description
      }] : []),
      ...(url ? [{
        property: 'og:url',
        content: url
      }] : []),
      {
        property: 'og:image',
        content: image
      },
      {
        property: 'og:image:width',
        content: '1200'
      },
      {
        property: 'og:image:height',
        content: '630'
      },
      {
        property: 'og:site_name',
        content: 'VILAW'
      },
      {
        property: 'og:locale',
        content: 'vi_VN'
      },
      
      // Twitter Card
      {
        name: 'twitter:card',
        content: 'summary_large_image'
      },
      {
        name: 'twitter:site',
        content: '@VILAW'
      },
      ...(title ? [{
        name: 'twitter:title',
        content: title
      }] : []),
      ...(description ? [{
        name: 'twitter:description',
        content: description
      }] : []),
      {
        name: 'twitter:image',
        content: image
      },
      
      // Article specific meta tags
      ...(type === 'article' ? [
        ...(publishedTime ? [{
          property: 'article:published_time',
          content: publishedTime
        }] : []),
        ...(modifiedTime ? [{
          property: 'article:modified_time',
          content: modifiedTime
        }] : []),
        ...(author ? [{
          property: 'article:author',
          content: author
        }] : []),
        ...(section ? [{
          property: 'article:section',
          content: section
        }] : []),
        ...(tags.length > 0 ? tags.map(tag => ({
          property: 'article:tag',
          content: tag
        })) : [])
      ] : [])
    ]

    // Filter out undefined values
    const filteredMetaTags = metaTags.filter(tag => tag.content !== undefined)

    useHead({
      title,
      meta: filteredMetaTags,
      ...(url ? {
        link: [{
          rel: 'canonical',
          href: url
        }]
      } : {})
    })
  }

  const setArticleSeo = (article: {
    title: string
    description: string
    content: string
    image?: string
    publishedTime?: string
    modifiedTime?: string
    author?: string
    tags?: string[]
    category?: string
  }) => {
    const keywords = [
      'pháp luật',
      'kiến thức pháp luật',
      article.category,
      ...(article.tags || [])
    ].filter(Boolean).join(', ')

    setPageSeo({
      title: article.title,
      description: article.description,
      keywords,
      image: article.image,
      type: 'article',
      publishedTime: article.publishedTime,
      modifiedTime: article.modifiedTime,
      author: article.author,
      section: article.category,
      tags: article.tags
    })
  }

  const setVideoSeo = (video: {
    title: string
    description: string
    thumbnail?: string
    duration?: number
    publishedTime?: string
    tags?: string[]
  }) => {
    const keywords = [
      'video pháp luật',
      'hướng dẫn pháp luật',
      ...(video.tags || [])
    ].filter(Boolean).join(', ')

    setPageSeo({
      title: video.title,
      description: video.description,
      keywords,
      image: video.thumbnail,
      type: 'video',
      publishedTime: video.publishedTime,
      tags: video.tags
    })
  }

  const setDocumentSeo = (document: {
    title: string
    description: string
    documentNumber?: string
    publishedTime?: string
    tags?: string[]
  }) => {
    const keywords = [
      'văn bản pháp luật',
      'pháp luật Việt Nam',
      document.documentNumber,
      ...(document.tags || [])
    ].filter(Boolean).join(', ')

    setPageSeo({
      title: document.title,
      description: document.description,
      keywords,
      type: 'article',
      publishedTime: document.publishedTime,
      tags: document.tags
    })
  }

  return {
    setPageSeo,
    setArticleSeo,
    setVideoSeo,
    setDocumentSeo
  }
}
