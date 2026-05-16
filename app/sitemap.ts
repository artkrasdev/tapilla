import { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'

const BASE_URL = 'https://tapilla.com'

const ROUTES = [
  '',
  '/agency',
  '/services',
  '/offer/shopify',
  '/offer/ux-ui-webdesign',
  '/offer/generative-ai',
  '/offer/branding',
  '/offer/automation',
  '/offer/wordpress',
]

export default function sitemap(): MetadataRoute.Sitemap {
  return routing.locales.flatMap((locale) =>
    ROUTES.map((route) => ({
      url: `${BASE_URL}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1.0 : 0.8,
    }))
  )
}
