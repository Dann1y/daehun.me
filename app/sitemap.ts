import { getBlogPosts } from 'app/blog/utils'
import { locales } from 'app/lib/dictionaries'

export const baseUrl = 'https://daehunlee.com'

export default async function sitemap() {
  let blogSlugs = new Set<string>()
  for (const locale of locales) {
    for (const post of getBlogPosts(locale)) {
      blogSlugs.add(post.slug)
    }
  }

  let blogs = Array.from(blogSlugs).flatMap((slug) => {
    let post = getBlogPosts('ko').find((p) => p.slug === slug)
    return locales.map((locale) => ({
      url: `${baseUrl}/${locale}/blog/${slug}`,
      lastModified: post?.metadata.publishedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
      alternates: {
        languages: {
          ko: `${baseUrl}/ko/blog/${slug}`,
          en: `${baseUrl}/en/blog/${slug}`,
        },
      },
    }))
  })

  let routes = locales.flatMap((locale) => [
    {
      url: `${baseUrl}/${locale}`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'weekly' as const,
      priority: 1.0,
      alternates: {
        languages: {
          ko: `${baseUrl}/ko`,
          en: `${baseUrl}/en`,
        },
      },
    },
    {
      url: `${baseUrl}/${locale}/blog`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'weekly' as const,
      priority: 0.8,
      alternates: {
        languages: {
          ko: `${baseUrl}/ko/blog`,
          en: `${baseUrl}/en/blog`,
        },
      },
    },
  ])

  return [...routes, ...blogs]
}
