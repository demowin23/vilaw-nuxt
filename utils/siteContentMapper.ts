import type { AboutContentState } from '~/stores/siteContent'

type AnyRecord = Record<string, any>

const toString = (v: any) => (v == null ? '' : String(v))

export function normalizeAboutFromApi(api: AnyRecord, fallback?: AboutContentState): AboutContentState {
  const findStat = (labelIncludes: string) => {
    const item = (api.stats || []).find((s: AnyRecord) => toString(s.label).toLowerCase().includes(labelIncludes.toLowerCase()))
    return item?.number || ''
  }

  const normalized: AboutContentState = {
    headerTitle: toString(api.headerTitle),
    companyName: toString(api.companyName),
    introParagraphs: Array.isArray(api.introParagraphs) ? api.introParagraphs.map(toString) : [],
    timeline: Array.isArray(api.timeline)
      ? api.timeline.map((i: AnyRecord) => ({
          title: toString(i.title),
          subtitle: '',
          period: toString(i.year || i.period),
          description: toString(i.description),
          bullets: []
        }))
      : [],
    awards: Array.isArray(api.awards)
      ? api.awards.map((a: AnyRecord) => ({
          title: toString(a.title),
          description: [a.issuer, a.year].filter(Boolean).map(toString).join(' - ')
        }))
      : [],
    testimonials: Array.isArray(api.testimonials)
      ? api.testimonials.map((t: AnyRecord) => ({
          name: toString(t.name),
          role: toString(t.position || t.role),
          feedback: toString(t.content || t.feedback)
        }))
      : [],
    principles: Array.isArray(api.principles)
      ? api.principles.map((p: AnyRecord) =>
          typeof p === 'string' ? { title: p, description: '' } : { title: toString(p.title || ''), description: toString(p.description || '') }
        )
      : [],
    mission: toString(api.mission),
    coreValues: Array.isArray(api.coreValues) ? api.coreValues.map(toString) : [],
    stats: {
      enterpriseClients: findStat('khách hàng') || fallback?.stats.enterpriseClients || '',
      lawyers: findStat('luật sư') || fallback?.stats.lawyers || '',
      individualClients: fallback?.stats.individualClients || '',
      offices: fallback?.stats.offices || ''
    },
    services: Array.isArray(api.services)
      ? api.services.map((s: AnyRecord) => (typeof s === 'string' ? { title: s, description: '' } : { title: toString(s.title || ''), description: toString(s.description || '') }))
      : [],
    servicesImage: toString(api.servicesImage),
    offices: Array.isArray(api.offices)
      ? api.offices.map((o: AnyRecord) => ({ city: toString(o.name || o.city || ''), address: toString(o.address || '') }))
      : [],
    contactCTA: {
      phone: api.offices?.[0]?.phone ? toString(api.offices[0].phone) : fallback?.contactCTA.phone || '',
      email: fallback?.contactCTA.email || '',
      facebook: fallback?.contactCTA.facebook || '',
      website: fallback?.contactCTA.website || ''
    }
  }

  return normalized
}

export function denormalizeAboutToApi(form: AboutContentState, previousApi?: AnyRecord): AnyRecord {
  const statsFromForm = [
    { label: 'Khách hàng phục vụ', number: toString(form.stats.enterpriseClients) },
    { label: 'Luật sư chuyên môn', number: toString(form.stats.lawyers) }
  ]

  // Preserve any existing stats (e.g., Tỷ lệ hài lòng) not covered by FE
  const prevStats = Array.isArray(previousApi?.stats) ? previousApi!.stats : []
  const preserved = prevStats.filter((s: AnyRecord) => !['khách hàng', 'luật sư'].some(k => toString(s.label).toLowerCase().includes(k)))

  const awards = form.awards.map((a: { title: string; description: string }) => {
    // Try to parse year and issuer from description if formatted as 'issuer - year'
    let issuer = ''
    let year = ''
    const parts = toString(a.description).split(' - ').map(p => p.trim())
    if (parts.length === 2) {
      issuer = parts[0]
      year = parts[1]
    }
    return { title: a.title, issuer, year }
  })

  const apiPayload: AnyRecord = {
    headerTitle: form.headerTitle,
    companyName: form.companyName,
    introParagraphs: form.introParagraphs,
    timeline: form.timeline.map((t: { period?: string; title: string; description?: string }) => ({ year: t.period || '', title: t.title, description: t.description })),
    awards,
    testimonials: form.testimonials.map((t: { name: string; role: string; feedback: string }) => ({ name: t.name, position: t.role, content: t.feedback })),
    principles: form.principles.map((p: { title: string; description: string }) => (p.description ? `${p.title} - ${p.description}` : p.title)),
    mission: form.mission,
    coreValues: form.coreValues,
    stats: [...statsFromForm, ...preserved],
    services: form.services.map((s: { title: string; description: string }) => (s.description ? `${s.title}: ${s.description}` : s.title)),
    servicesImage: form.servicesImage,
    offices: form.offices.map((o: { city: string; address: string }) => ({ name: o.city, address: o.address })),
    contactCTA: previousApi?.contactCTA || ''
  }

  return apiPayload
}

// CONTACT MAPPER
export interface ContactNormalized {
  heroTitle: string
  heroSubtitle: string
  companyInfo: { label: string; value: string }[]
  address: string
  hotline: string
  email: string
  businessHours: { label: string; value: string }[]
  mapEmbedSrc: string
}

export function normalizeContactFromApi(api: AnyRecord, fallback?: ContactNormalized): ContactNormalized {
  const companyInfo: { label: string; value: string }[] = Array.isArray(api.companyInfo)
    ? api.companyInfo.map((ci: AnyRecord) => ({ label: toString(ci.label || ''), value: toString(ci.value || '') }))
    : api.companyInfo
      ? [{ label: 'Thông tin', value: toString(api.companyInfo) }]
      : fallback?.companyInfo || []

  const businessHours = Array.isArray(api.businessHours)
    ? api.businessHours.map((h: AnyRecord) => ({ label: toString(h.day || h.label || ''), value: toString(h.hours || h.value || '') }))
    : fallback?.businessHours || []

  return {
    heroTitle: toString(api.heroTitle || ''),
    heroSubtitle: toString(api.heroSubtitle || ''),
    companyInfo,
    address: toString(api.address || ''),
    hotline: toString(api.hotline || ''),
    email: toString(api.email || ''),
    businessHours,
    mapEmbedSrc: toString(api.mapEmbedSrc || '')
  }
}

export function denormalizeContactToApi(form: ContactNormalized, previousApi?: AnyRecord): AnyRecord {
  const companyInfoString = form.companyInfo?.length === 1
    ? toString(form.companyInfo[0].value || form.companyInfo[0].label)
    : (form.companyInfo || []).map(ci => `${ci.label}: ${ci.value}`).join(' | ')

  return {
    heroTitle: form.heroTitle,
    heroSubtitle: form.heroSubtitle,
    email: form.email,
    address: form.address,
    hotline: form.hotline,
    mapEmbedSrc: form.mapEmbedSrc,
    companyInfo: companyInfoString,
    businessHours: (form.businessHours || []).map(h => ({ day: h.label, hours: h.value }))
  }
}


